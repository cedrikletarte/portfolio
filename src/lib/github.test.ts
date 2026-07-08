import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchGithubStats } from './github';

describe('fetchGithubStats', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns shaped stats on success, sorted by language frequency', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            login: 'octocat',
            avatar_url: 'https://avatars.githubusercontent.com/u/1',
            html_url: 'https://github.com/octocat',
            public_repos: 5,
            created_at: '2020-01-01T00:00:00Z',
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => [
            { fork: false, language: 'TypeScript' },
            { fork: false, language: 'TypeScript' },
            { fork: false, language: 'JavaScript' },
            { fork: true, language: 'Python' }, // forks are excluded
            { fork: false, language: null }, // no language, skipped
          ],
        }),
    );

    const stats = await fetchGithubStats('octocat');

    expect(stats).toEqual({
      username: 'octocat',
      avatarUrl: 'https://avatars.githubusercontent.com/u/1&s=80',
      profileUrl: 'https://github.com/octocat',
      publicRepos: 5,
      memberSince: 2020,
      topLanguages: [
        { name: 'TypeScript', count: 2 },
        { name: 'JavaScript', count: 1 },
      ],
    });
  });

  it('returns null when the GitHub API responds with an error status', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));

    expect(await fetchGithubStats('octocat')).toBeNull();
  });

  it('returns null instead of throwing when the network request fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));

    expect(await fetchGithubStats('octocat')).toBeNull();
  });
});
