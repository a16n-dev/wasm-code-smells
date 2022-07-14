import { model, Schema } from 'mongoose';

const RepositoryDescriptionSchema = new Schema({
  _id: { type: String },
  original: { type: String, required: true },
  keywords_spacy: { type: [String] },
  keywords_yake: { type: [[String, Number]] },
  keywords_topicrank: { type: [[String, Number]] },
});

export const RepositoryDescription = model(
  'RepositoryDescription',
  RepositoryDescriptionSchema,
);
