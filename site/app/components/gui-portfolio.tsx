'use client';

import {
  awards,
  communities,
  experience,
  featuredProject,
  getProjectNumber,
  journey,
  navItems,
  principles,
  profile,
  projects,
  skillDomains,
} from '../data/portfolio';
import { ProjectArchive } from './project-archive';
import { SectionLabel } from './site-chrome';

type GuiPortfolioProps = {
  onOpenTerminal: (command?: string) => void;
};

export function GuiPortfolio({ onOpenTerminal }: GuiPortfolioProps) {
  return (
    <main id="main-content">
      <section className="hero pattern-lattice" id="home">
        <div className="hero-copy">
          <p className="eyebrow"><span>01</span> / SYSTEM OWNER</p>
          <h1 tabIndex={-1}>I started with a<br/><i>blank terminal.</i></h1>
          <p className="intro">
            I am <strong>{profile.name}</strong> - {profile.headline.toLowerCase()} {profile.intro}
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">Explore my work <span aria-hidden="true">-&gt;</span></a>
            <button className="text-button" onClick={() => onOpenTerminal()}>or type your way around <kbd>CTRL K</kbd></button>
          </div>
          <dl className="hero-meta">
            <div><dt>STUDYING</dt><dd>CS Honours + Mathematics</dd></div>
            <div><dt>BUILDING SINCE</dt><dd>2023</dd></div>
            <div><dt>CURRENT FOCUS</dt><dd>Software + Systems + Robotics</dd></div>
          </dl>
        </div>

        <div className="workbench" aria-label="AV-DOS navigation">
          <div className="window-titlebar"><span>AV-DOS://HOME</span><span className="window-status">● ONLINE</span></div>
          <div className="woven-rule" />
          <div className="desktop-view">
            <p className="desktop-label">CHOOSE A DOOR</p>
            <div className="desktop-grid">
              {navItems.map((item) => (
                <a href={`#${item.id}`} className={`desktop-icon ${item.accent}`} key={item.id}>
                  <b>{item.number}</b><span>{item.label}</span><small>{item.doorCopy}</small>
                </a>
              ))}
            </div>
            <button className="command-hint" onClick={() => onOpenTerminal()}>
              <span>&gt;_</span><span>Open command line</span><kbd>CTRL K</kbd>
            </button>
          </div>
          <div className="window-footer"><span>GUI / READY</span><span>WINNIPEG / CA</span></div>
        </div>
        <p className="margin-note" aria-hidden="true">CODE • CURIOSITY • CHARACTER</p>
      </section>

      <div className="status-band" aria-hidden="true">
        <span>UNDERSTAND THE PROBLEM</span><i>✦</i><span>LEARN THE UNKNOWN</span><i>✦</i><span>LEAVE THE SYSTEM CLEARER</span>
      </div>

      <section className="section work-section" id="work">
        <SectionLabel number="02">SELECTED WORK / BUILD LOG</SectionLabel>
        <div className="section-heading">
          <h2 tabIndex={-1}>Not a gallery.<br/><i>A record of choices.</i></h2>
          <p>Each project records the starting point, the unfamiliar territory, and the lesson that travelled into the next build.</p>
        </div>

        <article className="featured-project">
          <div className="project-visual" aria-label="CyberSentinel extension and API architecture motif">
            <div className="project-browser">
              <div className="project-browser-bar"><span>AV-DOS://WORK/{getProjectNumber(featuredProject)}</span><b>{featuredProject.status}</b></div>
              <div className="project-browser-content">
                <div className="mini-sidebar"><i/><i/><i/><i/></div>
                <div className="mini-canvas pattern-lattice"><span>EXT</span><em>&lt;-&gt;</em><span>API</span></div>
              </div>
            </div>
            <span className="registration-mark top-left" aria-hidden="true">⌜</span>
            <span className="registration-mark bottom-right" aria-hidden="true">⌟</span>
          </div>

          <div className="project-copy">
            <p className="project-kicker">PROJECT {getProjectNumber(featuredProject)} / {featuredProject.year}</p>
            <h3>{featuredProject.title}</h3>
            <p className="project-context">{featuredProject.team} / {featuredProject.category}</p>
            <p className="project-summary">{featuredProject.summary}</p>
            <dl className="project-notes">
              <div><dt>WHY BUILD IT</dt><dd>{featuredProject.reason}</dd></div>
              <div><dt>THE CHALLENGE</dt><dd>{featuredProject.challenge}</dd></div>
              <div><dt>THE OUTCOME</dt><dd>{featuredProject.outcome}</dd></div>
            </dl>
            <div className="featured-learning">
              <small>LEARNING DELTA</small>
              <p>{featuredProject.startedWith} <span aria-hidden="true">-&gt;</span> {featuredProject.learned}</p>
            </div>
            <ul className="stack-list" aria-label="Technologies used">
              {featuredProject.stack.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <button className="inline-command" onClick={() => onOpenTerminal(`cat ${featuredProject.slug}`)}>
              <span>&gt;_ cat {featuredProject.slug}</span><span>Read in terminal</span>
            </button>
          </div>
        </article>

        <div className="archive-note">
          <p>WHERE I BEGAN</p>
          <h3>Early work belongs in the story.</h3>
          <span>Course projects, hackathons, research reports, and experiments are presented honestly: what I tried, where it became difficult, and what I carried forward.</span>
          <b>ARCHIVE STATUS / {String(projects.length).padStart(2, '0')} BUILDS MOUNTED</b>
        </div>

        <ProjectArchive onOpenTerminal={onOpenTerminal} />
      </section>

      <section className="section journey-section pattern-lattice" id="journey">
        <SectionLabel number="03">JOURNEY / CHANGELOG</SectionLabel>
        <div className="section-heading split-heading">
          <h2 tabIndex={-1}>Growth is part<br/><i>of the work.</i></h2>
          <p>From programming fundamentals to systems, networks, and real robot hardware: every year added another layer to how I understand computing.</p>
        </div>

        <ol className="timeline">
          {journey.map((item, index) => (
            <li key={item.year}>
              <div className="timeline-year"><span>{item.year}</span><i aria-hidden="true">{String(index + 1).padStart(2, '0')}</i></div>
              <div className="timeline-copy">
                <p>{item.label}</p>
                <h3>{item.title}</h3>
                <span>{item.copy}</span>
                <div className="timeline-bottom">
                  <em>{item.note}</em>
                  <ul aria-label={`${item.year} focus areas`}>
                    {item.signals.map((signal) => <li key={signal}>{signal}</li>)}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="section manual-section" id="about">
        <SectionLabel number="04">MANUAL / HOW I OPERATE</SectionLabel>
        <div className="manual-grid">
          <div className="manual-intro">
            <p className="big-quote">“I learn by building.”</p>
            <p>Curiosity is not a line in my skills section. It is the method connecting an Android app, a filesystem, a game jam, and a robot arm.</p>
            <dl className="currently">
              <div><dt>CURRENTLY</dt><dd>Deepening my systems and robotics foundations through hands-on projects</dd></div>
              <div><dt>OPTIMIZING FOR</dt><dd>Clarity, testability, honest learning, and systems that respect their users</dd></div>
              <div><dt>TEACHING ME</dt><dd>Explaining mental mathematics to young learners makes precision and empathy inseparable</dd></div>
            </dl>
          </div>
          <div className="principles-grid">
            {principles.map((principle) => (
              <article key={principle.number}>
                <b>{principle.number}</b>
                <h3>{principle.title}</h3>
                <p>{principle.copy}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="resume-board">
          <article className="education-panel">
            <p>EDUCATION / PRIMARY PROCESS</p>
            <span className="education-gpa">{profile.education.gpa}</span>
            <small>GPA</small>
            <h3>{profile.education.degree}</h3>
            <p>{profile.education.minor}<br/>{profile.education.institution}<br/>{profile.education.period}</p>
            <a href={profile.resumeUrl} target="_blank">Open resume PDF <span aria-hidden="true">-&gt;</span></a>
          </article>
          <div className="experience-panel">
            <p className="panel-label">ROLES &amp; EXPERIENCE</p>
            {experience.map((item) => (
              <article key={item.role}>
                <span>{item.period}</span>
                <h3>{item.role}</h3>
                <b>{item.place}</b>
                <p>{item.summary}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="skill-ledger">
          <div className="archive-heading">
            <div><p>SKILL LEDGER / EVIDENCE FIRST</p><h3>Tools connected to the work.</h3></div>
            <p>No percentages and no logo wall. Each technical area points back to the projects that made it useful.</p>
          </div>
          <div className="skill-domain-grid">
            {skillDomains.map((domain, index) => (
              <article key={domain.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{domain.title}</h3>
                <p>{domain.evidence}</p>
                <ul>{domain.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>

        <div className="community-board">
          <div className="community-list">
            <p className="panel-label">ENGINEERING COMMUNITIES</p>
            {communities.map((community) => (
              <article key={community.name}>
                <span>{community.period}</span>
                <h3>{community.name}</h3>
                <p>{community.contribution}</p>
              </article>
            ))}
          </div>
          <div className="award-list">
            <p className="panel-label">RECOGNITION</p>
            <ol>{awards.map((award, index) => <li key={award}><span>{String(index + 1).padStart(2, '0')}</span>{award}</li>)}</ol>
          </div>
        </div>
      </section>

      <section className="contact-section pattern-lattice" id="contact">
        <div className="contact-stamp" aria-hidden="true">AV<br/><small>YWG</small></div>
        <SectionLabel number="05">CONTACT / OPEN CHANNEL</SectionLabel>
        <h2 tabIndex={-1}>Have a problem<br/><i>worth understanding?</i></h2>
        <p>Let us build something thoughtful, compare notes on a difficult system, or talk about software that reaches beyond the screen.</p>
        <a className="contact-link" href={`mailto:${profile.email}`}>
          <span>{profile.email}</span><b aria-hidden="true">-&gt;</b>
        </a>
        <div className="contact-actions">
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub / Aryan0826</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn / Aryan Vekariya</a>
          <a href={profile.resumeUrl} target="_blank">Resume / PDF</a>
          <button className="contact-command" onClick={() => onOpenTerminal('contact')}><span>Prefer commands?</span><b>run: contact</b></button>
        </div>
      </section>
    </main>
  );
}
