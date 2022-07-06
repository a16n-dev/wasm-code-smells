import * as colors from 'colors/safe';
import { handleGithubError } from '../../util/handleGithubError';
import { octokit } from '../octokit';
import { getOwnerAndName } from './helperFns';

export const getRepoReadme = async (id: string) => {
  console.log(colors.blue(`[run] Getting readme for ${id}...`));

  const [owner, name] = getOwnerAndName(id);
  try {
    const { data } = await octokit.request('GET /repos/:owner/:repo/readme', {
      owner: owner,
      repo: name,
    });

    const readme = Buffer.from(data.content, 'base64').toString();

    console.log(colors.green(`[run] Successfully got readme`));

    return readme;
  } catch (error) {
    return handleGithubError(error);
  }
};
