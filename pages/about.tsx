import Link from "next/link";
import Container from "../components/ui/Container";
import styles from "./page-styling/AboutPage.module.css";

const AboutPage = () => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageHeader}>About The Daily Derivative</h1>

      <div className={styles.itemContainer}>
        <h2 className={styles.itemHeader}>What</h2>
        <div className={styles.textContainer}>
          <p>
            The Daily Derivative is a daily-calculus-problem-with-solution game.
          </p>
          <p>
            Behind the scenes, users are entering Katex code through the
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
      </div>
      <div className={styles.itemContainer}>
        <h2 className={styles.itemHeader}>When</h2>
        <div className={styles.textContainer}>
          <p>
            The Daily Derivative was created in 2022 by computer science student
            (at time of writing),{" "}
            <a
              rel="noopener noreferrer"
              target="_blank"
              className={styles.nameLink}
              href="https://github.com/raglandc"
            >
              Chris Ragland
            </a>
            .
          </p>
          <p>
            Chris enjoys solving simple derivatives and integrals. He describes
            it as, &quot;stretching for the brain.&quot;
          </p>
        </div>
      </div>
      <div className={styles.itemContainer}>
        <h2 className={styles.itemHeader}>Why</h2>
        <div className={styles.textContainer}>
          <p>
            The idea behind The Daily Derivative is to maintain and potentially
            improve a students calculus mastery.
          </p>
          <p>The term &quot;Use it or loose it&quot; is a real thing.</p>
          <p>
            If a student is taking time between calculus classes, The Daily
            Derivative is here to keep concepts fresh and skills sharp.
          </p>
          <p>Or maybe you just enjoy calculus with your coffee ☕️</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
