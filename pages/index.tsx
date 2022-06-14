////////////////////////////////////////////////////////////////////////////////
//imports
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import MathProblem from "../components/math-problem/MathProblem";
import MathKeyboard from "../components/math-problem/calculator/MathKeyboard";
import styles from "./page-styling/HomePage.module.css";

//controllers
import {
  getDailyProblemHandler,
  restartDailyProblemList,
} from "../controllers/mathController";

import Modal from "../components/ui/Modal";
import Summary from "../components/Summary";
import LifeBar from "../components/LifeBar";
import { findUserCreateUserHandler } from "../controllers/userController";
import Container from "../components/ui/Container";
import svg from "../public/images/undraw_time.svg";
///////////////////////////////////////////////////////////////////////////////

//fetching data from database of math problems to display
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    //retrieve the problem for the day
    let problem = await getDailyProblemHandler();

    //if no new problem
    let noNewProblem = false;
    if (problem === undefined || problem === null) {
      noNewProblem = true;
      problem = await restartDailyProblemList();
    }

    //find out if there is a user with a session currently
    const session = await getSession(ctx);
    //if there is indeed a session
    //retrieve the user information

    let user = null;
    let booleanProblemAlreadyCompleted = false;
    if (session) {
      user = await findUserCreateUserHandler(session!.user);
      //test if the user has already solved this problem

      //if there is a user test to see if they have already answered todays problem
      if (user) {
        const problemsCompletedData = user.problemsCompleted;
        //we start from the end of the array because the newest problem is
        //at the end of this array
        //this optimizes searching for best case
        //otherwise speed is O(n) where n is the size of the array
        for (let i = problemsCompletedData.length - 1; i >= 0; i--) {
          //if the user's completed problems object contains todays problem number
          //assign the boolean to return to the homepage as props
          if (
            problemsCompletedData[i].problemDate ===
            problem.showDate.toISOString()
          ) {
            booleanProblemAlreadyCompleted = true;
          }
          //break from the loop. There is no reason to go forward
          break;
        }
      }
    }

    //return the properties of the problem to be used as props
    return {
      props: {
        problem: JSON.parse(JSON.stringify(problem)),
        booleanProblemAlreadyCompleted: booleanProblemAlreadyCompleted,
        noNewProblem: noNewProblem,
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
  noNewProblem,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  //get user session if logged in
  const { data: session } = useSession();
  //handling life bar status
  const [lifeBar, setLifeBar] = useState(3);
  //handle if show solution is clicked
  const [showSolution, setShowSolution] = useState(
    booleanProblemAlreadyCompleted
  );
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
        problemDate: problem.showDate,
      }),
    });
  }

  console.log(``);

  //handle user submission
  function submitAnswerHandler(userInputArray: string[]) {
    //convert answer to string
    const inputString = userInputArray.join("");
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
  let date: string = "";
  if (!noNewProblem) {
    date = new Date(problem.showDate).toUTCString().substring(0, 17);
  }

  return !noNewProblem ? (
    <div className={styles.pageContainer}>
      <Head>
        <title>The Daily Derivative - Daily Calculus Problems</title>
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
      {booleanProblemAlreadyCompleted ? (
        <Container>
          <p style={{ textAlign: "center" }}>
            You have already solved this problem
          </p>
        </Container>
      ) : (
        <LifeBar lifeBarCount={lifeBar} />
      )}
      <MathKeyboard
        showSolution={showSolution}
        problem={problem}
        lifeBar={lifeBar}
        action={submitAnswerHandler}
      />
    </div>
  ) : (
    <>
      <Head>
        <title>No Problem Found - The Daily Derivative</title>
      </Head>
      <div className={styles.pageContainer}>
        <Container>
          <h1 style={{ textAlign: "center" }}>
            Sorry, no new problem found. Try refreshing the page.
          </h1>
          <div style={{ margin: "0 auto" }}>
            <Image
              width={200}
              height={324}
              src={svg}
              alt="sign in cartoon man in front of large touch screen phone with a log in screen displayed"
            />
          </div>
        </Container>
      </div>
    </>
  );
};

export default Home;
