import { Repository } from '../../db/model/Repository';

export const getUnprocessedRepo = async (collection: string) => {
  return await Repository(collection).findOne({
    processed: { $in: [false, undefined] },
  });
};

export const getOwnerAndName = (id: string): [owner: string, name: string] =>
  id.split('/') as [owner: string, name: string];
