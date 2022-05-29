import styles from "./Summary.module.css";
import LifeBar from "./LifeBar";

interface SummaryProps {
  lifeBarCount: number;
}

const Summary = ({ lifeBarCount }: SummaryProps) => {
  return (
    <div className={styles.container}>
      {lifeBarCount === 0 ? (
        <>
          <h2 className={styles.header}>
            You lost all of your tries, Theres always tomorrow
          </h2>
        </>
      ) : (
        <>
          <h2 className={styles.header}>Nice! You solved the problem </h2>
          <p>
            With {lifeBarCount} {lifeBarCount > 1 ? "attempts " : "attempt "}
            remaining
          </p>
        </>
      )}
    </div>
  );
};

export default Summary;
