'use client';

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { profile } from '../data/portfolio';
import {
  executePortfolioCommand,
  normalizeCommand,
  suggestCommands,
  TerminalLink,
} from '../lib/terminal';

type Theme = 'paper' | 'night';
type TerminalEntry = {
  id: number;
  command?: string;
  lines: string[];
  kind?: 'normal' | 'error' | 'success';
  links?: TerminalLink[];
};

type TerminalWorkspaceProps = {
  autoFocus?: boolean;
  initialCommand?: string;
  onReturnToGui: () => void;
  onNavigate: (target: string) => void;
  onThemeChange: (theme: Theme) => void;
};

const welcomeEntry: TerminalEntry = {
  id: 0,
  lines: [
    'AV-DOS 2.0 - projects, systems, robotics, and the path between them',
    'Type "help" for commands, or choose a suggestion below.',
  ],
  kind: 'success',
};

const quickCommands = ['projects', 'skills', 'journey', 'resume', 'contact', 'help'];

export function TerminalWorkspace({
  autoFocus = false,
  initialCommand,
  onReturnToGui,
  onNavigate,
  onThemeChange,
}: TerminalWorkspaceProps) {
  const [command, setCommand] = useState('');
  const [entries, setEntries] = useState<TerminalEntry[]>([welcomeEntry]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const promptRef = useRef<HTMLInputElement>(null);
  const scrollbackRef = useRef<HTMLDivElement>(null);
  const entryId = useRef(1);
  const ranInitialCommand = useRef(false);

  useEffect(() => {
    if (autoFocus) window.setTimeout(() => promptRef.current?.focus(), 60);
  }, [autoFocus]);

  useEffect(() => {
    scrollbackRef.current?.scrollTo({ top: scrollbackRef.current.scrollHeight, behavior: 'smooth' });
  }, [entries]);

  function addEntry(next: Omit<TerminalEntry, 'id'>) {
    setEntries((current) => [...current.slice(-60), { ...next, id: entryId.current++ }]);
  }

  function runCommand(rawCommand: string) {
    const clean = normalizeCommand(rawCommand);
    if (!clean) return;

    setHistory((current) => [...current.slice(-48), clean]);
    setHistoryIndex(-1);
    setSuggestionsOpen(false);

    const response = executePortfolioCommand(clean);
    if (response.effect?.type === 'clear') {
      setEntries([]);
      return;
    }

    if (response.lines.length || response.links?.length) {
      addEntry({
        command: clean,
        lines: response.lines,
        kind: response.kind,
        links: response.links,
      });
    }

    if (response.effect?.type === 'mode') onReturnToGui();
    if (response.effect?.type === 'navigate') onNavigate(response.effect.target);
    if (response.effect?.type === 'theme') onThemeChange(response.effect.theme);
  }

  useEffect(() => {
    if (!initialCommand || ranInitialCommand.current) return;
    ranInitialCommand.current = true;
    runCommand(initialCommand);
    // run once when this terminal session mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCommand]);

  function submitCommand(event: FormEvent) {
    event.preventDefault();
    runCommand(command);
    setCommand('');
  }

  function handlePromptKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!history.length) return;
      const next = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
      setHistoryIndex(next);
      setCommand(history[history.length - 1 - next] ?? '');
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      const next = historyIndex > 0 ? historyIndex - 1 : -1;
      setHistoryIndex(next);
      setCommand(next === -1 ? '' : history[history.length - 1 - next] ?? '');
    } else if (event.key === 'Tab') {
      event.preventDefault();
      const matches = suggestCommands(command);
      if (matches.length === 1) setCommand(matches[0]);
      else setSuggestionsOpen(true);
    } else if (event.ctrlKey && event.key.toLowerCase() === 'l') {
      event.preventDefault();
      setEntries([]);
    }
  }

  const suggestions = suggestCommands(command);

  return (
    <main className="cli-workspace" aria-label="Command line portfolio">
      <div className="cli-ornament" aria-hidden="true"><span /><span /><span /><span /></div>
      <section className="cli-window">
        <div className="window-titlebar cli-titlebar">
          <span>AV-DOS://TERMINAL</span>
          <button onClick={onReturnToGui}>ESC / RETURN TO GUI</button>
        </div>
        <div className="woven-rule" />

        <div className="terminal-scrollback" ref={scrollbackRef} aria-label="Terminal output">
          {entries.map((entry) => (
            <div className={`terminal-entry ${entry.kind ?? ''}`} key={entry.id}>
              {entry.command && (
                <p className="terminal-command">
                  <span className="terminal-accent">{profile.handle}</span>:<span className="terminal-path">~</span> $ {entry.command}
                </p>
              )}
              {entry.lines.map((line, index) => <p key={`${entry.id}-${index}`}>{line}</p>)}
              {entry.links?.length ? (
                <div className="terminal-entry-links">
                  {entry.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target={link.href.startsWith('http') || link.href.endsWith('.pdf') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <div className="quick-commands" aria-label="Suggested commands">
          {quickCommands.map((item) => (
            <button key={item} onClick={() => runCommand(item)}>{item}</button>
          ))}
        </div>

        <form className="terminal-prompt" onSubmit={submitCommand}>
          <label htmlFor="terminal-prompt">
            <span className="terminal-accent">{profile.handle}</span>:<span className="terminal-path">~</span> $
          </label>
          <input
            ref={promptRef}
            id="terminal-prompt"
            value={command}
            onChange={(event) => { setCommand(event.target.value); setSuggestionsOpen(false); }}
            onKeyDown={handlePromptKeyDown}
            autoComplete="off"
            spellCheck="false"
            placeholder="type help, then press enter"
            aria-describedby="terminal-help"
          />
          <button type="submit">RUN / ENTER</button>
        </form>

        {suggestionsOpen && suggestions.length > 0 && (
          <div className="autocomplete" role="status">
            {suggestions.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setCommand(item);
                  setSuggestionsOpen(false);
                  promptRef.current?.focus();
                }}
              >
                {item}
              </button>
            ))}
          </div>
        )}
        <p className="terminal-help" id="terminal-help">UP/DOWN HISTORY &nbsp;|&nbsp; TAB COMPLETE &nbsp;|&nbsp; CTRL L CLEAR &nbsp;|&nbsp; ESC GUI</p>
        <div className="sr-only" aria-live="polite">{entries.at(-1)?.lines.at(-1)}</div>
      </section>
    </main>
  );
}
