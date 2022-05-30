import connectMongo from "../lib/mongodb";
import User from "../models/userModel";

///////////////////////////////////////////////////////////////////
//find the logged in user
//if they cannot be found create user
export const findUserCreateUserHandler = async (session: any) => {
  //connect to database
  await connectMongo();
  //check if the email already exists in the database
  const user = await User.findOne({ email: session.user?.email });

  //if they cannot be found, create a document to record their
  // calculus stats and return them as props
  if (user === null || undefined) {
    const newUser = await user.create({
      email: session.user?.email,
    });

    return newUser;
  }

  //if the user is not null or undefined return the user
  return user;
};

/////////////////////////////////////////////////////////////////////
export const updateUserStatsHandler = async (
  currentUser: any,
  lifeBarCount: any
) => {
  //connect to database
  await connectMongo();

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
  });
};

/////////////////////////////////////////////////////////////////////
