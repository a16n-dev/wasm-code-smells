import { model, Schema } from 'mongoose';

const RepositoryTextSchema = new Schema({
  _id: { type: String },
  original: { type: String, required: true },
  plaintext: { type: String },
});

export const RepositoryText = model('RepositoryText', RepositoryTextSchema);
