import Head from "next/head";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import MathProblem from "../components/math-problem/MathProblem";
import MathKeyboard from "../components/math-problem/calculator/MathKeyboard";

//controllers
import { getDailyProblem } from "../controllers/mathController";

import Modal from "../components/ui/Modal";
import Summary from "../components/ui/Summary";
import LifeBar from "../components/ui/LifeBar";

//fetching data from database of math problems to display
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    //retrieve the problem for the day
    const problem = await getDailyProblem();

    return {
      props: {
        problem: JSON.parse(JSON.stringify(problem)),
      },
    };
  } catch (error) {
    return {
      props: {
        notFound: true,
      },
    };
  }
};

const Home = ({
  problem,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  //get user session if logged in
  const { data: session } = useSession();
  //handling life bar status
  const [lifeBar, setLifeBar] = useState(3);
  //handle if show solution is clicked
  const [showSolution, setShowSolution] = useState(false);
  //handle if the correct answer is submitted or life bars run out
  const [summary, setSummary] = useState(false);

  if (session && summary) {
    fetch("http://localhost:3000/api/submit-problem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session,
        attemptsRemaining: lifeBar,
      }),
    });
  }

  //handle user submission
  function submitAnswerHandler(userInputArray: string[]) {
    //convert answer to string
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
      <LifeBar lifeBarCount={lifeBar} />
      <MathKeyboard
        showSolution={showSolution}
        lifeBar={lifeBar}
        action={submitAnswerHandler}
      />
    </>
  );
};

export default Home;
