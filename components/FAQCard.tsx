import { useState } from "react";
import styles from "./FAQCard.module.css";
import Container from "./ui/Container";
import SVGIcon from "./ui/SVGIcon";
//svg for dark/light mode
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

interface FAQCardProps {
  question: string;
  answer: string;
}

const FAQCard = (props: FAQCardProps) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const toggle = () => {
    setShowAnswer((prev) => !prev);
  };
  return (
    <Container action={toggle}>
      <div className={styles.faqContainer}>
        <div className={styles.question}>
          <h3>{props.question}</h3>
          <SVGIcon icon={showAnswer ? faCaretUp : faCaretDown} />
        </div>
        {showAnswer ? (
          <div className={styles.answerContainer}>
            <p>{props.answer}</p>
          </div>
        ) : null}
      </div>
    </Container>
  );
};

export default FAQCard;
