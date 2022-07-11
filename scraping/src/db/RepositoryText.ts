import { model, Schema } from 'mongoose';

const RepositoryTextSchema = new Schema({
  original: { type: String, required: true },
  plaintext: { type: String },
  type: { type: String, required: true, enum: ['readme', 'description'] },
});

export const RepositoryText = model('RepositoryText', RepositoryTextSchema);
