/* 

-This file is for all functions that work with the database and math data.
-This functions are called in the API routes where necessary

-Potentially, functions may be moved in (written in) API folders in the future
as of right now, trying to keep API files clean and lean

*/
////////////////////////////////////////////////////////////////////
//imports
import connectMongo from "../lib/mongodb";
import Math from "../models/mathModel";
////////////////////////////////////////////////////////////////////

export const getDailyProblemHandler = async () => {
  //connect to database
  await connectMongo();
  //find the newest problem
  const newestProblem = await Math.findOne().sort({ _Date: -1 });

  return newestProblem;
};
