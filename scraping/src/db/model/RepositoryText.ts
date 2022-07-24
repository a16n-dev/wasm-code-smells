import { model, Schema } from 'mongoose';

const RepositoryTextSchema = new Schema({
  _id: { type: String },
  original: { type: String, required: true },
  plaintext: { type: String },
  keywords_spacy: { type: [String], default: null },
  keywords_yake: { type: [[String, Number]], default: null },
  keywords_topicrank: { type: [[String, Number]], default: null },
});

export const RepositoryText = model('RepositoryText', RepositoryTextSchema);
