import { Repository } from '../../db/repository';

export const getUnprocessedRepo = async () => {
  return await Repository.findOne({
    processed: { $in: [false, undefined] },
  });
};

export const getOwnerAndName = (id: string): [owner: string, name: string] =>
  id.split('/') as [owner: string, name: string];
