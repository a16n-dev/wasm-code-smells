import colors from 'colors/safe';
import { Repository } from '../../db/repository';
import { processRepository } from './processRepository';
import { performance } from 'perf_hooks';
import format from 'format-duration';
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
    const estTimeRemaining =
      (totalMsTaken / processed) * (totalToProcess.length - processed);
    console.clear();
    console.log(
      colors.cyan(
        `${totalToProcess.length - processed} remaining (${(
          (processed / (processed + totalToProcess.length)) *
          100
        ).toFixed(0)}% complete) ${format(
          estTimeRemaining,
        )} remaining\nRate limit: ${rateTotal - rateUsed}/${rateTotal} used`,
      ),
    );

    var startTime = performance.now();

    const success = await processRepository(setRateLimit);

    var endTime = performance.now();

    totalMsTaken += endTime - startTime;
    if (!success) {
      break;
    } else {
      processed++;
    }
  }
};
