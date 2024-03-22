import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_DATABASE_URL as string);

export const connectToDatabase = async () => {
  await client.connect();
  return client.db('chimtube'); 
}