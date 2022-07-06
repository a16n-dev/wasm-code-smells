import { Query } from '../db/Query';

export const sumQueries = async () => {
  const queries = await Query.find({
    type: 'code',
  });

  const totalResults = queries.reduce((acc, curr) => {
    console.log(curr.results);
    return acc + (curr.results || 0);
  }, 0);

  console.log(totalResults);
};
