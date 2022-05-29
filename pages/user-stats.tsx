import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import Container from "../components/ui/Container";
import styles from "./UserStats.module.css";

//database imports
import connectMongo from "../lib/mongodb";
import User from "../models/userModel";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  try {
    //connect to the database
    await connectMongo();
    //get session to find logged in or create new user
    const session = await getSession(context);

    //check if there is a logged in session
    if (session) {
      //find the current user
      const user = await User.findOne({ email: session.user?.email });

      console.log("User: ", user);

      //if they cannot be found, create a document to record their
      //calculus stats and return them as props
      if (user === null || undefined) {
        const newUser = await User.create({
          email: session.user?.email,
        });

        //return the new user as props
        return {
          props: {
            user: JSON.parse(JSON.stringify(newUser)),
          },
        };
      }

      //return the current user if they exist
      return {
        props: {
          user: JSON.parse(JSON.stringify(user)),
        },
      };
      //other wise the user is not signed in
    } else {
      //return an nothing
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

const UserStatsPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <Container>
          <h1 className={styles.header}>Hello, {props.user.name}</h1>
        </Container>
        <Container>
          <h2 className={styles.yourNumbers}>Your numbers</h2>
          <div className={styles.statsContainer}>
            <div>
              <h3>Problems Attempted</h3>
              <p className={styles.statNumber}>
                {props.user.userStatistics.problemsAttempted}
              </p>
            </div>
            <div>
              <h3>Problems Solved</h3>
              <p className={styles.statNumber}>
                {props.user.userStatistics.problemsSolved}
              </p>
            </div>
            <div>
              <h3>Current Win Streak</h3>
              <p className={styles.statNumber}>
                {props.user.userStatistics.currentWinningStreak}
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
