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
}

const MathProblem = (props: MathProblemProps) => {
  const [showSolution, setShowSolution] = useState(false);
  //mobile navigation status
  const status = useAppSelector(selectStatus);
  return (
    <div className={styles.container}>
      <div className={styles.problemInfo}>
        <div>{props.date}</div>
        <div>{props.difficulty}</div>
        <div>#{props.problemNumber}</div>
      </div>
      <div className={styles.problem}>
        <p className={styles.description}>{props.description}</p>
        <span className={styles.math}>
          {/* have to hide math when side drawer is active other wise math bleeds through */}
          {status ? null : <InlineMath math={props.problem} />}
        </span>
      </div>
      <Button
        title="Show Solution"
        style="hollow"
        link=""
        action={() => setShowSolution(true)}
      />
      <Modal show={showSolution} onClose={() => setShowSolution(false)}>
        <SolutionModal solution={props.solution} />
      </Modal>
    </div>
  );
};

export default MathProblem;
