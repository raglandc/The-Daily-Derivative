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
          <h3 className={styles.header}>
            You lost all of your tries, Theres always tomorrow
          </h3>
          <LifeBar lifeBarCount={lifeBarCount} />
        </>
      ) : (
        <>
          <h3 className={styles.header}>Nice! You solved the problem </h3>
          <p>
            with {lifeBarCount} {lifeBarCount > 1 ? "tries" : "try"} remaining
          </p>
          <LifeBar lifeBarCount={lifeBarCount} />
        </>
      )}
    </div>
  );
};

export default Summary;
