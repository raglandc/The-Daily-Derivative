import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import Container from "../components/ui/Container";
import styles from "./UserStats.module.css";

//controller imports
import { findUserCreateUserHandler } from "../controllers/userController";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  try {
    //get session to find logged in or create new user
    const session = await getSession(context);

    //if logged in find user or create one
    if (session) {
      const user = await findUserCreateUserHandler(session);

      //return the current user if they exist
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
        <Container>
          <h2 className={styles.yourNumbers}>Your numbers</h2>
          <div className={styles.statsContainer}>
            <div>
              <h3>Problems Attempted</h3>
              <p className={styles.statNumber}>
                {user.userStatistics.problemsAttempted}
              </p>
            </div>
            <div>
              <h3>Problems Solved</h3>
              <p className={styles.statNumber}>
                {user.userStatistics.problemsSolved}
              </p>
            </div>
            <div>
              <h3>Current Win Streak</h3>
              <p className={styles.statNumber}>
                {user.userStatistics.currentWinningStreak}
              </p>
            </div>
          </div>
        </Container>
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
