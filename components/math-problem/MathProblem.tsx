import { useState } from "react";
import styles from "./MathProblem.module.css";

//Katex (math styling)
import "katex/dist/katex.min.css";
// @ts-ignore
import { InlineMath } from "react-katex";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import SolutionModal from "./SolutionModal";
import DifficultyScale from "../DifficultyScale";
import Container from "../UI/Container";

interface MathProblemProps {
  date: string;
  problemNumber: number;
  description: string;
  problem: string;
  difficulty: string;
  solution: string;
  hint: string;
  showSolution: boolean;
}

const MathProblem = (props: MathProblemProps) => {
  //show hint
  const [showHint, setShowHint] = useState(false);
  //show solution
  const [showSolution, setShowSolution] = useState(false);

  //mobile navigation status
  return (
    <Container>
      <div className={styles.problemInfo}>
        <div>{props.date}</div>
        <div>
          <DifficultyScale rating={props.difficulty} />
        </div>
        <div>Problem #{props.problemNumber}</div>
      </div>
      <div className={styles.problem}>
        <p className={styles.description}>{props.description}</p>
        <span className={styles.math}>
          <InlineMath math={props.problem} />
        </span>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          title="Hint"
          style="hollow"
          link=""
          action={() => setShowHint(true)}
        />
        <Modal title="Hint" show={showHint} onClose={() => setShowHint(false)}>
          <SolutionModal solution={props.hint} />
        </Modal>
        {!props.showSolution ? null : (
          <>
            <Button
              title="Solution"
              style="hollow"
              link=""
              action={() => setShowSolution(true)}
            />
            <Modal
              title="Solution"
              show={showSolution}
              onClose={() => setShowSolution(false)}
            >
              <SolutionModal solution={props.solution} />
            </Modal>
          </>
        )}
      </div>
    </Container>
  );
};

export default MathProblem;
