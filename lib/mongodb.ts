import { MongoClient } from "mongodb";

const { MONGODB_URI, DB_NAME } = process.env;

if (!MONGODB_URI) throw new Error("Please add your Mongo uri to .env.local");

if (!DB_NAME)
  throw new Error(
    "Please define the DB_NAME environment variable inside .env.local"
  );

//using global variables for dev
//@ts-ignore
let cached = global.mongo;
//@ts-ignore
if (!cached) cached = global.mongo = {};

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    const conn: any = {};
    cached.promise = MongoClient.connect(MONGODB_URI as string)
      .then((client) => {
        conn.client = client;
        return client.db(DB_NAME);
      })
      .then((db) => {
        conn.db = db;
        cached.conn = conn;
      });
  }
  await cached.promise;
  return cached.conn;
}
