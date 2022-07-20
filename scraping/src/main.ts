import { Command } from 'commander';
import { exit } from 'process';
import { initDb } from './db';
import { createQueries } from './lib/createQueries';
import { processDataset } from './lib/process/processDataset';
import { getCommonKeywordsFromReadmes } from './lib/processText/getCommonKeywords';
import { writeReadmes } from './lib/processText/writeReadmes';
import { runQuery } from './lib/runQuery';
import { Opts } from './util/cli';

const main = async (program: Command) => {
  const opts = program.opts<Opts>();

  await initDb();

  // await sumQueries();

  await createQueries();

  while (true) {
    const success = await runQuery();
    if (!success) {
      break;
    }
  }

  await processDataset();

  // await writeReadmes();

  // await processKeywordsInReadmes();
  // await processKeywordsInDescriptions();
  // await getDatasetSize();

  await getCommonKeywordsFromReadmes();

  exit();
};

export default main;
