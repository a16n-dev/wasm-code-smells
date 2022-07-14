import { Command } from 'commander';
import { exit } from 'process';
import { initDb } from './db';
import { createQueries } from './lib/createQueries';
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

  // await writeReadmes();

  // await processKeywordsInReadmes();
  // await processKeywordsInDescriptions();
  // await getDatasetSize();

  // await getCommonKeywordsFromReadmes();

  // await processDataset();

  exit();
};

export default main;
