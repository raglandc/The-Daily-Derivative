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
//helper function
const getTodaysDateToISOString = (): string => {
  //find the problem for the day
  //create a ISO string from todays current date
  const todayISO = new Date(Date.now()).toISOString();
  //remove the time, should return YYYY-MM-DD
  const today = todayISO.substring(0, 10);
  //concat today with a time of midnight
  const todayISOStringMidnight = `${today}T00:00:00.000Z`;

  return todayISOStringMidnight;
};

const convertInputDateTimeToISOStringMidnight = (date: Date): string => {
  const newDateISOString = date.toISOString();

  return newDateISOString;
};

/////////////////////////////////////////////////////////////////////////////
export const getDailyProblemHandler = async () => {
  //connect to database
  await connectMongo();

  const queryDate = getTodaysDateToISOString();

  //find the problem assigned to queryDate
  const todaysProblem = await Math.findOne({
    showDate: new Date(queryDate).toISOString(),
  });

  return todaysProblem;
};

export const restartDailyProblemList = async () => {
  //connect to the database
  await connectMongo();

  //get todays ISO string for midnight
  const todayISOString = getTodaysDateToISOString();

  //get the date in the required format
  //this will ensure when we add the difference to each problem
  //our problems release date is not effected
  const todaysDate = new Date(todayISOString);

  //find the difference in time, in days, from today and when the first problem started
  //find the first problem
  const firstProblem = await Math.findOne({ problemNumber: "1" });

  //get the date from the database for the first problem
  const firstProblemISO = firstProblem.showDate;

  //create a date object from that string, This will allow us to use Date methods
  const firstProblemDate = new Date(firstProblemISO);

  //find the difference from the first problem to the last problem
  const difference = todaysDate.getTime() - firstProblemDate.getTime();

  //loop through the entire list of documents and update all of their dates accordingly
  for (let i = 1; i <= (await Math.countDocuments({})); i++) {
    const problem = await Math.findOne({ problemNumber: `${i}` });

    const problemDate = problem.showDate;

    const updatedDate = convertInputDateTimeToISOStringMidnight(
      new Date(problemDate.getTime() + difference)
    );

    await problem.updateOne({
      showDate: updatedDate,
    });
  }

  //return the new problem to the homepage
  const newProblem = await getDailyProblemHandler();

  //return the new problem
  return newProblem;
};
//////////////////////////////////////////////////////////////////////////////////////
