import { Query } from '../../db/model/Query';
import { octokit } from '../../util/octokit';

export interface QueryDefinition {
  key: string;
  name: string;
  query: string;
  sort?: string;
  type: 'repository' | 'code';
}

const queryTypeEndpoints = {
  repository: 'GET /search/repositories',
  code: 'GET /search/code',
};

/**
 * Creates all of the queries in a "queries" collection in the database.
 * The number of results for each query is also fetched from the API
 */
export const createQueries = async (
  collection: string,
  queries: QueryDefinition[],
) => {
  console.log('Creating queries in db...');
  const QueryModel = Query(collection);
  for (const q of queries) {
    // Check if query with this key exists
    const existingQuery = await QueryModel.findOne({ key: q.key });
    if (!existingQuery) {
      console.log(`[create] ${q.key} doesn't exist in db`);

      const { data } = await octokit.request(queryTypeEndpoints[q.type], {
        q: q.query,
      });

      const query = new QueryModel({
        key: q.key,
        cursor: 1,
        description: q.name,
        query: q.query,
        totalResults: data.total_count,
        sort: q.sort,
        type: q.type,
      });

      await query.save();
    } else {
      console.log(`[skip] ${q.key} already exists in db`);
    }
  }
};
