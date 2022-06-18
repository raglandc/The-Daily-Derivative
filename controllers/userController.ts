/* 

-This file is for all work with the database and user data.
-This functions are called in the API routes where necessary

-Potentially, functions may be moved in (written in) API folders in the future
as of right now, trying to keep API files clean and lean

*/
////////////////////////////////////////////////////////////////////
//imports
import connectMongo from "../lib/mongodb";
import User from "../models/userModel";

///////////////////////////////////////////////////////////////////
//user object interface
type userObjectType =
  | {
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    }
  | undefined;
//find the logged in user

//if they cannot be found create user
export const findUserCreateUserHandler = async (userObject: userObjectType) => {
  //connect to database
  await connectMongo();
  if (!userObject) return;
  //check if the email already exists in the database
  const user = await User.findOne({ email: userObject.email });

  //if they cannot be found, create a document to record their
  // calculus stats and return them as props
  if (user === null || user === undefined) {
    //possible error when user is created default values are not fired on null
    const newUser = await User.create({
      email: userObject.email,
    });

    //return the newly created user
    return newUser;
  }

  //if the user is not null or undefined return the user
  return user;
};

/////////////////////////////////////////////////////////////////////
//update user statistics
export const updateUserHandler = async (
  currentUser: any,
  lifeBarCount: any,
  problemDate: string
) => {
  //connect to database
  await connectMongo();
  console.log(`updateUser: `, currentUser, "\n\n");
  //variables to update user document
  let currentWinningStreak = currentUser.userStatistics.currentWinningStreak;
  let problemsAttempted = currentUser.userStatistics.problemsAttempted;
  let problemsSolved = currentUser.userStatistics.problemsSolved;

  //if life bar went to zero set CWS to 0
  if (lifeBarCount === 0) {
    currentWinningStreak = 0;
  }

  //if the user solved the problem
  if (lifeBarCount > 0) {
    currentWinningStreak = currentWinningStreak + 1;
    problemsSolved = problemsSolved + 1;
  }

  //seeing the summary will always result in incrementing the
  //amount of problems attempted
  problemsAttempted = problemsAttempted + 1;

  //update the stats of the current user
  await currentUser.updateOne({
    userStatistics: {
      currentWinningStreak: currentWinningStreak,
      problemsAttempted: problemsAttempted,
      problemsSolved: problemsSolved,
    },
    $addToSet: { problemsCompleted: { problemDate, lifeBarCount } },
  });

  return;
};

/////////////////////////////////////////////////////////////////////
