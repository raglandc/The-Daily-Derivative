////////////////////////////////////////////////////////////////////////////////
//imports
import Head from "next/head";
import { useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import MathProblem from "../components/math-problem/MathProblem";
import MathKeyboard from "../components/math-problem/calculator/MathKeyboard";
import styles from "./page-styling/HomePage.module.css";

//controllers
import { getDailyProblemHandler } from "../controllers/mathController";

import Modal from "../components/ui/Modal";
import Summary from "../components/Summary";
import LifeBar from "../components/LifeBar";
import { findUserCreateUserHandler } from "../controllers/userController";
///////////////////////////////////////////////////////////////////////////////

//fetching data from database of math problems to display
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    //get user session
    const session = await getSession(ctx);
    //retrieve the user information
    const user = await findUserCreateUserHandler(session!.user);
    //retrieve the problem for the day
    const problem = await getDailyProblemHandler();

    //test if the user has already solved this problem
    let booleanProblemAlreadyCompleted = false;
    for (let i = 0; i < user.problemsCompleted.length; i++) {
      if (user.problemsCompleted[i].problemNumber === problem.problemNumber) {
        booleanProblemAlreadyCompleted = true;
      }
    }

    //return the properties of the problem to be used as props
    return {
      props: {
        problem: JSON.parse(JSON.stringify(problem)),
        booleanProblemAlreadyCompleted: booleanProblemAlreadyCompleted,
      },
    };
  } catch (error) {
    //if no math problem cannot be found catch the error and return not found
    return {
      props: {
        notFound: true,
      },
    };
  }
};

const Home = ({
  problem,
  booleanProblemAlreadyCompleted,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  //get user session if logged in
  const { data: session } = useSession();
  //handling life bar status
  const [lifeBar, setLifeBar] = useState(3);
  //handle if show solution is clicked
  const [showSolution, setShowSolution] = useState(false);
  //handle if the correct answer is submitted or life bars run out
  const [summary, setSummary] = useState(false);

  //if there is a session and the game is complete
  //update users stats in database if they have not answered it already
  if (session && summary && !booleanProblemAlreadyCompleted) {
    fetch("http://localhost:3000/api/submit-problem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userObject: session.user,
        attemptsRemaining: lifeBar,
        problemNumber: problem.problemNumber,
      }),
    });
  }

  //handle user submission
  function submitAnswerHandler(userInputArray: string[]) {
    //convert answer to string
    const inputString = userInputArray.join("");
    console.log(`inputString`, inputString);
    //handle empty input
    if (inputString.length === 0) {
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
        //handle no life bars left
        if (lifeBar === 1) {
          setLifeBar(lifeBar - 1);
          setShowSolution(true);
          setSummary(true);
          return;
        }
        return;
      }
      setShowSolution(true);
      setSummary(true);
      return;
    }
  }

  //create date to display
  //we use UTC String because it recognizes 00:00:00:0000 as the next day (start of day)
  const date = new Date(problem.showDate).toUTCString().substring(0, 17);

  return (
    <div className={styles.pageContainer}>
      <Head>
        <title>The Daily Derivative</title>
      </Head>
      <MathProblem
        date={date}
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
        problem={problem}
        lifeBar={lifeBar}
        action={submitAnswerHandler}
      />
    </div>
  );
};

export default Home;
