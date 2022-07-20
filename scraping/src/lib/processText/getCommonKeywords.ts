import { writeFileSync } from 'fs';
import { Repository } from '../../db/repository';
import { RepositoryText } from '../../db/RepositoryText';

export const getCommonKeywordsFromReadmes = async () => {
  const keywordMap: { [key: string]: number } = {};

  const baselineProjects = await Repository.find({
    queries: {
      $elemMatch: { $regex: 'in' },
    },
  });

  const baselineIds = baselineProjects.map((p) => p.id);

  const readmes = await RepositoryText.find({
    _id: { $in: baselineIds },
  });

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

  // get top 100
  const top100 = sortedMap.slice(0, 100);

  const file = writeFileSync(
    './keywords.csv',
    top100.map(([keyword, count]) => `${keyword}, ${count}`).join('\n'),
  );
};
