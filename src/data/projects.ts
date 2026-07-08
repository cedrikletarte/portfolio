export type ProjectKey = 'server' | 'website' | 'gaming' | 'ai' | 'earth';

export interface ProjectMeta {
  key: ProjectKey;
  accent: string;
  tags: string[];
  images: string[];
  repoUrl?: string;
  liveUrl?: string;
}

// Single source of truth for each project's external links, accent color,
// tech tags and screenshot gallery. `repoUrl`/`liveUrl` are optional on
// purpose: a "GitHub"/"Live Demo" button only renders when the value is set.
// `images` is empty until a real screenshot is supplied — ProjectMedia falls
// back to a placeholder in that case.
export const projects: ProjectMeta[] = [
  {
    key: 'server',
    accent: '#6fc2b0',
    repoUrl: 'https://github.com/cedrikletarte/homelab-infra',
    tags: ['Cloudflare', 'Wireguard', 'Plex', 'Vaultwarden'],
    images: ['/assets/screenshots/homarr.png'],
  },
  {
    key: 'website',
    accent: '#ec4899',
    repoUrl: 'https://github.com/cedrikletarte/portfolio',
    tags: ['Next.js', 'TypeScript', 'MUI', 'Docker'],
    images: ['/assets/screenshots/thumbnail.png'],
  },
  {
    key: 'gaming',
    accent: '#f59e0b',
    tags: ['Unity', 'C#'],
    images: [
      '/assets/screenshots/menu.png',
      '/assets/screenshots/orthogonal.png',
      '/assets/screenshots/fps.png',
      '/assets/screenshots/freecam.png',
      '/assets/screenshots/wallrun.png',
      '/assets/screenshots/swinging.png',
    ],
  },
  {
    key: 'ai',
    accent: '#6366f1',
    tags: [],
    images: ['/assets/screenshots/tictactoe.png'],
  },
  {
    key: 'earth',
    accent: '#22d3ee',
    repoUrl: 'https://github.com/cedrikletarte/earth',
    tags: ['Next.js', 'CesiumJS'],
    images: ['/assets/screenshots/earth.png'],
  },
];

export const getProjectMeta = (key: ProjectKey) => projects.find((p) => p.key === key);
