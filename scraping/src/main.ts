import chalk from 'chalk';
import { Command } from 'commander';
import inquirer from 'inquirer';
import { initDb } from './db';
import { createQueries } from './lib/createQueries';
import { processDataset } from './lib/process/processDataset';
import { runQuery } from './lib/runQuery';
import { keypress } from './util/awaitKeypress';
import { Opts } from './util/cli';

enum ACTION {
  CREATE_QUERIES = 'Create queries in database',
  RUN_QUERIES = 'Run Queries',
  PROCESS_RESULTS = 'Process Results',
  EXIT = 'Quit',
}

const main = async (program: Command) => {
  const opts = program.opts<Opts>();

  await initDb();
  while (true) {
    console.clear();
    console.log(
      chalk.magenta(`
   ____ _ _   _           _       __  __ _                 
  / ___(_) |_| |__  _   _| |__   |  \\/  (_)_ __   ___ _ __ 
 | |  _| | __| '_ \\| | | | '_ \\  | |\\/| | | '_ \\ / _ \\ '__|
 | |_| | | |_| | | | |_| | |_) | | |  | | | | | |  __/ |   
  \\____|_|\\__|_| |_|\\__,_|_.__/  |_|  |_|_|_| |_|\\___|_|   
                                                             `),
    );
    const answers: { action: ACTION } = await inquirer.prompt([
      /* Pass your questions in here */
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          ACTION.CREATE_QUERIES,
          ACTION.RUN_QUERIES,
          ACTION.PROCESS_RESULTS,
          ACTION.EXIT,
        ],
      },
    ]);

    switch (answers.action) {
      case ACTION.EXIT:
        process.exit(0);
      case ACTION.CREATE_QUERIES:
        await createQueries();
        break;
      case ACTION.RUN_QUERIES:
        while (true) {
          const success = await runQuery();
          if (!success) {
            break;
          }
        }
        break;
      case ACTION.PROCESS_RESULTS:
        await processDataset();
        break;
    }

    await keypress();

    // // await writeReadmes();

    // // await processKeywordsInReadmes();
    // // await processKeywordsInDescriptions();
    // // await getDatasetSize();

    // await getCommonKeywordsFromReadmes();
  }
};
export default main;
