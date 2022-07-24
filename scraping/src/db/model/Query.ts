import { model, Schema } from 'mongoose';

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

export const Query = model('Query', QuerySchema);
