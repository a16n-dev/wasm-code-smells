import { Repository } from '../../db/model/Repository';

export const getUnprocessedRepo = async () => {
  return await Repository.findOne({
    processedAnalysis1: { $in: [false, undefined] },
  });
};
