import chalk from 'chalk';
import { getUnprocessedRepo } from './helperFns';

export const checkIfWasmProject1 = async (
  setRateLimit: (remaining: any, total: any) => void,
) => {
  const repo = await getUnprocessedRepo();

  if (repo) {
    console.log(
      chalk.magenta(`\n[start] ===== Processing ${repo._id} =====\n`),
    );

    // Get occurences of emscripten header

    repo.processedAnalysis1 = true;

    await repo.save();
    console.log(chalk.green(`[end] Successfully processed ${repo._id}`));
    return true;
  } else {
    console.log(chalk.green(`[complete] No unprocessed repos`));
    return false;
  }
};
