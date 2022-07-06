import { model, Schema } from 'mongoose';

const RepositorySchema = new Schema({
  _id: { type: String },
  githubId: Number,
  name: String,
  url: String,
  user: {
    type: {
      id: Number,
      name: String,
    },
  },
  createdAt: Date,
  modifiedAt: Date,
  stars: Number,
  watchers: Number,
  size: Number,
  forks: Number,
  openIssues: Number,
  topics: [String],
  queries: { type: [String], default: [] },
  languages: {
    type: [
      {
        name: String,
        size: Number,
      },
    ],
  },
  exclude: { type: Boolean, default: false },
});

export const Repository = model('Repository', RepositorySchema);

export const createRepositoryDataset = (queryName: string) =>
  model('Repository', RepositorySchema, queryName);
