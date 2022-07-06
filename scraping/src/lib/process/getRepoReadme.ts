import colors from 'colors/safe';
import { handleGithubError } from '../../util/handleGithubError';
import { octokit } from '../octokit';
import { getOwnerAndName } from './helperFns';

export const getRepoReadme = async (
  id: string,
  setRateLimit: (remaining: any, total: any) => void,
) => {
  console.log(colors.blue(`[run] Getting readme for ${id}...`));

  const [owner, name] = getOwnerAndName(id);
  try {
    const { data, headers } = await octokit.request(
      'GET /repos/:owner/:repo/readme',
      {
        owner: owner,
        repo: name,
      },
    );

    setRateLimit(
      headers['x-ratelimit-remaining'],
      headers['x-ratelimit-limit'],
    );

    const readme = Buffer.from(data.content, 'base64').toString();

    console.log(colors.green(`[run] Successfully got readme`));

    return readme;
  } catch (error) {
    return handleGithubError(error);
  }
};