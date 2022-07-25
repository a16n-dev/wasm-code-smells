import { model, Schema } from 'mongoose';

// Represents a repository, as a result of a query to the github search API
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
  processed: { type: Boolean, default: false },
  languages: {
    type: [
      {
        name: String,
        size: Number,
      },
    ],
  },
  exclude: { type: Boolean, default: false },
  description: { type: String },
  readme: { type: String },
  isWasmProject: { type: Boolean },
  processedAnalysis1: { type: Boolean },
  keyFiles: { type: [String], default: [] },
  wasmTags: { type: [String], default: [] },
});

export const Repository = (collection: string) =>
  model('Repository', RepositorySchema, `repository-${collection}`);
