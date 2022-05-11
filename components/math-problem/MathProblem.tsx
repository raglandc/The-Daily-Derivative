import styles from "./MathProblem.module.css";
import { useAppSelector } from "../../app/hooks";
import { selectStatus } from "../../app/features/menuStatusSlice";

//Katex (math styling)
import "katex/dist/katex.min.css";
// @ts-ignore
import { InlineMath } from "react-katex";

interface MathProblemProps {
  date: string;
  problemNumber: number;
  description: string;
  problem: string;
}

const MathProblem = (props: MathProblemProps) => {
  const status = useAppSelector(selectStatus);
  return (
    <div className={styles.container}>
      <div className={styles.problemInfo}>
        <span>{props.date}</span>
        <span>#{props.problemNumber}</span>
      </div>
      <div className={styles.problem}>
        <p className={styles.description}>{props.description}</p>
        <span className={styles.math}>
          {status ? null : <InlineMath math={props.problem} />}
        </span>
      </div>
    </div>
  );
};

export default MathProblem;
