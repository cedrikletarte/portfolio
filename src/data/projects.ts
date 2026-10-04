export type ProjectKey = 'server' | 'website' | 'gaming' | 'ai' | 'earth';

export interface ProjectMeta {
  key: ProjectKey;
  accent: string;
  tags: string[];
  images: string[];
  // Shown before the screenshots (tile cover, first gallery item); see DIAGRAMS.
  diagram?: 'homelab';
  repoUrl?: string;
  liveUrl?: string;
}

// Single source of truth for each project's external links, accent color,
// tech tags and screenshot gallery. `repoUrl`/`liveUrl` are optional on
// purpose: a "GitHub"/"Live Demo" button only renders when the value is set.
// `images` is empty until a real screenshot is supplied — the grid falls
// back to a placeholder in that case. The first image is the tile's cover.
// Array order is display order: the first project gets the grid's big tile.
export const projects: ProjectMeta[] = [
  {
    key: 'server',
    accent: '#6fc2b0',
    repoUrl: 'https://github.com/cedrikletarte/homelab-infra',
    diagram: 'homelab',
    tags: [
      'Docker',
      'Ansible',
      'GitLab CI',
      'Traefik',
      'CrowdSec',
      'Cloudflare',
      'WireGuard',
      'Renovate',
      'n8n',
    ],
    images: ['/assets/screenshots/homarr.png'],
  },
  {
    key: 'gaming',
    accent: '#f59e0b',
    tags: ['Unity', 'C#'],
    images: [
      '/assets/screenshots/swinging.png',
      '/assets/screenshots/wallrun.png',
      '/assets/screenshots/fps.png',
      '/assets/screenshots/freecam.png',
      '/assets/screenshots/orthogonal.png',
      '/assets/screenshots/menu.png',
    ],
  },
  {
    key: 'earth',
    accent: '#22d3ee',
    repoUrl: 'https://github.com/cedrikletarte/earth',
    tags: ['Next.js', 'CesiumJS', 'Nominatim', 'TileServer-GL'],
    images: ['/assets/screenshots/earth.png'],
  },
  {
    key: 'ai',
    accent: '#6366f1',
    tags: [],
    images: ['/assets/screenshots/tictactoe.png'],
  },
  {
    key: 'website',
    accent: '#ec4899',
    repoUrl: 'https://github.com/cedrikletarte/portfolio',
    tags: ['Next.js', 'TypeScript', 'MUI', 'GSAP', 'Docker', 'GitLab CI/CD'],
    images: ['/assets/screenshots/thumbnail.png'],
  },
];

export const getProjectMeta = (key: ProjectKey) => projects.find((p) => p.key === key);
