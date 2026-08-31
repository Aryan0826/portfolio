'use client';

import { navItems, profile } from '../data/portfolio';

export type InterfaceMode = 'gui' | 'cli';

type SiteHeaderProps = {
  mode: InterfaceMode;
  time: string;
  onModeChange: (mode: InterfaceMode, focusPrompt?: boolean) => void;
  onHome: () => void;
};

export function SiteHeader({ mode, time, onModeChange, onHome }: SiteHeaderProps) {
  return (
    <header className="topbar">
      <button className="brand" onClick={onHome} aria-label="AV-DOS home">
        <span className="brand-mark" aria-hidden="true">AV</span>
        <span><strong>AV-DOS</strong><em>PERSONAL SYSTEM</em></span>
      </button>

      <nav aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item.id} href={`#${item.id}`} onClick={() => onModeChange('gui')}>{item.label}</a>
        ))}
      </nav>

      <div className="system-controls">
        <span className="topbar-time" aria-label={`Local time ${time}`}>{time || '--:--'} / YWG</span>
        <details className="mobile-menu">
          <summary>MENU</summary>
          <div>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(event) => {
                  onModeChange('gui');
                  event.currentTarget.closest('details')?.removeAttribute('open');
                }}
              >
                <span>{item.label}</span><small>{item.command}</small>
              </a>
            ))}
          </div>
        </details>
        <div className="mode-switch" aria-label="Interface mode">
          <button className={mode === 'gui' ? 'active' : ''} onClick={() => onModeChange('gui')} aria-pressed={mode === 'gui'}>GUI</button>
          <button className={mode === 'cli' ? 'active' : ''} onClick={() => onModeChange('cli')} aria-pressed={mode === 'cli'}>CLI</button>
        </div>
      </div>
    </header>
  );
}

export function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <p>{children}</p>
      <i aria-hidden="true" />
    </div>
  );
}

export function SiteFooter({ onOpenTerminal }: { onOpenTerminal: () => void }) {
  return (
    <footer>
      <div className="footer-brand">
        <span className="brand-mark" aria-hidden="true">AV</span>
        <p><strong>AV-DOS</strong><small>Projects, experiments, and progress in one personal system.</small></p>
      </div>
      <p>&copy; {new Date().getFullYear()} {profile.name}</p>
      <button onClick={onOpenTerminal}>OPEN TERMINAL <kbd>CTRL K</kbd></button>
    </footer>
  );
}
