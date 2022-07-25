import chalk from 'chalk';
import { execSync } from 'child_process';

export const setupPythonScripts = () => {
  console.log(chalk.blue('Installing python dependencies'));
  execSync('pipenv install', {
    encoding: 'utf-8',
    cwd: './nlp',
  });

  console.log(chalk.blue('Installing spacy language model'));
  execSync('pipenv run python -m spacy download en_core_web_sm', {
    encoding: 'utf-8',
    cwd: './nlp',
  });
};
