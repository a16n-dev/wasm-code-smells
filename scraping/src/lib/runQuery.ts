import axios from 'axios';
import { Octokit } from 'octokit';
import { Query } from '../db/Query';
import { Repository } from '../db/repository';
import { wait } from '../util/wait';
import { octokit } from './octokit';

export const runQuery = async () => {
  // Find Query with finished set to false
  const query = await Query.findOne({ finished: false });

  if (!query) {
    console.log(`[complete] No unfinished queries`);
    return false;
  }

  console.log(`[run] ${query.key}`);

  let page = query.cursor;
  let resultCount = query.results;

  let run = true;

  while (run) {
    if (query.type === 'repository') {
      try {
        console.log(`[run] fetching page ${page}`);

        const { data } = await octokit.request('GET /search/repositories', {
          q: query.query,
          per_page: 100,
          page,
          sort: 'stars',
          order: 'desc',
        });

        page += 1;
        resultCount += data.items.length;

        for (const d of data.items) {
          await Repository.updateOne(
            { _id: d.full_name },
            {
              _id: d.full_name,
              githubId: d.id,
              url: d.html_url,
              $addToSet: { queries: query.key },
            },
            {
              upsert: true,
            },
          );
        }
      } catch (error) {
        console.log(`[error] query failed: ${error}`);
        run = false;
      }
    } else if (query.type === 'code') {
      await wait(30);
      try {
        console.log(`[run] fetching page ${page}`);

        const { data } = await octokit.request('GET /search/code', {
          q: query.query,
          per_page: 100,
          page,
          sort: 'indexed',
          order: 'desc',
        });

        page += 1;
        resultCount += data.items.length;

        for (const code of data.items) {
          const d = code.repository;
          await Repository.updateOne(
            { _id: d.full_name },
            {
              _id: d.full_name,
              githubId: d.id,
              url: d.html_url,

              $addToSet: { queries: query.key },
            },
            {
              upsert: true,
            },
          );
        }
      } catch (error) {
        console.log(`[error] query failed: ${error.message}`);
        if (
          error.message === 'Only the first 1000 search results are available'
        ) {
          query.finished = true;
        }
        run = false;
      }
    }
    query.results = resultCount;
    query.cursor = page;
    if (resultCount >= (query.totalResults || 0) || resultCount >= 1000) {
      query.finished = true;
      run = false;
      console.log(`[complete] ${query.key}`);
    }
    query.save();
  }
  return true;
};
