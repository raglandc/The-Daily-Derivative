import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import MathProblem from "../components/math-problem/MathProblem";
import MathAnswer from "../components/math-problem/MathAnswer";

//practice
import { problem1 } from "../public/practiceProblem";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>The Daily Derivative</title>
      </Head>
      <MathProblem
        date={problem1.date}
        problemNumber={problem1.problemNumber}
        problem={problem1.problem}
        description={problem1.description}
      />
      <MathAnswer />
    </>
  );
};

export default Home;
