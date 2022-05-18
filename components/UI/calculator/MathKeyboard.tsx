//hiding when side drawer is present
import { useAppSelector } from "../../../app/hooks";
import { selectStatus } from "../../../app/features/menuStatusSlice";

import SVGIcon from "../SVGIcon";
import { faCircleRight } from "@fortawesome/free-regular-svg-icons";
import styles from "./MathKeyboard.module.css";
import { useEffect, useState } from "react";
//@ts-ignore
import { InlineMath } from "react-katex";

const MathKeyboard = () => {
  //mobile menu status
  const status = useAppSelector(selectStatus);
  //logic for tracking keypress
  const [userInput, setUserInput] = useState<string[]>([]);

  const updateInput = (value: string) => {
    let lastElement = userInput[userInput.length - 1];
    //handle deleting elements from array
    if (value === "del") {
      return setUserInput(userInput.splice(0, userInput.length - 1));
    }

    const regex = /\^\{[0-9]*[a-z]*\}/;
    //handling superscripts
    if (regex.test(lastElement) && value !== "0") {
      const temp = userInput.filter((value) => value !== "^{}");
      value = `^{${value}}`;
      setUserInput([...temp, value]);
    } else {
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
        <button className={styles.submitButton}>
          <SVGIcon icon={faCircleRight} />
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
      <div className={styles.row}>
        <button onClick={() => updateInput("+")} className={styles.key}>
          <InlineMath math="+" />
        </button>
        <button onClick={() => updateInput("-")} className={styles.key}>
          <InlineMath math="-" />
        </button>
        <button onClick={() => updateInput("\\times")} className={styles.key}>
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
        <button onClick={() => updateInput("\\cdot")} className={styles.key}>
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
        <button onClick={() => updateInput("\\infty")} className={styles.key}>
          <InlineMath math="\infty" />
        </button>
      </div>
      <div className={styles.row}>
        <button onClick={() => updateInput("^{}")} className={styles.key}>
          ^
        </button>
        <button onClick={() => updateInput("break")} className={styles.key}>
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
      <div className={styles.row}>row Five</div>
    </div>
  );
};

export default MathKeyboard;
