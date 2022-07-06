import { writeFile } from 'fs/promises';
import { Octokit } from 'octokit';
import { createRepositoryDataset } from '../db/repository';
import { octokit } from './octokit';

export const getRepositories = async () => {
  // for (const { key, name, query } of repositoryQueries) {
  //   console.log(`Querying: ${name}`);
  //   const { data } = await octokit.request('GET /search/repositories', {
  //     q: query,
  //   });
  //   const dataset = createRepositoryDataset(key);
  //   // map data to result
  //   data.items.forEach((d) =>
  //     dataset.create({
  //       id: d.id,
  //       name: d.name,
  //       url: d.html_url,
  //       user: !d.owner
  //         ? undefined
  //         : {
  //             id: d.owner.id,
  //             name: d.owner.login,
  //           },
  //       createdAt: d.created_at,
  //       modifiedAt: d.updated_at,
  //       stars: d.stargazers_count,
  //       watchers: d.watchers_count,
  //       size: d.size,
  //       forks: d.forks_count,
  //       openIssues: d.open_issues_count,
  //       topics: d.topics || [],
  //       queryKey: key,
  //     }),
  //   );
  // }
  // const result = await octokit.request('GET /search/repositories', {
  //   q: 'webassembly language:c',
  // });
  // const result2 = await octokit.request('GET /search/code', {
  //   q: 'emsdk in:file language:c',
  // });
  // getAllResultsForQuery('GET /search/code', 'emsdk in:file');
  // writeFile('out.json', JSON.stringify(result2.data, null, 2), 'utf8');
  // console.log(result2.data.total_count);
};

const getAllResultsForQuery = async (path: string, query: string) => {
  const result = await octokit.request('GET /search/code', {
    q: query,
    per_page: 100,
  });

  await writeResults(result.data, path, query, 1);
};

const writeResults = async (
  results: any,
  path: string,
  query: string,
  page: number,
) => {
  await writeFile(
    `${path.split('/')[path.split('/').length - 1]}/${encodeURIComponent(
      query,
    )}-${page}.json`,
    JSON.stringify(results, null, 2),
    'utf8',
  );
};
