import { MongoClient, Db } from "mongodb";

let uri = process.env.MONGODB_URI as string;
let dbName = process.env.DB_NAME as string;

let cachedClient: MongoClient;
let cachedDb: Db;

if (!uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

if (!dbName) {
  throw new Error(
    "Please define the MONGODB_DB environment variable inside .env.local"
  );
}

export async function connectToDatabase(): Promise<{
  client: MongoClient;
  db: Db;
}> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client: MongoClient = new MongoClient(uri);

  await client.connect();

  const db: Db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

//connection with mongoose
import mongoose from "mongoose";

const connectMongo = async () => {
  //try and connect to the database
  try {
    await mongoose.connect(uri);
    console.log("You are connected to the database");

    //otherwise throw an error
  } catch (error) {
    console.log("You are not connected: ", error);
  }
};

export default connectMongo;
