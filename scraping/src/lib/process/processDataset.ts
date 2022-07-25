import { Repository } from '../../db/model/Repository';
import { repeatWithTimer } from '../../util/repeatWithTimer';
import { processRepository } from './processRepository';

/**
 * Processes repositories in the dataset, by fetching relevant information such as stars, languages and the project readme
 */
export const processDataset = async (collection: string) => {
  const totalToProcess = await Repository(collection).count({
    processed: { $in: [false, undefined] },
  });

  await repeatWithTimer(totalToProcess, (setRateLimit) =>
    processRepository(collection, setRateLimit),
  );
};
