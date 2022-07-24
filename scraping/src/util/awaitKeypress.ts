import chalk from 'chalk';

export const keypress = async () => {
  process.stdin.setRawMode(true);
  console.log(chalk.greenBright.inverse('Press any key to continue'));
  return new Promise<void>((resolve) => {
    process.stdin.resume();
    process.stdin.on('data', () => resolve());
  });
};
