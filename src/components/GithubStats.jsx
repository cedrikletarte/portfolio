import { fetchGithubStats, fetchPinnedRepos } from '@/lib/github';
import GithubStatsClient from './GithubStatsClient';

const GITHUB_USERNAME = 'cedrikletarte';

// Server Component: the GitHub fetch happens at request/build time on the
// server (cached via Next's ISR in lib/github.ts), so the token never reaches
// the client and there's no client-side loading flash for the numbers.
export default async function GithubStats() {
  const [stats, pinnedRepos] = await Promise.all([
    fetchGithubStats(GITHUB_USERNAME),
    fetchPinnedRepos(GITHUB_USERNAME),
  ]);
  return <GithubStatsClient stats={stats} pinnedRepos={pinnedRepos} username={GITHUB_USERNAME} />;
}
