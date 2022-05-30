import styles from "./FAQPage.module.css";
import Container from "../components/ui/Container";
const FAQPage = () => {
  return (
    <>
      <h1 className={styles.pageHeader}>Frequently Asked Questions</h1>
      <Container>
        <h2>Is it free?</h2>
        <p>
          The Daily Derivative is free, there will never be a charge or adds for
          this site.
        </p>
        <p>
          We are all here to better ourselves and enjoy the beauty of calculus
        </p>
      </Container>
    </>
  );
};

export default FAQPage;
