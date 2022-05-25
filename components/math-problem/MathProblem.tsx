import styles from "./MathProblem.module.css";
import { useAppSelector } from "../../app/hooks";
import { selectStatus } from "../../app/features/menuStatusSlice";
import { useState } from "react";

//Katex (math styling)
import "katex/dist/katex.min.css";
// @ts-ignore
import { InlineMath } from "react-katex";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import SolutionModal from "../math-problem/SolutionModal";

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
  const status = useAppSelector(selectStatus);
  return (
    <div className={styles.container}>
      <div className={styles.problemInfo}>
        <div>{props.date}</div>
        <div>{props.difficulty}</div>
        <div>Problem #{props.problemNumber}</div>
      </div>
      <div className={styles.problem}>
        <p className={styles.description}>{props.description}</p>
        <span className={styles.math}>
          {/* have to hide math when side drawer is active other wise math bleeds through */}
          {status ? null : <InlineMath math={props.problem} />}
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
    </div>
  );
};

export default MathProblem;
