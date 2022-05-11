import Button from "../ui/Button";
import styles from "./MathAnswer.module.css";

const MathAnswer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.answer}>
        <p>Please Enter Answer:</p>
        <input type="text" />
      </div>
      <div className={styles.buttons}>
        <Button style="filled" title="submit" link="/" />
      </div>
    </div>
  );
};

export default MathAnswer;
