import chalk from 'chalk';
import JSZip from 'jszip';
import { Repository } from '../../db/model/Repository';
import { RepositoryDescription } from '../../db/model/RepositoryDescription';
import { RepositoryText } from '../../db/model/RepositoryText';
import { readmeToPlaintext } from './readmeToPlaintext';

export const writeReadmes = async () => {
  const repositories = await Repository.find({
    exclude: { $in: [false, undefined] },
    processed: true,
  });

  var zip = new JSZip();

  for (const repository of repositories) {
    const fileName = repository._id.replace('/', '-');
    // if readme or description
    if (repository.readme) {
      console.log(chalk.blue(`[write] Writing readme for ${repository._id}`));

      await RepositoryText.updateOne(
        {
          _id: repository._id,
        },
        {
          _id: repository._id,
          original: repository.readme,
          plaintext: readmeToPlaintext(repository.readme),
        },
        { upsert: true },
      );
    }
    if (repository.description) {
      console.log(
        chalk.blue(`[write] Writing description for ${repository._id}`),
      );

      await RepositoryDescription.updateOne(
        {
          _id: repository._id,
        },
        {
          _id: repository._id,
          original: repository.description,
        },
        { upsert: true },
      );
    }
  }

  console.log(chalk.green(`[finish] Writing zip file...`));
};
