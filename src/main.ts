import { Command } from 'commander';
import { Opts } from './util/cli';
import env from './util/env';

const main = async (program: Command) => {
  const opts = program.opts<Opts>();

  const name = opts.name;

  if (env.isDev) {
    console.log('running in development');
  }
  console.log(`hello ${name}`);
};

export default main;
