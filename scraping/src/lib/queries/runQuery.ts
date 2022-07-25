import { Query } from '../../db/model/Query';
import { Repository } from '../../db/model/Repository';
import { octokit } from '../../util/octokit';

export const runQuery = async (
  targetCollection: string,
  setRateLimit: (remaining: any, total: any) => void,
) => {
  // Find Query with finished set to false
  const query = await Query(targetCollection).findOne({ finished: false });

  if (!query) {
    console.log(`[complete] No unfinished queries`);
    return false;
  }

  console.log(`[run] ${query.key}`);

  let resultCount = query.results;
  try {
    if (query.type === 'repository') {
      console.log(`[run] fetching page ${query.cursor}`);

      const { data, headers } = await octokit.request(
        'GET /search/repositories',
        {
          q: query.query,
          per_page: 100,
          page: query.cursor,
          sort: (query.sort as any) || 'stars',
          order: 'desc',
        },
      );

      setRateLimit(
        headers['x-ratelimit-remaining'],
        headers['x-ratelimit-limit'],
      );

      resultCount += data.items.length;

      for (const d of data.items) {
        await Repository(targetCollection).updateOne(
          { _id: d.full_name },
          {
            _id: d.full_name,
            githubId: d.id,
            url: d.html_url,
            $addToSet: { queries: query.key },
          },
          {
            upsert: true,
          },
        );
      }
    } else if (query.type === 'code') {
      console.log(`[run] fetching page ${query.cursor}`);

      const { data, headers } = await octokit.request('GET /search/code', {
        q: query.query,
        per_page: 100,
        page: query.cursor,
        sort: 'indexed',
        order: 'desc',
      });

      setRateLimit(
        headers['x-ratelimit-remaining'],
        headers['x-ratelimit-limit'],
      );

      resultCount += data.items.length;

      for (const code of data.items) {
        const d = code.repository;
        await Repository(targetCollection).updateOne(
          { _id: d.full_name },
          {
            _id: d.full_name,
            githubId: d.id,
            url: d.html_url,

            $addToSet: { queries: query.key },
          },
          {
            upsert: true,
          },
        );
      }
    }
  } catch (error) {
    console.log(`[error] query failed: ${error.message}`);
    if (error.message === 'Only the first 1000 search results are available') {
      query.finished = true;
    } else {
      throw error;
    }
  }

  query.results = resultCount;
  query.cursor += 1;

  if (resultCount >= (query.totalResults || 0) || resultCount >= 1000) {
    query.finished = true;
    console.log(`[complete] ${query.key}`);
  }
  await query.save();
  return true;
};
