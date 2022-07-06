import * as colors from 'colors/safe';
import { handleGithubError } from '../../util/handleGithubError';
import { octokit } from '../octokit';
import { getOwnerAndName } from './helperFns';

export interface RepoInfo {
  name: string;
  userName: string;
  userId: number;
  createdAt: Date;
  modifiedAt: Date;
  stars: number;
  forks: number;
  watchers: number;
  size: number;
  openIssues: number;
  topics: string[];
}

/**
 * Retrieves information about a repository such as name, stars, forks and topics
 */
export const getRepoInformation = async (id: string) => {
  console.log(colors.blue(`[run] Getting info for ${id}...`));

  const [owner, name] = getOwnerAndName(id);

  try {
    const { data } = await octokit.request('GET /repos/:owner/:repo', {
      owner: owner,
      repo: name,
    });

    const info: RepoInfo = {
      name: data.name,
      userName: data.owner.login,
      userId: data.owner.id,
      createdAt: data.created_at,
      modifiedAt: data.updated_at,
      stars: data.stargazers_count,
      forks: data.forks_count,
      watchers: data.watchers_count,
      size: data.size,
      openIssues: data.open_issues_count,
      topics: data.topics || [],
    };

    console.log(colors.green(`[run] Successfully got info`));
    return info;
  } catch (error) {
    return handleGithubError(error);
  }
};
