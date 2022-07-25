import chalk from 'chalk';
import { Repository } from '../../db/model/Repository';
import { RepositoryText } from '../../db/model/RepositoryText';
import { readmeToPlaintext } from './readmeToPlaintext';

export const generateRepositoryTextForAnalysis = async (collection: string) => {
  const repositories = await Repository(collection).find({
    exclude: { $in: [false, undefined] },
    processed: true,
  });

  for (const repository of repositories) {
    // if readme or description
    let text: string[] = [];

    if (repository.description) {
      console.log(
        chalk.blue(`[write] Found Description for ${repository._id}`),
      );

      text.push(repository.description);
    }
    if (repository.readme) {
      text.push(readmeToPlaintext(repository.readme));
      console.log(chalk.blue(`[write] Found README for ${repository._id}`));
    }

    await RepositoryText(collection).updateOne(
      {
        _id: repository._id,
      },
      {
        _id: repository._id,
        text: text.join('\n\n'),
      },
      { upsert: true },
    );
  }
};
