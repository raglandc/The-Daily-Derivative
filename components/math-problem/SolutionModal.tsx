import styles from "./SolutionModal.module.css";
//Katex (math styling)
import "katex/dist/katex.min.css";
//@ts-ignore
import { InlineMath } from "react-katex";

interface SolutionModalProps {
  solution: string;
}

const stringToArrayHandler = (solution: string) => {
  const solutionLinesArray = solution.replaceAll(" ", " \\space ").split("!.!");
  return solutionLinesArray;
};

const SolutionModal = ({ solution }: SolutionModalProps) => {
  const arrayOfInlineStrings = stringToArrayHandler(solution);

  return (
    <div className={styles.container}>
      {arrayOfInlineStrings.map((value, index) => (
        <div className={styles.mathLineDiv} key={index}>
          <InlineMath
            className={styles.mathLine}
            key={index}
            math={`${value}`}
          />
        </div>
      ))}
    </div>
  );
};

export default SolutionModal;
