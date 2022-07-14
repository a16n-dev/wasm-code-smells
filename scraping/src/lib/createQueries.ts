import { Query } from '../db/Query';
import { wait } from '../util/wait';
import { octokit } from './octokit';
import { codeQueries, repositoryQueries } from './queries';

/**
 * Creates all of the queries in a "queries" collection in the database.
 * The number of results for each query is also fetched from the API
 */
export const createQueries = async () => {
  console.log('Creating queries in db...');
  for (const q of repositoryQueries) {
    // Check if query with this key exists
    const existingQuery = await Query.findOne({ key: q.key });
    if (!existingQuery) {
      console.log(`[create] ${q.key} doesn't exist in db`);

      const { data } = await octokit.request('GET /search/repositories', {
        q: q.query,
      });

      const query = new Query({
        key: q.key,
        cursor: 1,
        description: q.name,
        query: q.query,
        totalResults: data.total_count,
        sort: q.sort,
        type: 'repository',
      });

      await query.save();
    } else {
      console.log(`[skip] ${q.key} already exists in db`);
    }
  }

  for (const q of codeQueries) {
    // Check if query with this key exists
    const existingQuery = await Query.findOne({ key: q.key });
    if (!existingQuery) {
      console.log(`[create] ${q.key} doesn't exist in db`);

      try {
        const { data } = await octokit.request('GET /search/code', {
          q: q.query,
        });

        const query = new Query({
          key: q.key,
          cursor: 1,
          description: q.name,
          query: q.query,
          totalResults: data.total_count,
          type: 'code',
        });

        await query.save();
      } catch (error) {
        console.log(error);
      }
      await wait(15);
    } else {
      console.log(`[skip] ${q.key} already exists in db`);
    }
  }
};
