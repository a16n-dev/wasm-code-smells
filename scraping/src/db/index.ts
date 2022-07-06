import mongoose from 'mongoose';

const DB_NAME = 'wasm-github';

export const initDb = async () => {
  await mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`);
  console.log('connected to db');
};
