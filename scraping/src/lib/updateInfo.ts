import { Repository } from '../db/repository';
import { wait } from '../util/wait';
import { octokit } from './octokit';

export const updateInfo = async (): Promise<Boolean> => {
  // find repo where stars is undefined
  const repo = await Repository.findOne({
    description: { $exists: false },
    // exclude should be false or undefined
    exclude: { $in: [false, undefined] },
  });

  // Fetch info from github api
  if (repo) {
    console.log(`[update] ${repo._id}`);
    try {
      // get data
      const { data: d } = await octokit.request('GET /repos/:owner/:repo', {
        owner: (repo.user as any)?.name || '',
        repo: repo.name,
      });

      await Repository.updateOne(
        { _id: d.full_name },
        {
          _id: d.full_name,
          githubId: d.id,
          name: d.name,
          url: d.html_url,
          description: d.description,
          user: !d.owner
            ? undefined
            : {
                id: d.owner.id,
                name: d.owner.login,
              },
          createdAt: d.created_at,
          modifiedAt: d.updated_at,
          stars: d.stargazers_count,
          watchers: d.watchers_count,
          size: d.size,
          forks: d.forks_count,
          openIssues: d.open_issues_count,
          topics: d.topics || [],
        },
        {
          upsert: true,
        },
      );
    } catch (error) {
      console.log(error);
      if (error.response.status === 404) {
        console.log(`[error] excluding ${repo._id}`);
        repo.exclude = true;
        await repo.save();
      }
      await wait(15);
    }
    return true;
  } else {
    return false;
  }
};
