import * as colors from 'colors/safe';
import { handleGithubError } from '../../util/handleGithubError';
import { octokit } from '../octokit';
import { getOwnerAndName } from './helperFns';

export const getRepoLanguages = async (id: string) => {
  console.log(colors.blue(`[run] Getting languages for ${id}...`));

  const [owner, name] = getOwnerAndName(id);

  try {
    const { data } = await octokit.request(
      'GET /repos/:owner/:repo/languages',
      {
        owner: owner,
        repo: name,
      },
    );

    if (JSON.stringify(data) === '{}') {
      console.log(
        colors.yellow(`[run] No languages found for ${owner}/${name}`),
      );
      return undefined;
    } else {
      console.log(colors.green(`[run] Successfully got languages`));
      return Object.entries(data).map(([key, value]) => ({
        name: key,
        size: value as number,
      }));
    }
  } catch (error) {
    return handleGithubError(error);
  }
};
