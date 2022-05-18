import styles from "./KatexKey.module.css";
// @ts-ignore
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

const displayTest = (value: string) => {
  console.log(value);
  return value;
};

interface KatexKeyProps {
  KatexCode: string;
}
const KatexKey = (props: KatexKeyProps) => {
  return (
    <button className={styles.key} value={props.KatexCode}>
      <InlineMath math={props.KatexCode} />
    </button>
  );
};

export default KatexKey;
