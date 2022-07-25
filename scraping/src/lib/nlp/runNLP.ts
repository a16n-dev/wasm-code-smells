import { PythonShell } from 'python-shell';
import { execSync } from 'child_process';
import { setupPythonScripts } from './setupPythonScripts';
import chalk from 'chalk';

export const runNLP = async (collection: string) => {
  // Get location of python by running `pipenv --venv` inside the nlp directory

  setupPythonScripts();

  const pythonInstallation = execSync('pipenv --venv', {
    encoding: 'utf-8',
    cwd: './nlp',
  });

  return new Promise<void>((resolve, reject) => {
    console.log(chalk.blue('Running NLP Analysis'));
    const pyShell = new PythonShell('main.py', {
      pythonPath: `${pythonInstallation.trim()}/Scripts/python.exe`,
      scriptPath: './nlp',
      pythonOptions: ['-u'],
      args: [collection, `${pythonInstallation.trim()}/Lib/site-packages`],
    });

    pyShell.on('message', (message) => {
      // received a message sent from the Python script (a simple "print" statement)
      console.log(message);
    });

    pyShell.end(function (err, code, signal) {
      if (err) reject(err);
      resolve();
    });
  });
};
