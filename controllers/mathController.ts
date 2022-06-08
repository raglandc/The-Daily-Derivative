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

  //find the problem for the day
  //create a ISO string from todays current date
  const todayISO = new Date(Date.now()).toISOString();
  //remove the time, should return YYYY-MM-DD
  const today = todayISO.substring(0, 10);
  //concat today with a time of midnight
  const queryDate = `${today}T00:00:00.000Z`;

  //find the problem assigned to queryDate
  const todaysProblem = await Math.findOne({
    showDate: new Date(queryDate).toISOString(),
  });

  return todaysProblem;
};
