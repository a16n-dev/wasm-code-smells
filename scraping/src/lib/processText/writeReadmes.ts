import { createWriteStream, existsSync, mkdirSync, writeFileSync } from 'fs';
import { Repository } from '../../db/repository';
import markdownToTxt from 'markdown-to-txt';
import colors from 'colors/safe';
import JSZip from 'jszip';
import { readmeToPlaintext } from './readmeToPlaintext';
import { RepositoryText } from '../../db/RepositoryText';
export const writeReadmes = async () => {
  const repositories = await Repository.find({
    exclude: { $in: [false, undefined] },
  });

  var zip = new JSZip();

  for (const repository of repositories) {
    const fileName = repository._id.replace('/', '-');
    // if readme or description
    if (repository.readme) {
      console.log(colors.blue(`[write] Writing readme for ${repository._id}`));
      zip.file(`readme/${fileName}.txt`, readmeToPlaintext(repository.readme));
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
        colors.blue(`[write] Writing description for ${repository._id}`),
      );
      zip.file(`description/${fileName}.txt`, repository.description, {});
    }
  }

  console.log(colors.green(`[finish] Writing zip file...`));

  const file = await zip.generateAsync({ type: 'nodebuffer' });

  writeFileSync('dataset_text.zip', file);
};