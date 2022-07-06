import { Command } from 'commander';
import { exit } from 'process';
import { initDb } from './db';
import { createQueries } from './lib/createQueries';
import { getLanguages } from './lib/getLanguages';
import { runQuery } from './lib/runQuery';
import { getDataset } from './lib/setLangPercent';
import { sumQueries } from './lib/sumQueries';
import { updateInfo } from './lib/updateInfo';
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

  // while (true) {
  //   const success = await updateInfo();
  //   if (!success) {
  //     break;
  //   }
  // }

  // while (true) {
  //   const success = await getLanguages();
  //   if (!success) {
  //     break;
  //   }
  // }

  await getDataset();

  exit();
};

export default main;
