import { model, Schema } from 'mongoose';

// Represents a readme or description text of a github repository
const RepositoryTextSchema = new Schema({
  _id: { type: String },
  text: { type: String, required: true },
  keywords_spacy: { type: [String], default: null },
  keywords_yake: { type: [[String, Number]], default: null },
  keywords_topicrank: { type: [[String, Number]], default: null },
  processed: { type: Boolean, default: false },
});

export const RepositoryText = (collection: string) =>
  model(
    'RepositoryText',
    RepositoryTextSchema,
    `repository-text-${collection}`,
  );
