import Head from "next/head";
import { useState } from "react";
import { InferGetStaticPropsType } from "next";
import MathProblem from "../components/math-problem/MathProblem";
import MathKeyboard from "../components/math-problem/calculator/MathKeyboard";

import { connectToDatabase } from "../lib/mongodb";
import Modal from "../components/ui/Modal";
import Summary from "../components/ui/Summary";

//fetching data from database of math problems to display
export async function getStaticProps() {
  const { db } = await connectToDatabase();

  const data = await db!.collection("math").find().sort({ _id: 1 }).toArray();

  const problems = data.map((problem) => {
    return {
      date: problem.date,
      problemNumber: problem.problemNumber,
      description: problem.description,
      problem: problem.problem,
      difficulty: problem.difficulty,
      solution: problem.solution,
      answer: problem.answer,
      hint: problem.hint,
    };
  });

  //returns the first element in the problems (math) collection
  const problem = problems[1];

  return {
    props: { problem },
  };
}

const Home = ({ problem }: InferGetStaticPropsType<typeof getStaticProps>) => {
  //handling life bar status
  const [lifeBar, setLifeBar] = useState(3);
  //handle if show solution is clicked
  const [showSolution, setShowSolution] = useState(false);
  //handle if the correct answer or life bars run out
  const [summary, setSummary] = useState(false);

  //handle user submission
  function submitAnswerHandler(userInputArray: string[]) {
    //convert answer to string
    const inputString = userInputArray.join("");

    console.log(inputString);
    //handle empty input
    if (inputString.length === 0) {
      console.log("You left the answer blank bro");
      return;
    }
    //loop through the string and compare each input value
    for (let i = 0; i < inputString.length; i++) {
      //if the current value does not match return
      if (
        inputString[i] !== problem.answer[i] ||
        inputString.length !== problem.answer.length
      ) {
        setLifeBar(lifeBar - 1);
        console.log("your answer does not match ours", lifeBar);

        //handle no life bars left
        if (lifeBar === 1) {
          setLifeBar(lifeBar - 1);
          console.log("No more submissions left");
          setShowSolution(true);
          setSummary(true);
          return;
        }
        return;
      }
      setShowSolution(true);
      setSummary(true);
      console.log("Nice work!");
      return;
    }
  }

  return (
    <>
      <Head>
        <title>The Daily Derivative</title>
      </Head>
      <MathProblem
        date={problem.date}
        problemNumber={problem.problemNumber}
        problem={problem.problem}
        description={problem.description}
        difficulty={problem.difficulty}
        solution={problem.solution}
        hint={problem.hint}
        showSolution={showSolution}
      />
      {summary ? (
        <Modal show={summary} onClose={() => setSummary(false)} title="Summary">
          <Summary lifeBarCount={lifeBar} />
        </Modal>
      ) : null}
      <MathKeyboard
        showSolution={showSolution}
        lifeBar={lifeBar}
        action={submitAnswerHandler}
      />
    </>
  );
};

export default Home;
