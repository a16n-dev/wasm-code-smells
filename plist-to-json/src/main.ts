import { Command } from 'commander';
import { readFileSync } from 'fs';
import { writeFile } from 'fs/promises';
import inquirer from 'inquirer';
import { extractBugReportsFromPlist } from './lib/extractBugReportsFromPlist';

const main = async (program: Command) => {
  const { file } = await inquirer.prompt([
    /* Pass your questions in here */
    {
      type: 'input',
      name: 'file',
      message: 'Enter a filename',
    },
  ]);

  // Open file as text
  const contents = readFileSync(file, 'utf8');

  const bugs = await extractBugReportsFromPlist(contents);

  await writeFile('output.json', JSON.stringify(bugs, null, 2));
};
export default main;
