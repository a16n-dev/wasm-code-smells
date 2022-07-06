import { Repository } from '../db/repository';
import { wait } from '../util/wait';
import { octokit } from './octokit';

export const getLanguages = async (): Promise<Boolean> => {
  const repo = await Repository.findOne({
    languages: { $size: 0 },
    // exclude should be false or undefined
    exclude: { $in: [false, undefined] },
  });

  if (repo) {
    try {
      // get languages
      const { data } = await octokit.request(
        'GET /repos/:owner/:repo/languages',
        {
          owner: (repo.user as any)?.name || '',
          repo: repo.name,
        },
      );

      if (JSON.stringify(data) === '{}') {
        repo.exclude = true;
        console.log(`excluding ${repo.name}`);
      } else {
        // update languages
        repo.languages = Object.entries(data).map(([key, value]) => ({
          name: key,
          size: value,
        }));
      }

      await repo.save();
      console.log(`updated languages for ${repo._id}`);
    } catch (error) {
      await wait(15);

      console.log(`[wait] ${error}`);
    }
    return true;
  }

  return false;
};
