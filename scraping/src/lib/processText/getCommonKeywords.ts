import { writeFileSync } from 'fs';
import { RepositoryText } from '../../db/RepositoryText';

export const getCommonKeywordsFromReadmes = async () => {
  const keywordMap: { [key: string]: number } = {};

  const readmes = await RepositoryText.find();

  readmes.forEach(({ keywords_spacy, keywords_topicrank, keywords_yake }) => {
    // get set of keywords for this readme
    const keywords: string[] = [
      ...(keywords_spacy || []),
      ...(keywords_topicrank || []).map((k) => k[0] as string),
      ...(keywords_yake || []).map((k) => k[0] as string),
    ].map((k) => k.toLowerCase());

    const keywordsSet = [...new Set(keywords)];

    keywordsSet.forEach((keyword) => {
      if (keywordMap[keyword]) {
        keywordMap[keyword]++;
      } else {
        keywordMap[keyword] = 1;
      }
    });
  });

  // Sort map by value
  const sortedMap = Object.entries(keywordMap).sort((a, b) => b[1] - a[1]);

  console.log(sortedMap);

  const file = writeFileSync(
    './keywords.json',
    JSON.stringify(sortedMap, undefined, 2),
  );
};
