import { model, Schema } from 'mongoose';

const RepositoryDescriptionSchema = new Schema({
  _id: { type: String },
  original: { type: String, required: true },
  keywords_spacy: { type: [String], default: null },
  keywords_yake: { type: [[String, Number]], default: null },
  keywords_topicrank: { type: [[String, Number]], default: null },
});

export const RepositoryDescription = model(
  'RepositoryDescription',
  RepositoryDescriptionSchema,
);
