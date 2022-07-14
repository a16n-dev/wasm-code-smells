import chalk from 'chalk';
import { format } from 'date-fns';

export const handleGithubError = (error: any) => {
  const msg = error.message;

  if (msg === 'Not Found') {
    console.log(chalk.yellow(`[Error] Not found, returning null`));
    return undefined;
  } else if (msg.startsWith('API rate limit exceeded')) {
    const resetDate = new Date(0).setUTCSeconds(
      error.response.headers['x-ratelimit-reset'],
    );
    console.log(
      chalk.red(
        `[Error] Rate limit hit. Resets at ${format(resetDate, 'HH:mm:ss')}`,
      ),
    );
    throw error;
  } else {
    console.log(chalk.red(`[Error] Unhandled Error: ${error.message}`));
    throw error;
  }
};
