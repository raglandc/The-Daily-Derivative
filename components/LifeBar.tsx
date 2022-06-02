import Container from "./ui/Container";
import styles from "./LifeBar.module.css";

interface LifeBarProps {
  lifeBarCount: number;
}

const LifeBar = ({ lifeBarCount }: LifeBarProps) => {
  //handling the boarder changing colors
  let lifeBarBorder;
  if (lifeBarCount === 3) {
    lifeBarBorder = styles.barGoodStandingBorder;
  } else if (lifeBarCount > 0 && lifeBarCount < 3) {
    lifeBarBorder = styles.barWarningBorder;
  } else {
    lifeBarBorder = styles.barDeadBorder;
  }

  return (
    <Container>
      <div className={`${styles.lifeBarContainer} ${lifeBarBorder}`}>
        <div className={styles.lifeBar}>
          <div className={lifeBarCount === 0 ? styles.barDead : styles.bar} />
          <div className={lifeBarCount > 1 ? styles.bar : styles.barDead} />
          <div className={lifeBarCount === 3 ? styles.bar : styles.barDead} />
          <span className={styles.lifeFraction}> {lifeBarCount} : 3</span>
        </div>
      </div>
    </Container>
  );
};

export default LifeBar;
