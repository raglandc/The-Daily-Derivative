import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
//database imports
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { connectToDatabase } from "../../../lib/mongodb";

//a call to receive MongoDb client promise
async function databaseCaller() {
  const { client } = await connectToDatabase();

  return client;
}

//NEXT AUTH begin
export default NextAuth({
  adapter: MongoDBAdapter(databaseCaller()),
  secret: process.env.NEXTAUTH_SECRET,
  //Configure one or more authentication providers
  //add providers at the end of
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  session: {
    strategy: "database",
  },
  useSecureCookies: process.env.NODE_ENV === "development" ? false : true,
});
