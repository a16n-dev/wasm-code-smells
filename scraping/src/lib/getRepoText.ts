import { Repository } from '../db/repository';
import { octokit } from './octokit';

/**
 * Get the description and readme of repositories
 */
export const getRepoText = async () => {
  // find repo that doesnt have readme
  const repo = await Repository.findOne({
    readme: undefined,
    exclude: { $in: [false, undefined] },
  });

  if (repo) {
    try {
      console.log(`[run] Getting readme for ${repo._id}`);
      // Fetch readme
      const { data } = await octokit.request('GET /repos/:owner/:repo/readme', {
        owner: (repo.user as any).name,
        repo: repo.name,
      });

      const readme = Buffer.from(data.content, 'base64').toString();

      repo.readme = readme;
    } catch (error) {
      console.log(`[error] ${error.message}`);
      if (!error.message.startsWith('API rate limit exceeded ')) {
        repo.readme = '';
      } else {
        console.log(error);
      }
    }

    await repo.save();

    return true;
  } else {
    return false;
  }
};
