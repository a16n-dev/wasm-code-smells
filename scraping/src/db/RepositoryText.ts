import { model, Schema } from 'mongoose';

const RepositoryTextSchema = new Schema({
  _id: { type: String },
  original: { type: String, required: true },
  plaintext: { type: String },
  keywords_spacy: { type: [String] },
  keywords_yake: { type: [[String, Number]] },
  keywords_topicrank: { type: [[String, Number]] },
});

export const RepositoryText = model('RepositoryText', RepositoryTextSchema);
