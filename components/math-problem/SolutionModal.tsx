import styles from "SolutionModal.module.css";
//Katex (math styling)
import "katex/dist/katex.min.css";
//@ts-ignore
import { InlineMath } from "react-katex";

interface SolutionModalProps {
  solution: string[];
}

const SolutionModal = ({ solution }: SolutionModalProps) => {
  return (
    <div>
      {solution.map((value, index) => (
        <InlineMath key={index} math={`${value}`} />
      ))}
    </div>
  );
};

export default SolutionModal;
