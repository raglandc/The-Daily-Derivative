import styles from "./MathProblem.module.css";

interface MathProblemProps {
  date: string;
  problemNumber: number;
  description: string;
  problem: string;
}

const MathProblem = (props: MathProblemProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.problemInfo}>
        <span>{props.date}</span>
        <span>#{props.problemNumber}</span>
      </div>
      <div className={styles.problem}>
        <p>{props.description}</p>
        <span>{props.problem}</span>
      </div>
    </div>
  );
};

export default MathProblem;
