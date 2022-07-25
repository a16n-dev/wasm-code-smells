import { RepositoryText } from '../../db/model/RepositoryText';
import chalk from 'chalk';
const keys = ['wasm', 'web assembly', 'webassembly', 'emscripten'];

export const processKeywords = async () => {
  // Process readmes
  const texts = await RepositoryText.find();

  console.clear();
  console.log(chalk.blue(`Total texts: ${texts.length}`));

  const baseCount = texts.filter((r) => {
    // check if any of keys appears in the readme
    return keys.some((k) => r.text?.toLowerCase().includes(k));
  });

  console.log(
    chalk.blue(`Num of repos that contain keywords: ${baseCount.length}`),
  );

  // Total for spacy
  const filteredSpacy = texts.filter((r) => {
    const keywords = r.keywords_spacy?.map((k) => k.toLowerCase()) || [];

    return keys.some((k) => keywords.some((k2) => k2.includes(k)));
  });

  // Total for yake
  const filteredYake = texts.filter((r) => {
    const keywords =
      r.keywords_yake?.map((k) => (k[0] as string).toLowerCase()) || [];

    return keys.some((k) => keywords.some((k2) => k2.includes(k)));
  });

  // Total for topicrank
  const filteredTopicRank = texts.filter((r) => {
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

  const intersection = texts.filter(
    (id) =>
      spacyIds.includes(id._id) &&
      yakeIds.includes(id._id) &&
      topicRankIds.includes(id._id),
  );

  console.log(chalk.green(`In all 3: ${intersection.length}`));
};
