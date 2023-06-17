import { MongoClient } from 'mongodb';
import envs from '../../config/envs.mjs';

const client = new MongoClient(envs.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default client;
