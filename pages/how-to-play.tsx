import Container from "../components/UI/Container";
import styles from "./page-styling/HowToPlay.module.css";

//Katex (math styling)
import "katex/dist/katex.min.css";
// @ts-ignore
import { InlineMath } from "react-katex";
import Head from "next/head";

const HowToPlayPage = () => {
  return (
    <>
      <Head>
        <title>How to play - The Daily Derivative</title>
      </Head>
      <div className={styles.pageContainer}>
        <h1 className={styles.pageHeader}>How To Play</h1>
        <div>
          <h2 className={styles.sectionHeader}>Rules</h2>
          <ul>
            <li className={styles.listItem}>
              Solve the given problem within three attempts
            </li>
            <li className={styles.listItem}>
              Answers must be submitted in the required format
            </li>
          </ul>
          <Container>
            <h4 className={styles.warning}>Important</h4>
            <p className={styles.warningText}>
              We understand sometimes there are multiple answers to calculus
              problems.
            </p>
            <p className={styles.warningText}>
              We try to avoid problems with multiple answers.
            </p>
            <p className={styles.warningText}>
              However, if it does arise, we will include multiple solution
              strings to compare your answer to.
            </p>
          </Container>
        </div>
        <div>
          <h2 className={styles.sectionHeader}>Required Format</h2>
          <p className={styles.sectionText}>
            Behind the scenes, users are typing in Katex code.
          </p>
          <Container>
            <p className={styles.warningText}>
              Katex{" "}
              <a
                rel="noopener noreferrer"
                target="_blank"
                className={styles.katexLink}
                href="https://katex.org"
              >
                (KaTeX)
              </a>{" "}
              is a library of functions that displays mathematical notation
              within the web browser (Chrome, FireFox, Ext.,)
            </p>
          </Container>
          <p className={styles.sectionText}>
            After a user submits an answer it will be compared as a string of
            characters to our solution&apos;s string of characters.
          </p>
          <p className={styles.sectionText}>
            Users are not required to know Katex, instead users create what we
            call &quot;Special Expressions&quot; that we convert to a Katex
            string
          </p>
        </div>
        <div>
          <h2 className={styles.sectionHeader}>Special Expressions</h2>
          <p>
            Special expressions are created with math operators such as{" "}
            <InlineMath math=" \div , \wedge , \sqrt{}" />, an opening
            &quot;(&quot; and a closing &quot;)&quot;.
          </p>
          <div className={styles.specialExpressionContainer}>
            <h3>
              Division (fractions) <InlineMath math="\div" />
            </h3>
            <ul className={styles.sectionList}>
              <li className={styles.mathContainer}>
                <InlineMath math="( a \div b ) \rightarrow \frac{a}{b}" />
              </li>
              <li className={styles.mathContainer}>
                <InlineMath math="( a \div ( b + ln(c) ) \rightarrow \frac{a}{b+ln(c)}" />
              </li>
              <li className={styles.mathContainer}>
                <InlineMath math="( (a \div b ) \div (c \div d)) \rightarrow \frac{\frac{a}{b}}{\frac{c}{d}}" />
              </li>
            </ul>
          </div>
          <div className={styles.specialExpressionContainer}>
            <h3>
              Exponents <InlineMath math="\wedge" />
            </h3>
            <ul className={styles.sectionList}>
              <li className={styles.mathContainer}>
                <InlineMath math="a\wedge(b) \rightarrow a ^{b}" />
              </li>
              <li className={styles.mathContainer}>
                <InlineMath math=" a \wedge(b + c \wedge(d)) \rightarrow a^{b+c^{d}}" />
              </li>
              <li className={styles.mathContainer}>
                <InlineMath math="a \wedge(b\wedge(c\wedge(d)))\rightarrow a^{b^{c^{d}}}" />
              </li>
            </ul>
          </div>
          <div className={styles.specialExpressionContainer}>
            <h3>
              Square-Roots <InlineMath math="\sqrt{}" />
            </h3>
            <ul className={styles.sectionList}>
              <li className={styles.mathContainer}>
                <InlineMath math="a \sqrt{}(b) \rightarrow a\sqrt{b}" />
              </li>
              <li className={styles.mathContainer}>
                <InlineMath math=" a \sqrt{}(b + \sqrt{}(c)) \rightarrow a\sqrt{b + \sqrt{c}}" />
              </li>
            </ul>
          </div>
          <Container>
            <p className={styles.warningText}>
              Integrals with bounds and other special expressions coming soon...
            </p>
          </Container>
        </div>
        <div>
          <h2 className={styles.sectionHeader}>
            Combining Special Expressions
          </h2>
          <p>
            Users can combine special expressions to create <em>special</em>{" "}
            special expressions.
          </p>
          <ul className={styles.sectionList}>
            <li className={styles.mathContainer}>
              <InlineMath math="a \wedge ((b \div c) + \sqrt{}(d)) \rightarrow a^{\frac{b}{c} + \sqrt{d}}" />
            </li>
          </ul>
        </div>
        <Container>
          <h4 className={styles.warning}>Important</h4>
          <p className={styles.warningText}>
            The key is to start special expressions with the special character
            and the opening &quot;(&quot; and the closing &quot;)&quot;.
          </p>
          <p className={styles.warningText}>
            Forgetting or not inserting the required parenthesis will result in
            a failed special expression and not be graded appropriately.
          </p>
          <p className={styles.warningText}>
            All special expressions will start with its special character,{" "}
            <strong>EXCEPT FOR DIVISION (FRACTIONS)</strong>. The division
            operator goes between what the user wants as a numerator and
            denominator.
          </p>
          <p className={styles.mathContainer}>
            <InlineMath math="( numerator \div denominator ) " />
          </p>
        </Container>
      </div>
    </>
  );
};

export default HowToPlayPage;
