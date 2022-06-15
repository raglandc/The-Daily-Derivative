import { MongoClient, Db } from "mongodb";

let uri = process.env.MONGODB_URI as string;
let dbName = process.env.DB_NAME as string;

//@ts-expect-error
let cachedClient: MongoClient = global.MongoClient;
//@ts-expect-error
let cachedDb: Db = global.Db;

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

//@ts-expect-error
let cached = global.mongoose;

if (!cached) {
  //@ts-expect-error
  cached = global.mongoose = { conn: null, promise: null };
}

const connectMongo = async () => {
  //check if the connection to the database is cached
  if (cached.conn) {
    return cached.conn;
  }
  //try and connect to the database
  if (!cached.promise) {
    cached.promise = mongoose.connect(uri).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectMongo;
