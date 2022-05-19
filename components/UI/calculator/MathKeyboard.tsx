//hiding when side drawer is present
import { useAppSelector } from "../../../app/hooks";
import { selectStatus } from "../../../app/features/menuStatusSlice";

import styles from "./MathKeyboard.module.css";
import { useEffect, useState } from "react";
//@ts-ignore
import { InlineMath } from "react-katex";

const MathKeyboard = () => {
  //mobile menu status
  const status = useAppSelector(selectStatus);
  //logic for tracking keypress
  const [userInput, setUserInput] = useState<string[]>([]);
  const [showSecondKeyboard, setShowSecondKeyBoard] = useState(false);

  const updateInput = (value: string) => {
    //last element entered in our array
    let lastElement = userInput[userInput.length - 1];

    //handle deleting elements from array
    if (value === "del") {
      return setUserInput(userInput.splice(0, userInput.length - 1));
    }

    //will use the following pattern to determine if we are still creating
    //a super script
    const regexSuper = /\^\{[0-9a-zA-Z\+-]*\}/;
    const regexSub = /\_\{[0-9a-zA-Z\+-]*\}/;
    //handling superscripts
    if (regexSuper.test(lastElement) && value !== "\\hspace{.01cm}") {
      const temp = userInput.filter((arrString) => !regexSuper.test(arrString));
      const currentExp = lastElement.split("").slice(2, -1).join("");
      value = `^{${currentExp}${value}}`;
      setUserInput([...temp, value]);
    }
    //handle subscripts
    else if (regexSub.test(lastElement) && value !== "\\hspace{.01cm}") {
      const temp = userInput.filter((arrString) => !regexSub.test(arrString));
      const currentExp = lastElement.split("").slice(2, -1).join("");
      value = `_{${currentExp}${value}}`;
      setUserInput([...temp, value]);
    }
    //handle breaking from superscripts
    else if (value === "\\hspace{.01cm}") {
      setUserInput([...userInput, value]);
    }
    //handle every other input that is not a super / sub script
    else {
      setUserInput([...userInput, value]);
    }
  };

  useEffect(() => {
    console.log(userInput);
  }, [userInput]);

  return status ? null : (
    <div className={styles.container}>
      <div className={styles.answer}>
        <div className={styles.mathDisplay}>
          {userInput === []
            ? null
            : userInput.map((value, index) => (
                <InlineMath key={index} math={value} />
              ))}
        </div>
        <button
          // onClick={() => submitMath(userInput)}
          className={styles.submitButton}
        >
          Submit Answer
        </button>
      </div>
      <div className={styles.row}>
        <button onClick={() => updateInput("0")} className={styles.key}>
          <InlineMath math="0" />
        </button>
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
      </div>
      {!showSecondKeyboard ? (
        <>
          <div className={styles.row}>
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
            <button onClick={() => updateInput("\\div")} className={styles.key}>
              <InlineMath math="\div" />
            </button>
            <button onClick={() => updateInput("=")} className={styles.key}>
              <InlineMath math="=" />
            </button>
            <button onClick={() => updateInput("\\pm")} className={styles.key}>
              <InlineMath math="\pm" />
            </button>
            <button onClick={() => updateInput("\\mp")} className={styles.key}>
              <InlineMath math="\mp" />
            </button>
            <button
              onClick={() => updateInput("\\cdot")}
              className={styles.key}
            >
              <InlineMath math="\cdot" />
            </button>
            <button onClick={() => updateInput("\\le")} className={styles.key}>
              <InlineMath math="\le" />
            </button>
            <button onClick={() => updateInput("\\ge")} className={styles.key}>
              <InlineMath math="\ge" />
            </button>
          </div>
          <div className={styles.row}>
            <button onClick={() => updateInput("\\lt")} className={styles.key}>
              <InlineMath math="\lt" />
            </button>
            <button onClick={() => updateInput("\\gt")} className={styles.key}>
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
            <button onClick={() => updateInput("\\pi")} className={styles.key}>
              <InlineMath math="\pi" />
            </button>
            <button
              onClick={() => updateInput("\\infty")}
              className={styles.key}
            >
              <InlineMath math="\infty" />
            </button>
          </div>
          <div className={styles.row}>
            <button onClick={() => updateInput("^{}")} className={styles.key}>
              ^
            </button>
            <button
              onClick={() => updateInput("\\hspace{.01cm}")}
              className={styles.key}
            >
              esc
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
            <button onClick={() => updateInput("del")} className={styles.key}>
              del
            </button>
          </div>
        </>
      ) : (
        <>
          {/* second keyboard begins here */}
          <div className={styles.row}>
            <button onClick={() => updateInput("\\int")} className={styles.key}>
              <InlineMath math="\int" />
            </button>
            <button
              onClick={() => updateInput("\\sqrt{}")}
              className={styles.key}
            >
              <InlineMath math="\sqrt{}" />
            </button>
            <button
              onClick={() => updateInput("\\times")}
              className={styles.key}
            >
              <InlineMath math="\times" />
            </button>
            <button onClick={() => updateInput("\\div")} className={styles.key}>
              <InlineMath math="\div" />
            </button>
            <button onClick={() => updateInput("=")} className={styles.key}>
              <InlineMath math="=" />
            </button>
            <button onClick={() => updateInput("\\pm")} className={styles.key}>
              <InlineMath math="\pm" />
            </button>
            <button onClick={() => updateInput("\\mp")} className={styles.key}>
              <InlineMath math="\mp" />
            </button>
            <button
              onClick={() => updateInput("\\cdot")}
              className={styles.key}
            >
              <InlineMath math="\cdot" />
            </button>
            <button onClick={() => updateInput("\\le")} className={styles.key}>
              <InlineMath math="\le" />
            </button>
            <button onClick={() => updateInput("\\ge")} className={styles.key}>
              <InlineMath math="\ge" />
            </button>
          </div>
          <div className={styles.row}>
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
          <div className={styles.row}>
            <button onClick={() => updateInput("_{}")} className={styles.key}>
              _
            </button>
            <button
              onClick={() => updateInput("\\hspace{.05cm}")}
              className={styles.key}
            >
              esc
            </button>
            <button onClick={() => updateInput("\\cos")} className={styles.key}>
              <InlineMath math="\cos" />
            </button>
            <button onClick={() => updateInput("\\sin")} className={styles.key}>
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
            <button onClick={() => updateInput("del")} className={styles.key}>
              del
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
          {!showSecondKeyboard ? "More" : "Less"}
        </button>
        <button onClick={() => setUserInput([])} className={styles.key}>
          clear
        </button>
      </div>
    </div>
  );
};

export default MathKeyboard;
