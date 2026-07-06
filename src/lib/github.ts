export interface GithubStats {
  username: string;
  avatarUrl: string;
  profileUrl: string;
  publicRepos: number;
  topLanguages: { name: string; count: number }[];
}

interface GithubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
}

interface GithubRepo {
  fork: boolean;
  language: string | null;
}

const GITHUB_API = 'https://api.github.com';

function authHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'cedrikletarte-portfolio',
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

// Server-only: fetches public GitHub profile stats for display on the portfolio.
// Cached for an hour via Next.js ISR so it doesn't hit the API on every request.
export async function fetchGithubStats(username: string): Promise<GithubStats | null> {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`${GITHUB_API}/users/${username}`, {
        headers: authHeaders(),
        next: { revalidate: 3600 },
      }),
      fetch(`${GITHUB_API}/users/${username}/repos?per_page=100&sort=updated`, {
        headers: authHeaders(),
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok || !reposRes.ok) return null;

    const user: GithubUser = await userRes.json();
    const repos: GithubRepo[] = await reposRes.json();

    const ownRepos = repos.filter((r) => !r.fork);

    const languageCounts = new Map<string, number>();
    for (const repo of ownRepos) {
      if (!repo.language) continue;
      languageCounts.set(repo.language, (languageCounts.get(repo.language) ?? 0) + 1);
    }
    const topLanguages = [...languageCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, count]) => ({ name, count }));

    return {
      username: user.login,
      avatarUrl: user.avatar_url,
      profileUrl: user.html_url,
      publicRepos: user.public_repos,
      topLanguages,
    };
  } catch {
    return null;
  }
}
