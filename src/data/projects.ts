export type ProjectKey = 'server' | 'website' | 'gaming' | 'AI' | 'earth';

export interface ProjectMeta {
  key: ProjectKey;
  repoUrl?: string;
  liveUrl?: string;
  accent: string;
}

// Single source of truth for each project's external links and accent color.
// `repoUrl`/`liveUrl` are optional on purpose: a "GitHub"/"Live Demo" button only
// renders when the value is set, so no placeholder/fake links are added here —
// fill them in once a project's real repo or deployed demo is confirmed.
export const projects: ProjectMeta[] = [
  { key: 'server', repoUrl: 'https://github.com/cedrikletarte/homelab-infra', accent: '#6fc2b0' },
  { key: 'website', repoUrl: 'https://github.com/cedrikletarte/portfolio', accent: '#ec4899' },
  { key: 'gaming', accent: '#f59e0b' },
  { key: 'AI', accent: '#6366f1' },
  { key: 'earth', repoUrl: 'https://github.com/cedrikletarte/earth', accent: '#22d3ee' },
];

export const getProjectMeta = (key: ProjectKey) =>
  projects.find((p) => p.key === key);
