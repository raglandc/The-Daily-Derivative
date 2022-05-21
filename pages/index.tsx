import Head from "next/head";
import { InferGetStaticPropsType } from "next";
import MathProblem from "../components/math-problem/MathProblem";
import MathKeyboard from "../components/ui/calculator/MathKeyboard";

import { connectToDatabase } from "../lib/mongodb";

//interface for the data passed as props from getStaticProps
interface ProblemProps {
  date: string;
  problemNumber: number;
  description: string;
  problem: string;
  difficulty: string;
}

//fetching data from database of math problems to display
export async function getStaticProps() {
  const { db } = await connectToDatabase();

  const data = await db.collection("math").find().sort({ _id: 1 }).toArray();

  const problems = data.map((problem: ProblemProps) => {
    return {
      date: problem.date,
      problemNumber: problem.problemNumber,
      description: problem.description,
      problem: problem.problem,
      difficulty: problem.difficulty,
    };
  });

  //returns the first element in the problems (math) collection
  const problem = problems[0];

  return {
    props: { problem },
  };
}

const Home = ({ problem }: InferGetStaticPropsType<typeof getStaticProps>) => {
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
      />
      <MathKeyboard />
    </>
  );
};

export default Home;
