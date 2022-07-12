import { Command } from 'commander';
import { exit } from 'process';
import { initDb } from './db';
import { processDataset } from './lib/process/processDataset';
import { readmeToPlaintext } from './lib/processText/readmeToPlaintext';
import { writeReadmes } from './lib/processText/writeReadmes';
import { Opts } from './util/cli';

const main = async (program: Command) => {
  const opts = program.opts<Opts>();

  await initDb();

  // await sumQueries();

  // await createQueries();

  // while (true) {
  //   const success = await runQuery();
  //   if (!success) {
  //     break;
  //   }
  // }

  await writeReadmes();

  // await processDataset();

  exit();
};

export default main;
