import chalk from 'chalk';
import format from 'format-duration';
import { performance } from 'perf_hooks';
import { Repository } from '../../db/repository';
import { waitUntilTime } from '../../util/waitUntilTime';
import { processRepository } from './processRepository';

/**
 * Processes repositories in the dataset, by fetching relevant information such as stars, languages and the project readme
 */
export const processDataset = async () => {
  const totalToProcess = await Repository.find({
    processed: { $in: [false, undefined] },
  });

  let processed = 0;

  let totalMsTaken = 0;

  let rateUsed = 0;
  let rateTotal = 0;

  const setRateLimit = (remaining: number, total: number) => {
    rateUsed = remaining;
    rateTotal = total;
  };

  while (true) {
    try {
      // Update the console output
      const estTimeRemaining =
        (totalMsTaken / processed) * (totalToProcess.length - processed);
      console.clear();
      console.log(
        chalk.cyan(
          `${totalToProcess.length - processed} remaining (${(
            (processed / (processed + totalToProcess.length)) *
            100
          ).toFixed(0)}% complete) ${format(
            estTimeRemaining,
          )} remaining\nRate limit: ${rateTotal - rateUsed}/${rateTotal} used`,
        ),
      );

      // Process the repository
      var startTime = performance.now();
      const success = await processRepository(setRateLimit);
      var endTime = performance.now();
      totalMsTaken += endTime - startTime;

      if (!success) {
        break;
      } else {
        processed++;
      }
    } catch (error) {
      if (error.message.startsWith('API rate limit exceeded')) {
        await waitUntilTime(error.response.headers['x-ratelimit-reset']);
      }
    }
  }
};
