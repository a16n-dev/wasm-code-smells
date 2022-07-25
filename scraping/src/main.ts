import chalk from 'chalk';
import { Command } from 'commander';
import inquirer from 'inquirer';
import { initDb } from './db';
import { runNLP } from './lib/nlp/runNLP';
import { processDataset } from './lib/process/processDataset';
import { buildKeywordBaselineDataset } from './lib/processText/buildKeywordBaselineDataset';
import { generateRepositoryTextForAnalysis } from './lib/processText/generateRepositoryTextForAnalysis';
import { createQueries } from './lib/queries/createQueries';
import { datasetQueries } from './lib/queries/queries';
import { runQueries } from './lib/queries/runQueries';
import { keypress } from './util/awaitKeypress';
import { Opts } from './util/cli';

enum ACTION {
  CREATE_QUERIES = 'Create queries in database',
  RUN_QUERIES = 'Run Queries',
  PROCESS_RESULTS = 'Process Results',
  GENERATE_REPOSITORY_TEXT_FOR_ANALYSIS = 'Generate Repository Text For Analysis',
  RUN_NLP_ON_REPOSITORY_TEXT = 'Run NLP On Repository Text',
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
    const { action, dataset }: { action: ACTION; dataset: string } =
      await inquirer.prompt([
        /* Pass your questions in here */
        {
          type: 'list',
          name: 'dataset',
          message: 'Choose a dataset',
          choices: ['baseline', 'dataset'],
        },
        {
          type: 'list',
          name: 'action',
          message: 'What would you like to do?',
          choices: [
            ACTION.CREATE_QUERIES,
            ACTION.RUN_QUERIES,
            ACTION.PROCESS_RESULTS,
            ACTION.GENERATE_REPOSITORY_TEXT_FOR_ANALYSIS,
            ACTION.RUN_NLP_ON_REPOSITORY_TEXT,
            ACTION.EXIT,
          ],
        },
      ]);

    switch (action) {
      case ACTION.EXIT:
        process.exit(0);
      case ACTION.CREATE_QUERIES:
        await createQueries(dataset, datasetQueries);
        break;
      case ACTION.RUN_QUERIES:
        await runQueries(dataset);
        break;
      case ACTION.PROCESS_RESULTS:
        await processDataset(dataset);
        break;
      case ACTION.GENERATE_REPOSITORY_TEXT_FOR_ANALYSIS:
        await generateRepositoryTextForAnalysis(dataset);
        break;
      case ACTION.RUN_NLP_ON_REPOSITORY_TEXT:
        await runNLP(dataset);
        break;
    }

    await keypress();
  }
};
export default main;
