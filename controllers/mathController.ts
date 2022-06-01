import connectMongo from "../lib/mongodb";
import Math from "../models/mathModel";

export const getDailyProblem = async () => {
  //connect to database
  await connectMongo();

  //find the newest problem
  const newestProblem = await Math.findOne().sort({ _id: -1 }).lean();

  return newestProblem;
};

export const checkAnswerHandler = (
  userInputArray: string[],
  problemAnswer: string,
  attemptsRemaining: number
): { problemCompleted: boolean; attemptsRemaining: number } | undefined => {
  //convert submission answer to string
  const inputString = userInputArray.join("");

  //handle empty input
  if (inputString.length === 0) {
    console.log("You left the answer blank bro");
    return;
  }
  //loop through the string and compare each input value
  for (let i = 0; i < inputString.length; i++) {
    //if the current value does not match return
    if (
      inputString[i] !== problemAnswer[i] ||
      inputString.length !== problemAnswer.length
    ) {
      attemptsRemaining = attemptsRemaining - 1;
      console.log("your answer does not match ours", attemptsRemaining);

      //handle no life bars left
      if (attemptsRemaining === 1) {
        attemptsRemaining = attemptsRemaining - 1;
        console.log("No more submissions left");
        return { problemCompleted: true, attemptsRemaining: attemptsRemaining };
      }
      return;
    }
  }

  //if the correct answer is given return true and attempts remaining
  console.log("Nice work!");
  return { problemCompleted: true, attemptsRemaining: attemptsRemaining };
};
