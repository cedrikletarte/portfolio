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
    images: ['/assets/homarr.png'],
  },
  {
    key: 'website',
    accent: '#ec4899',
    repoUrl: 'https://github.com/cedrikletarte/portfolio',
    tags: ['Next.js', 'TypeScript', 'MUI', 'Docker'],
    images: ['/thumbnail.png'],
  },
  {
    key: 'gaming',
    accent: '#f59e0b',
    tags: ['Unity', 'C#'],
    images: [
      '/assets/menu.png',
      '/assets/orthogonal.png',
      '/assets/fps.png',
      '/assets/freecam.png',
      '/assets/wallrun.png',
      '/assets/swinging.png',
    ],
  },
  {
    key: 'ai',
    accent: '#6366f1',
    tags: [],
    images: ['/assets/tictactoe.png'],
  },
  {
    key: 'earth',
    accent: '#22d3ee',
    repoUrl: 'https://github.com/cedrikletarte/earth',
    tags: ['Next.js', 'CesiumJS'],
    images: ['/assets/earth.png'],
  },
];

export const getProjectMeta = (key: ProjectKey) =>
  projects.find((p) => p.key === key);
