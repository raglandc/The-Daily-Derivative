import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import Container from "../components/ui/Container";
import styles from "./page-styling/UserStats.module.css";

//controller imports
import { findUserCreateUserHandler } from "../controllers/userController";
import StatsCard from "../components/StatsCard";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    //get session to find logged in or create new user
    const session = await getSession(context);

    //if logged in find user or create one
    if (session) {
      const user = await findUserCreateUserHandler(session.user);

      //return the current user if they exist or the newly created one
      return {
        props: {
          user: JSON.parse(JSON.stringify(user)),
        },
      };
    }
    //other wise there is no user signed in
    else {
      //return nothing
      return {
        props: {
          user: null,
        },
      };
    }
    //if something goes wrong catch the error and log it to the console
  } catch (error) {
    console.log(error);
    //return that the user was not found
    return {
      notFound: true,
    };
  }
};

const UserStatsPage = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <Container>
          <h1 className={styles.header}>Hello, {user.name}</h1>
        </Container>
        <StatsCard
          title="Problems Attempted"
          numberToAnimate={user.userStatistics.problemsAttempted}
        />
        <StatsCard
          title="Problems Solved"
          numberToAnimate={user.userStatistics.problemsSolved}
        />
        <StatsCard
          title="Current Winning Streak"
          numberToAnimate={user.userStatistics.currentWinningStreak}
        />
      </>
    );
  } else {
    return (
      <Container>
        Please sign in to see scores. We do not keep track of your math skills
        before you create an account.
      </Container>
    );
  }
};
export default UserStatsPage;
