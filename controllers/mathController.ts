import connectMongo from "../lib/mongodb";
import Math from "../models/mathModel";

export const getDailyProblem = async () => {
  //connect to database
  await connectMongo();

  //find the newest problem
  const newestProblem = await Math.findOne().sort({ _id: -1 }).lean();

  return newestProblem;
};
