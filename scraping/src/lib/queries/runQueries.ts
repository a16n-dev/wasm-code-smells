import { Query } from '../../db/model/Query';
import { repeatWithTimer } from '../../util/repeatWithTimer';
import { runQuery } from './runQuery';

export const runQueries = async (collection: string) => {
  const queries = await Query(collection).find({
    finished: false,
  });

  const totalToProcess = queries.reduce(
    (acc, cur) => acc + Math.max(11 - cur.cursor, 0),
    0,
  );

  await repeatWithTimer(totalToProcess, (setRateLimit) =>
    runQuery(collection, setRateLimit),
  );
};
