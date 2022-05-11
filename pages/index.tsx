import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import MathProblem from "../components/math-problem/MathProblem";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>The Daily Derivative</title>
      </Head>
      <MathProblem
        date="4.20.2022"
        problemNumber={324}
        problem="2x+5"
        description="Find the derivative of the given function."
      />
    </>
  );
};

export default Home;
