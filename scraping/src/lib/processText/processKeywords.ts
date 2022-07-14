import { RepositoryText } from '../../db/RepositoryText';
import { RepositoryDescription } from '../../db/RepositoryDescription';
import chalk from 'chalk';
const keys = ['wasm', 'web assembly', 'webassembly', 'emscripten'];

export const processKeywordsInReadmes = async () => {
  // Process readmes
  const readmes = await RepositoryText.find();

  console.clear();
  console.log(chalk.blue(`Total Readmes: ${readmes.length}`));

  const baseCount = readmes.filter((r) => {
    // check if any of keys appears in the readme
    return keys.some((k) => r.plaintext?.toLowerCase().includes(k));
  });

  console.log(
    chalk.blue(`Num of repos that contain keywords: ${baseCount.length}`),
  );

  // Total for spacy
  const filteredSpacy = readmes.filter((r) => {
    const keywords = r.keywords_spacy?.map((k) => k.toLowerCase()) || [];

    return keys.some((k) => keywords.some((k2) => k2.includes(k)));
  });

  // Total for yake
  const filteredYake = readmes.filter((r) => {
    const keywords =
      r.keywords_yake?.map((k) => (k[0] as string).toLowerCase()) || [];

    return keys.some((k) => keywords.some((k2) => k2.includes(k)));
  });

  // Total for topicrank
  const filteredTopicRank = readmes.filter((r) => {
    const keywords =
      r.keywords_topicrank?.map((k) => (k[0] as string).toLowerCase()) || [];

    return keys.some((k) => keywords.some((k2) => k2.includes(k)));
  });

  console.log(chalk.blue(`Total for Spacy: ${filteredSpacy.length}`));
  console.log(chalk.blue(`Total for Yake: ${filteredYake.length}`));
  console.log(chalk.blue(`Total for TopicRank: ${filteredTopicRank.length}`));

  //   those that appeared in all 3
  const spacyIds = filteredSpacy.map((r) => r._id);
  const yakeIds = filteredYake.map((r) => r._id);
  const topicRankIds = filteredTopicRank.map((r) => r._id);

  const intersection = readmes.filter(
    (id) =>
      spacyIds.includes(id._id) &&
      yakeIds.includes(id._id) &&
      topicRankIds.includes(id._id),
  );

  console.log(chalk.green(`In all 3: ${intersection.length}`));
};

export const processKeywordsInDescriptions = async () => {
  // Process readmes
  const descriptions = await RepositoryDescription.find();

  console.log(chalk.green(`Total Descriptions: ${descriptions.length}`));

  // Total for spacy
  const filteredSpacy = descriptions.filter((r) => {
    const keywords = r.keywords_spacy?.map((k) => k.toLowerCase()) || [];

    return keys.some((k) => keywords.some((k2) => k2.includes(k)));
  });

  // Total for yake
  const filteredYake = descriptions.filter((r) => {
    const keywords =
      r.keywords_yake?.map((k) => (k[0] as string).toLowerCase()) || [];

    return keys.some((k) => keywords.some((k2) => k2.includes(k)));
  });

  // Total for topicrank
  const filteredTopicRank = descriptions.filter((r) => {
    const keywords =
      r.keywords_topicrank?.map((k) => (k[0] as string).toLowerCase()) || [];

    return keys.some((k) => keywords.some((k2) => k2.includes(k)));
  });

  const containsKeywords = descriptions.filter((d) => {
    return keys.some((k) => d.original.toLowerCase().includes(k));
  });

  console.log(chalk.green(`Mentioned: ${containsKeywords.length}`));
  console.log(chalk.green(`Total for Spacy: ${filteredSpacy.length}`));
  console.log(chalk.green(`Total for Yake: ${filteredYake.length}`));
  console.log(chalk.green(`Total for TopicRank: ${filteredTopicRank.length}`));

  //   those that appeared in all 3
  const spacyIds = filteredSpacy.map((r) => r._id);
  const yakeIds = filteredYake.map((r) => r._id);
  const topicRankIds = filteredTopicRank.map((r) => r._id);

  const intersection = descriptions.filter(
    (id) =>
      spacyIds.includes(id._id) &&
      yakeIds.includes(id._id) &&
      topicRankIds.includes(id._id),
  );

  console.log(chalk.green(`In all 3: ${intersection.length}`));
};

export const getDatasetSize = async () => {
  const descriptions = await RepositoryDescription.find();
  const readmes = await RepositoryText.find();

  const descriptionContainsKeywords = descriptions.filter((d) => {
    return keys.some((k) => d.original.toLowerCase().includes(k));
  });

  const filteredSpacy = readmes
    .filter((r) => {
      const keywords = r.keywords_spacy?.map((k) => k.toLowerCase()) || [];

      return keys.some((k) => keywords.some((k2) => k2.includes(k)));
    })
    .map((r) => r._id);

  // Total for yake
  const filteredYake = readmes
    .filter((r) => {
      const keywords =
        r.keywords_yake?.map((k) => (k[0] as string).toLowerCase()) || [];

      return keys.some((k) => keywords.some((k2) => k2.includes(k)));
    })
    .map((r) => r._id);

  // Total for topicrank
  const filteredTopicRank = readmes
    .filter((r) => {
      const keywords =
        r.keywords_topicrank?.map((k) => (k[0] as string).toLowerCase()) || [];

      return keys.some((k) => keywords.some((k2) => k2.includes(k)));
    })
    .map((r) => r._id);

  const descriptionIds = descriptionContainsKeywords.map((r) => r._id);

  const readmeIds = readmes
    .filter((id) => {
      let count = 0;

      count += +filteredSpacy.includes(id._id);
      count += +filteredYake.includes(id._id);
      count += +filteredTopicRank.includes(id._id);

      return count >= 2;
    })
    .map((r) => r._id);

  // array without duplicates
  const intersection2 = [...new Set([...descriptionIds, ...readmeIds])];
  console.log(chalk.green(`Matches criteria: ${intersection2.length}`));

  console.log(
    chalk.green(
      `Original dataset size: ${
        [
          ...new Set([
            ...readmes.map((r) => r._id),
            ...descriptions.map((d) => d._id),
          ]),
        ].length
      }`,
    ),
  );
};
