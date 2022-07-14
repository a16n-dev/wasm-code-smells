import chalk from 'chalk';
import { handleGithubError } from '../../util/handleGithubError';
import { octokit } from '../octokit';
import { getOwnerAndName } from './helperFns';

export const getRepoLanguages = async (
  id: string,
  setRateLimit: (remaining: any, total: any) => void,
) => {
  console.log(chalk.blue(`[run] Getting languages for ${id}...`));

  const [owner, name] = getOwnerAndName(id);

  try {
    const { data, headers } = await octokit.request(
      'GET /repos/:owner/:repo/languages',
      {
        owner: owner,
        repo: name,
      },
    );

    setRateLimit(
      headers['x-ratelimit-remaining'],
      headers['x-ratelimit-limit'],
    );

    if (JSON.stringify(data) === '{}') {
      console.log(
        chalk.yellow(`[run] No languages found for ${owner}/${name}`),
      );
      return undefined;
    } else {
      console.log(chalk.green(`[run] Successfully got languages`));
      return Object.entries(data).map(([key, value]) => ({
        name: key,
        size: value as number,
      }));
    }
  } catch (error) {
    return handleGithubError(error);
  }
};
