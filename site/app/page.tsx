'use client';

import { useEffect, useState } from 'react';
import { GuiPortfolio } from './components/gui-portfolio';
import { InterfaceMode, SiteFooter, SiteHeader } from './components/site-chrome';
import { TerminalWorkspace } from './components/terminal-workspace';

type Theme = 'paper' | 'night';

function scrollToSection(id: string) {
  window.setTimeout(() => {
    const target = document.getElementById(id);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    target?.querySelector<HTMLElement>('h2, h1')?.focus({ preventScroll: true });
  }, 40);
}

export default function Home() {
  const [mode, setMode] = useState<InterfaceMode>('gui');
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'paper';
    const savedTheme = window.localStorage.getItem('av-dos-theme')
      ?? window.localStorage.getItem('aangan-theme');
    return savedTheme === 'night' ? 'night' : 'paper';
  });
  const [time, setTime] = useState('');
  const [terminalCommand, setTerminalCommand] = useState<string>();
  const [focusPrompt, setFocusPrompt] = useState(false);

  useEffect(() => {
    const updateTime = () => setTime(new Intl.DateTimeFormat('en-CA', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date()));
    updateTime();
    const timer = window.setInterval(updateTime, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('av-dos-theme', theme);
  }, [theme]);

  function openTerminal(command?: string, shouldFocus = false) {
    setTerminalCommand(command);
    setFocusPrompt(shouldFocus);
    setMode('cli');
  }

  function returnToGui() {
    setMode('gui');
    setTerminalCommand(undefined);
    setFocusPrompt(false);
  }

  function navigateTo(target: string) {
    returnToGui();
    scrollToSection(target);
  }

  function changeMode(nextMode: InterfaceMode, shouldFocus = false) {
    if (nextMode === 'cli') openTerminal(undefined, shouldFocus);
    else returnToGui();
  }

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const isEditing = /INPUT|TEXTAREA|SELECT/.test(target.tagName) || target.isContentEditable;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        openTerminal(undefined, true);
      } else if (event.key === '/' && !isEditing && mode === 'gui') {
        event.preventDefault();
        openTerminal(undefined, true);
      } else if (event.key === 'Escape' && mode === 'cli') {
        returnToGui();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mode]);

  return (
    <div className="site-shell">
      <a className="skip-link" href={mode === 'gui' ? '#main-content' : '#terminal-prompt'}>Skip to content</a>

      <SiteHeader
        mode={mode}
        time={time}
        onModeChange={changeMode}
        onHome={() => navigateTo('home')}
      />

      {mode === 'cli' ? (
        <TerminalWorkspace
          autoFocus={focusPrompt}
          initialCommand={terminalCommand}
          onReturnToGui={returnToGui}
          onNavigate={navigateTo}
          onThemeChange={setTheme}
        />
      ) : (
        <>
          <GuiPortfolio onOpenTerminal={(command) => openTerminal(command)} />
          <SiteFooter onOpenTerminal={() => openTerminal()} />
        </>
      )}
    </div>
  );
}
