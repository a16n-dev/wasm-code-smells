import { writeFileSync } from 'fs';
import { RepositoryText } from '../../db/model/RepositoryText';

export const getCommonKeywords = async (collection: string) => {
  const keywordMap: { [key: string]: number } = {};

  const repositories = await RepositoryText(collection).find();

  repositories.forEach(
    ({ keywords_spacy, keywords_topicrank, keywords_yake }) => {
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
    },
  );

  // Sort map by value
  const sortedMap = Object.entries(keywordMap).sort((a, b) => b[1] - a[1]);

  // get top 100
  const top100 = sortedMap.slice(0, 100);

  const file = writeFileSync(
    './keywords.csv',
    top100.map(([keyword, count]) => `${keyword}, ${count}`).join('\n'),
  );
};
