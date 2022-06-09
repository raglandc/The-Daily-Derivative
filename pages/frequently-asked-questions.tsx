import styles from "./page-styling/FAQPage.module.css";
import Container from "../components/ui/Container";
import FAQCard from "../components/FAQCard";
const FAQPage = () => {
  //make it so questions are collapsed and when you click on that question is expands with state
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageHeader}>Frequently Asked Questions</h1>
      <FAQCard
        question="Is the Daily Derivative free?"
        answer="Yes the Daily Derivative is and always will be free. We dont think you should have to pay to better yourself."
      />
      <FAQCard
        question="Why can I not sign up with an email and password?"
        answer="Using email and passwords for authentication opens up the door for too many security risks for us to sleep at night. Better safe than sorry."
      />
      <FAQCard
        question="Which levels of calculus does TDD cover?"
        answer="As of right now The Daily Derivative only covers basic derivatives and integrals. In the future we plan on adding concepts from calculus two and three."
      />
      <FAQCard
        question="When does the problem change?"
        answer="The problem changes at midnight (Eastern Standard Time)."
      />
    </div>
  );
};

export default FAQPage;
