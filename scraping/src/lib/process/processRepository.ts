import colors from 'colors/safe';
import { getRepoInformation } from './getRepoInformation';
import { getRepoLanguages } from './getRepoLanguages';
import { getRepoReadme } from './getRepoReadme';
import { getUnprocessedRepo } from './helperFns';

/**
 * Takes a repository in the dataset and processes it.
 * This fetches the languages, readme, and other information
 * If the repository is not found, it will be marked as excluded
 */
export const processRepository = async (
  setRateLimit: (remaining: any, total: any) => void,
) => {
  // Find an unprocessed repo

  const repo = await getUnprocessedRepo();

  if (repo) {
    console.log(
      colors.magenta(`\n[start] ===== Processing ${repo._id} =====\n`),
    );

    repo.processed = true;

    const info = await getRepoInformation(repo._id, setRateLimit);

    if (!info) {
      // Assume that repository no longer exists
      console.log(
        colors.red(
          `[run] Excluding ${repo._id} (likely deleted or made private)`,
        ),
      );

      repo.exclude = true;
    } else {
      const readme = await getRepoReadme(repo._id, setRateLimit);

      const languages = await getRepoLanguages(repo._id, setRateLimit);

      // Save info
      repo.name = info.name;
      repo.user = {
        name: info.userName,
        id: info.userId,
      };
      repo.createdAt = info.createdAt;
      repo.modifiedAt = info.modifiedAt;
      repo.stars = info.stars;
      repo.forks = info.forks;
      repo.watchers = info.watchers;
      repo.size = info.size;
      repo.openIssues = info.openIssues;
      repo.topics = info.topics;

      // Save languages & readme
      repo.languages = languages;
      repo.readme = readme;
    }
    await repo.save();
    console.log(colors.green(`[end] Successfully processed ${repo._id}`));
    return true;
  } else {
    console.log(colors.green(`[complete] No unprocessed repos`));
    return false;
  }
};
