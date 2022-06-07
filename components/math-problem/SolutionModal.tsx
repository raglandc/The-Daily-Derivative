import styles from "./SolutionModal.module.css";
//Katex (math styling)
import "katex/dist/katex.min.css";
//@ts-ignore
import { InlineMath } from "react-katex";

interface SolutionModalProps {
  solution: string;
}

const stringToArrayHandler = (solution: string) => {
  //split our solution string into an array at every " . "
  const solutionLinesArray = solution.split(" . ");
  return solutionLinesArray;
};

const SolutionModal = ({ solution }: SolutionModalProps) => {
  const arrayOfInlineStrings = stringToArrayHandler(solution);

  console.log(`arrayOfInlineString`, arrayOfInlineStrings);

  return (
    <div className={styles.container}>
      {arrayOfInlineStrings.map((value, index) => {
        //our math lines will start with "!"
        if (value.startsWith("!")) {
          //remove the \\space !
          value.replaceAll(" ", " \\space ");
          value = value.substring(1);
          return (
            <div key={index} className={styles.mathLine}>
              <InlineMath key={index} math={`${value}`} />
            </div>
          );
        } else {
          return (
            <p key={index} className={styles.mathLine}>
              {value}
            </p>
          );
        }
      })}
    </div>
  );
};

export default SolutionModal;
