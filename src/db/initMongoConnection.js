import mongoose from 'mongoose';
import { env } from '../utils/env.js';
import { envVars } from '../constants/envVars.js';

export const initMongoConnection = async () => {
  try {
    const user = env(envVars.MONGODB_USER);
    const pwd = env(envVars.MONGODB_PASSWORD);
    const url = env(envVars.MONGODB_URL);
    const db = env(envVars.MONGODB_DB);

    const connectionLink = `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`;
    await mongoose.connect(connectionLink);
    console.log('Mongo connection successfully established!');
  } catch (err) {
    console.log(
      'MongoDB connection error. Please make sure MongoDB is running.',
    );
    throw new Error(err);
  }
};
