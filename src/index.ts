import { program } from 'commander';
import main from './main';

// cli options
program.option('--name <string>');

program.parse();

main(program);
