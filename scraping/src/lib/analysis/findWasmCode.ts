import chalk from 'chalk';
import { handleGithubError } from '../../util/handleGithubError';
import { octokit } from '../../util/octokit';
import { getOwnerAndName } from '../process/helperFns';

/**
 * Looks for occurences of wasm code snippets in a repository
 */
export const findWasmCode = async (
  id: string,
  setRateLimit: (remaining: any, total: any) => void,
) => {
  console.log(chalk.blue(`[run] Getting languages for ${id}...`));

  const [owner, name] = getOwnerAndName(id);

  try {
    const { data, headers } = await octokit.request('GET /search/code', {
      q: `repo:${id} `,
    });

    setRateLimit(
      headers['x-ratelimit-remaining'],
      headers['x-ratelimit-limit'],
    );
  } catch (error) {
    return handleGithubError(error);
  }
};
