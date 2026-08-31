import {
  awards,
  communities,
  experience,
  getProjectNumber,
  journey,
  principles,
  profile,
  projects,
  skillDomains,
} from '../data/portfolio';

export type TerminalLink = { label: string; href: string };
export type TerminalEffect =
  | { type: 'navigate'; target: string }
  | { type: 'mode'; mode: 'gui' }
  | { type: 'theme'; theme: 'paper' | 'night' }
  | { type: 'clear' };

export type TerminalResponse = {
  lines: string[];
  kind?: 'normal' | 'error' | 'success';
  links?: TerminalLink[];
  effect?: TerminalEffect;
};

const staticCommands = [
  'help',
  'whoami',
  'ls',
  'pwd',
  'work',
  'projects',
  'journey',
  'about',
  'skills',
  'research',
  'education',
  'experience',
  'community',
  'awards',
  'contact',
  'resume',
  'open work',
  'open journey',
  'open about',
  'open contact',
  'theme paper',
  'theme night',
  'gui',
  'clear',
];

export const commandNames = [
  ...staticCommands,
  ...projects.map((project) => `cat ${project.slug}`),
];

export function normalizeCommand(raw: string) {
  return raw.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function suggestCommands(raw: string) {
  const clean = normalizeCommand(raw);
  if (!clean) return staticCommands.slice(0, 6);
  const starts = commandNames.filter((name) => name.startsWith(clean));
  if (starts.length) return starts.slice(0, 6);
  return commandNames.filter((name) => name.includes(clean)).slice(0, 4);
}

function projectLines(slug: string): TerminalResponse {
  const project = projects.find((item) => item.slug === slug);
  if (!project) {
    const suggestions = projects.filter((item) => item.slug.includes(slug)).slice(0, 2);
    return {
      kind: 'error',
      lines: [
        `Project "${slug}" not found.`,
        suggestions.length
          ? `Maybe: ${suggestions.map((item) => item.slug).join(' or ')}`
          : 'Run "work" to list project slugs.',
      ],
    };
  }

  return {
    lines: [
      `${getProjectNumber(project)} / ${project.title} / ${project.year}`,
      `BUILT      ${project.built}`,
      `WHY        ${project.reason}`,
      `STARTED    ${project.startedWith}`,
      `LEARNED    ${project.learned}`,
      `CHALLENGE  ${project.challenge}`,
      `OUTCOME    ${project.outcome}`,
      `STACK      ${project.stack.join(' | ')}`,
    ],
  };
}

export function executePortfolioCommand(raw: string): TerminalResponse {
  const clean = normalizeCommand(raw);

  if (clean === 'clear') return { lines: [], effect: { type: 'clear' } };
  if (clean === 'help') {
    return {
      lines: [
        'EXPLORE   whoami | work | journey | about | skills | research',
        'PROFILE   education | experience | community | awards | contact | resume',
        'DETAIL    cat <project-slug>',
        'NAVIGATE  open <work|journey|about|contact> | gui',
        'SYSTEM    theme <paper|night> | clear | ls | pwd',
      ],
    };
  }
  if (clean === 'whoami') {
    return {
      kind: 'success',
      lines: [
        `${profile.name} - ${profile.headline}`,
        profile.intro,
        `${profile.education.degree}, ${profile.education.minor}`,
        `${profile.location} | building since 2023`,
      ],
    };
  }
  if (clean === 'ls') {
    return {
      lines: [
        'work/  journey/  research/  community/  manual.md  skills.txt  resume.pdf  contact.sh',
      ],
    };
  }
  if (clean === 'pwd') return { lines: ['/home/aryan/aangan'] };
  if (clean === 'work' || clean === 'projects') {
    return {
      lines: projects.map(
        (project) => `${getProjectNumber(project)}  ${project.slug.padEnd(33, ' ')} ${project.status}`,
      ),
    };
  }
  if (clean.startsWith('projects ')) {
    const query = clean.slice('projects '.length);
    const matches = projects.filter((project) =>
      `${project.category} ${project.title} ${project.stack.join(' ')}`.toLowerCase().includes(query),
    );
    return {
      kind: matches.length ? 'normal' : 'error',
      lines: matches.length
        ? matches.map((project) => `${project.slug} - ${project.summary}`)
        : [`No projects match "${query}".`],
    };
  }
  if (clean.startsWith('cat ')) return projectLines(clean.slice(4));
  if (clean === 'journey') {
    return {
      lines: journey.flatMap((item) => [
        `${item.year} / ${item.title}`,
        `  ${item.note}`,
      ]),
    };
  }
  if (clean === 'about' || clean === 'manual') {
    return { lines: principles.map((item) => `${item.number}  ${item.title} ${item.copy}`) };
  }
  if (clean === 'skills') {
    return {
      lines: skillDomains.flatMap((domain) => [
        `${domain.title.toUpperCase()} - ${domain.skills.join(' | ')}`,
        `  Evidence: ${domain.evidence}`,
      ]),
    };
  }
  if (clean === 'research') {
    const matches = projects.filter(
      (project) => project.category === 'AI & Research' || project.category === 'Robotics',
    );
    return { lines: matches.map((project) => `${project.title} - ${project.summary}`) };
  }
  if (clean === 'education') {
    return {
      lines: [
        `${profile.education.institution} / ${profile.education.period}`,
        `${profile.education.degree} / ${profile.education.minor}`,
        `GPA ${profile.education.gpa}`,
      ],
    };
  }
  if (clean === 'experience') {
    return { lines: experience.map((item) => `${item.period} / ${item.role} @ ${item.place} - ${item.summary}`) };
  }
  if (clean === 'community') {
    return { lines: communities.map((item) => `${item.name} / ${item.period} - ${item.contribution}`) };
  }
  if (clean === 'awards') return { kind: 'success', lines: awards.map((award) => `+ ${award}`) };
  if (clean === 'contact') {
    return {
      kind: 'success',
      lines: ['Have a problem worth understanding? Let us compare notes or build something thoughtful.'],
      links: [
        { label: profile.email, href: `mailto:${profile.email}` },
        { label: 'github.com/Aryan0826', href: profile.github },
      ],
    };
  }
  if (clean === 'resume') {
    return {
      lines: ['Resume mounted at /public/AryanVekariya-Resume.pdf'],
      links: [{ label: 'Open resume PDF', href: profile.resumeUrl }],
    };
  }
  if (clean === 'gui') return { lines: [], effect: { type: 'mode', mode: 'gui' } };
  if (clean.startsWith('open ')) {
    const section = clean.slice(5);
    const alias: Record<string, string> = { manual: 'about', projects: 'work', home: 'home' };
    const target = alias[section] ?? section;
    if (['home', 'work', 'journey', 'about', 'contact'].includes(target)) {
      return { lines: [], effect: { type: 'navigate', target } };
    }
    return { kind: 'error', lines: [`No door named "${section}". Try work, journey, about, or contact.`] };
  }
  if (clean.startsWith('theme ')) {
    const next = clean.slice(6);
    if (next === 'paper' || next === 'night') {
      return {
        kind: 'success',
        lines: [`Theme changed to ${next}.`],
        effect: { type: 'theme', theme: next },
      };
    }
    return { kind: 'error', lines: ['Available themes: paper, night.'] };
  }

  const suggestions = suggestCommands(clean).slice(0, 2);
  return {
    kind: 'error',
    lines: [
      `Command "${clean}" not found.`,
      suggestions.length ? `Maybe: ${suggestions.join(' or ')}` : 'Try "help".',
    ],
  };
}
