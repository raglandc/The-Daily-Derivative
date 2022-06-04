import Container from "../components/ui/Container";
import styles from "./page-styling/AboutPage.module.css";

const AboutPage = () => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageHeader}>About The Daily Derivative</h1>

      <div className={styles.itemContainer}>
        <h2 className={styles.itemHeader}>What</h2>
        <Container>
          <div className={styles.textContainer}>
            <p>
              The Daily Derivative is a daily-calculus-problem-with-solution
              game.
            </p>
            <p>
              Behind the scenes, users are entering latex code through the
              on-screen keyboard. The user&apos;s input is stored into a string,
              then compared to the answers that have been assigned to the given
              problem.
            </p>
            <p>
              Users can sign-in and keep track of stats that include: current
              winning steak, the amount of problems attempted and the amount of
              problems that have been answered correctly.
            </p>
          </div>
        </Container>
      </div>
      <div className={styles.itemContainer}>
        <h2 className={styles.itemHeader}>When</h2>
        <Container>
          <div className={styles.textContainer}>
            <p>
              The Daily Derivative was created in 2022 by computer science
              student (at time of writing), Chris Ragland.
            </p>
            <p>
              Chris enjoys solving simple derivatives and integrals. He
              describes it as, &lsquo;stretching for the brain.&rsquo;
            </p>
          </div>
        </Container>
      </div>
      <div className={styles.itemContainer}>
        <h2 className={styles.itemHeader}>Why</h2>
        <Container>
          <div className={styles.textContainer}>
            <p>
              The idea behind The Daily Derivative is to keep calculus skills
              fresh.
            </p>
            <p>
              The term &lsquo;Use it or loose it&rsquo; exists for a reason.
            </p>
            <p>
              If a student is taking a semester or two between calculus classes,
              TDD is perfect to keep concepts fresh and skills sharp.
            </p>
            <p>Or maybe you just enjoy calculus with your coffee ☕️</p>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AboutPage;
