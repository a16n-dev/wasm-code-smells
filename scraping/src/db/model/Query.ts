import { model, Schema } from 'mongoose';

// Represents a query to be made to the github search API
const QuerySchema = new Schema({
  key: { type: String, required: true, index: { unique: true } },
  description: { type: String, required: true },
  query: { type: String, required: true },
  sort: { type: String, required: false },
  totalResults: Number,
  cursor: { type: Number, default: 0, required: true },
  finished: { type: Boolean, default: false },
  results: { type: Number, required: true, default: 0 },
  type: { type: String, required: true, enum: ['repository', 'code'] },
});

QuerySchema.virtual('repositories', {
  ref: 'Repository',
  localField: 'key',
  foreignField: 'queryKey',
});

export const Query = (collection: string) =>
  model('Query', QuerySchema, `query-${collection}`);
