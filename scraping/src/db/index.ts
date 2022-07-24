import mongoose from 'mongoose';
import { config } from '../config';

export const initDb = async () => {
  await mongoose.connect(config.dbConnectionString);
  console.log('connected to db');
};
