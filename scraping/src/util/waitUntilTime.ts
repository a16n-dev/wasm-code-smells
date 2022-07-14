import chalk from 'chalk';
import { format } from 'date-fns';
import formatDuration from 'format-duration';
import { wait } from './wait';

export const waitUntilTime = async (
  time: number,
  checkInterval: number = 5,
) => {
  const resetDate = new Date(0).setUTCSeconds(time);
  while (true) {
    const now = Date.now() / 1000;
    const timeRemaining = time - now;

    console.clear();
    console.log(
      chalk.cyan(
        `Rate limit reset at ${format(
          resetDate,
          'HH:mm:ss',
        )} in ${formatDuration(timeRemaining * 1000)}`,
      ),
    );
    await wait(checkInterval);
    if (timeRemaining <= 0) {
      break;
    }
  }
};
