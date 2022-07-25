/**
 * Builds a dataset of projects based on the given queries
 */

import { createQueries, QueryDefinition } from '../queries/createQueries';
import { processDataset } from '../process/processDataset';
import { runQueries } from '../queries/runQueries';
import { generateRepositoryTextForAnalysis } from './generateRepositoryTextForAnalysis';

const COLLECTION = 'baseline';

export const repositoryQueries: QueryDefinition[] = [
  {
    key: 'BASELINE_C_POPULAR',
    name: 'Most popular c projects',
    query: 'language:c',
    sort: 'stars',
    type: 'repository',
  },
  {
    key: 'BASELINE_C_RECENT',
    name: 'Most recently updated c projects',
    query: 'language:cpp',
    sort: 'updated',
    type: 'repository',
  },
  {
    key: 'BASELINE_CPP_POPULAR',
    name: 'Most popular cpp projects',
    query: 'language:c',
    sort: 'stars',
    type: 'repository',
  },
  {
    key: 'BASELINE_CPP_RECENT',
    name: 'Most recently updated cpp projects',
    query: 'language:cpp',
    sort: 'updated',
    type: 'repository',
  },
];

export const buildKeywordBaselineDataset = async () => {
  // Create queries
  await createQueries(COLLECTION, repositoryQueries);

  // Run Queries
  await runQueries(COLLECTION);

  // Process
  await processDataset(COLLECTION);

  await generateRepositoryTextForAnalysis(COLLECTION);
};
