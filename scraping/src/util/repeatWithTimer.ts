import chalk from 'chalk';
import format from 'format-duration';
import { performance } from 'perf_hooks';
import { wait } from './wait';
import { waitUntilTime } from './waitUntilTime';

/**
 *
 * @param totalCount The total number of operations to run
 * @param fn a function that takes a rate limit callback and returns a promise representing if an item was processed succesfully
 */
export const repeatWithTimer = async (
  totalCount: number,
  fn: (setRateLimit: (remaining: any, total: any) => void) => Promise<boolean>,
) => {
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
        (totalMsTaken / processed) * (totalCount - processed);
      console.clear();
      console.log(
        chalk.cyan(
          `${totalCount - processed} remaining (${(
            (processed / (processed + totalCount)) *
            100
          ).toFixed(0)}% complete) ${format(
            estTimeRemaining,
          )} remaining\nRate limit: ${rateTotal - rateUsed}/${rateTotal} used`,
        ),
      );

      // Process the repository
      var startTime = performance.now();
      const success = await fn(setRateLimit);
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
      if (
        error.message.startsWith('You have exceeded a secondary rate limit')
      ) {
        console.log(chalk.red(`[Error] Secondary Rate limit hit`));
        await wait(5);
      }
    }
  }
};
