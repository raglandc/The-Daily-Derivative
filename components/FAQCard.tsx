import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./FAQCard.module.css";
import Container from "./UI/Container";
import SVGIcon from "./UI/SVGIcon";
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
          <motion.div
            initial={{ height: "0" }}
            animate={{ height: "max-content" }}
            transition={{ ease: "easeOut" }}
            className={styles.answerContainer}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: "easeIn" }}
            >
              {props.answer}
            </motion.p>
          </motion.div>
        ) : null}
      </div>
    </Container>
  );
};

export default FAQCard;
