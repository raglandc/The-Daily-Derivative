//handlers
import { updateInputHandler } from "../../../controllers/calculatorController";

import styles from "./MathKeyboard.module.css";
import { useState } from "react";
//@ts-ignore
import { InlineMath } from "react-katex";
//Katex (math styling)
import "katex/dist/katex.min.css";
import Container from "../../UI/Container";

interface MathKeyboardProps {
  showSolution: boolean;
  problem: any;
  lifeBar: number;
  action: (userInputArray: string[]) => void;
}

const MathKeyboard = ({ action, lifeBar, showSolution }: MathKeyboardProps) => {
  //logic for tracking keypress
  const [userInput, setUserInput] = useState<string[]>([]);
  const [showSecondKeyboard, setShowSecondKeyBoard] = useState(false);

  const updateInput = (value: string) => {
    updateInputHandler(value, userInput, setUserInput);
  };

  return (
    <Container>
      <div className={styles.answer}>
        <div className={styles.mathDisplay}>
          {userInput === []
            ? null
            : userInput.map((value, index) => (
                <InlineMath key={index} math={value} />
              ))}
        </div>
        {showSolution || lifeBar === 0 ? null : (
          <button
            onClick={() => action(userInput)}
            className={styles.submitButton}
          >
            Submit Answer
          </button>
        )}
      </div>
      <div className={styles.keyboardContainer}>
        <div className={styles.row1}>
          <button onClick={() => updateInput("1")} className={styles.key}>
            <InlineMath math="1" />
          </button>
          <button onClick={() => updateInput("2")} className={styles.key}>
            <InlineMath math="2" />
          </button>
          <button onClick={() => updateInput("3")} className={styles.key}>
            <InlineMath math="3" />
          </button>
          <button onClick={() => updateInput("4")} className={styles.key}>
            <InlineMath math="4" />
          </button>
          <button onClick={() => updateInput("5")} className={styles.key}>
            <InlineMath math="5" />
          </button>
          <button onClick={() => updateInput("6")} className={styles.key}>
            <InlineMath math="6" />
          </button>
          <button onClick={() => updateInput("7")} className={styles.key}>
            <InlineMath math="7" />
          </button>
          <button onClick={() => updateInput("8")} className={styles.key}>
            <InlineMath math="8" />
          </button>
          <button onClick={() => updateInput("9")} className={styles.key}>
            <InlineMath math="9" />
          </button>
          <button onClick={() => updateInput("0")} className={styles.key}>
            <InlineMath math="0" />
          </button>
        </div>
        {!showSecondKeyboard ? (
          <>
            <div className={styles.row2}>
              <button onClick={() => updateInput("+")} className={styles.key}>
                <InlineMath math="+" />
              </button>
              <button onClick={() => updateInput("-")} className={styles.key}>
                <InlineMath math="-" />
              </button>
              <button
                onClick={() => updateInput("\\times")}
                className={styles.key}
              >
                <InlineMath math="\times" />
              </button>
              <button
                onClick={() => updateInput("\\div")}
                className={styles.key}
              >
                <InlineMath math="\div" />
              </button>
              <button
                onClick={() => updateInput("\\sqrt{}")}
                className={styles.key}
              >
                <InlineMath math="\sqrt{}" />
              </button>
              <button onClick={() => updateInput(",")} className={styles.key}>
                <InlineMath math="," />
              </button>
              <button
                onClick={() => updateInput("\\pm")}
                className={styles.key}
              >
                <InlineMath math="\pm" />
              </button>
              <button
                onClick={() => updateInput("\\mp")}
                className={styles.key}
              >
                <InlineMath math="\mp" />
              </button>
              <button
                onClick={() => updateInput("\\le")}
                className={styles.key}
              >
                <InlineMath math="\le" />
              </button>
              <button
                onClick={() => updateInput("\\ge")}
                className={styles.key}
              >
                <InlineMath math="\ge" />
              </button>
            </div>
            <div className={styles.row3}>
              <button
                onClick={() => updateInput("\\lt")}
                className={styles.key}
              >
                <InlineMath math="\lt" />
              </button>
              <button
                onClick={() => updateInput("\\gt")}
                className={styles.key}
              >
                <InlineMath math="\gt" />
              </button>
              <button onClick={() => updateInput("(")} className={styles.key}>
                <InlineMath math="(" />
              </button>
              <button onClick={() => updateInput(")")} className={styles.key}>
                <InlineMath math=")" />
              </button>
              <button onClick={() => updateInput("[")} className={styles.key}>
                <InlineMath math="[" />
              </button>
              <button onClick={() => updateInput("]")} className={styles.key}>
                <InlineMath math="]" />
              </button>
              <button onClick={() => updateInput("e")} className={styles.key}>
                <InlineMath math="e" />
              </button>
              <button
                onClick={() => updateInput("\\pi")}
                className={styles.key}
              >
                <InlineMath math="\pi" />
              </button>
              <button
                onClick={() => updateInput("\\infty")}
                className={styles.key}
              >
                <InlineMath math="\infty" />
              </button>
            </div>
            <div className={styles.row4}>
              <button
                onClick={() => updateInput("\\wedge")}
                className={styles.key}
              >
                <InlineMath math="\wedge" />
              </button>
              <button
                onClick={() => updateInput("\\ln")}
                className={styles.key}
              >
                <InlineMath math="\ln" />
              </button>
              <button onClick={() => updateInput("x")} className={styles.key}>
                <InlineMath math="x" />
              </button>
              <button onClick={() => updateInput("y")} className={styles.key}>
                <InlineMath math="y" />
              </button>
              <button onClick={() => updateInput("z")} className={styles.key}>
                <InlineMath math="z" />
              </button>
              <button onClick={() => updateInput("t")} className={styles.key}>
                <InlineMath math="t" />
              </button>
              <button onClick={() => updateInput("s")} className={styles.key}>
                <InlineMath math="s" />
              </button>
              <button onClick={() => updateInput("d")} className={styles.key}>
                <InlineMath math="d" />
              </button>
              <button
                onClick={() => updateInput("\\leftarrow")}
                className={styles.key}
              >
                <InlineMath math="\leftarrow" />
              </button>
            </div>
          </>
        ) : (
          <>
            {/* second keyboard begins here */}
            <div className={styles.row2}>
              <button onClick={() => updateInput("+")} className={styles.key}>
                <InlineMath math="+" />
              </button>
              <button onClick={() => updateInput("-")} className={styles.key}>
                <InlineMath math="-" />
              </button>
              <button
                onClick={() => updateInput("\\times")}
                className={styles.key}
              >
                <InlineMath math="\times" />
              </button>
              <button
                onClick={() => updateInput("\\div")}
                className={styles.key}
              >
                <InlineMath math="\div" />
              </button>
              <button
                onClick={() => updateInput("\\sqrt{}")}
                className={styles.key}
              >
                <InlineMath math="\sqrt{}" />
              </button>
              <button onClick={() => updateInput(",")} className={styles.key}>
                <InlineMath math="," />
              </button>
              <button
                onClick={() => updateInput("\\int")}
                className={styles.key}
              >
                <InlineMath math="\int" />
              </button>
              <button
                onClick={() => updateInput("\\oint")}
                className={styles.key}
              >
                <InlineMath math="\oint" />
              </button>

              <button
                onClick={() => updateInput("\\nabla")}
                className={styles.key}
              >
                <InlineMath math="\nabla" />
              </button>
              <button
                onClick={() => updateInput("\\leftthreetimes")}
                className={styles.key}
              >
                <InlineMath math="\leftthreetimes" />
              </button>
            </div>
            <div className={styles.row3Second}>
              <button
                onClick={() => updateInput("\\arccos")}
                className={styles.key}
              >
                <InlineMath math="\arccos" />
              </button>
              <button
                onClick={() => updateInput("\\arcsin")}
                className={styles.key}
              >
                <InlineMath math="\arcsin" />
              </button>
              <button
                onClick={() => updateInput("\\arctan")}
                className={styles.key}
              >
                <InlineMath math="\arctan" />
              </button>
              <button onClick={() => updateInput("(")} className={styles.key}>
                <InlineMath math="(" />
              </button>
              <button onClick={() => updateInput(")")} className={styles.key}>
                <InlineMath math=")" />
              </button>
              <button
                onClick={() => updateInput("^\\circ")}
                className={styles.key}
              >
                <InlineMath math="^\circ" />
              </button>
              <button
                onClick={() => updateInput("\\theta")}
                className={styles.key}
              >
                <InlineMath math="\theta" />
              </button>
            </div>
            <div className={styles.row4}>
              <button
                onClick={() => updateInput("\\lor")}
                className={styles.key}
              >
                <InlineMath math="\lor" />
              </button>
              <button
                onClick={() => updateInput("\\log")}
                className={styles.key}
              >
                <InlineMath math="\log" />
              </button>
              <button
                onClick={() => updateInput("\\cos")}
                className={styles.key}
              >
                <InlineMath math="\cos" />
              </button>
              <button
                onClick={() => updateInput("\\sin")}
                className={styles.key}
              >
                <InlineMath math="\sin" />
              </button>
              <button onClick={() => updateInput("d")} className={styles.key}>
                <InlineMath math="d" />
              </button>
              <button onClick={() => updateInput("x")} className={styles.key}>
                <InlineMath math="x" />
              </button>
              <button onClick={() => updateInput("y")} className={styles.key}>
                <InlineMath math="y" />
              </button>
              <button onClick={() => updateInput("z")} className={styles.key}>
                <InlineMath math="z" />
              </button>
              <button
                onClick={() => updateInput("\\leftarrow")}
                className={styles.key}
              >
                <InlineMath math="\leftarrow" />
              </button>
            </div>
          </>
        )}
        <div className={styles.lastRow}>
          <button
            onClick={() =>
              setShowSecondKeyBoard((showSecondKeyboard) => !showSecondKeyboard)
            }
            className={styles.key}
          >
            {!showSecondKeyboard ? "2nd" : "1st"}
          </button>
          <button onClick={() => setUserInput([])} className={styles.key}>
            <InlineMath math="\circlearrowright" />
          </button>
        </div>
      </div>
    </Container>
  );
};

export default MathKeyboard;
