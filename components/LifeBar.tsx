import styles from "./LifeBar.module.css";
import { motion } from "framer-motion";

interface LifeBarProps {
  lifeBarCount: number;
}

const LifeBar = ({ lifeBarCount }: LifeBarProps) => {
  //handling the boarder changing colors
  let lifeBarBorder;
  if (lifeBarCount === 3) {
    lifeBarBorder = "lifeThree";
  } else if (lifeBarCount === 2) {
    lifeBarBorder = "lifeTwo";
  } else if (lifeBarCount === 1) {
    lifeBarBorder = "lifeOne";
  } else {
    lifeBarBorder = "lifeZero";
  }

  //want to add animations to bars wheen answer is submitted

  ////////////////////////////////////////////////////////////////
  //border variant
  const borderVariant = {
    lifeThree: {
      border: "1px solid var(--success)",
    },
    lifeTwo: {
      border: "1px solid var(--warning)",
    },
    lifeOne: {
      border: "1px solid var(--warning)",
    },
    lifeZero: {
      border: "1px solid var(--error)",
    },
  };
  ////////////////////////////////////////////////////////////////
  //bar variant styles
  const barVariant = {
    active: {
      width: "100%",
      height: "100%",
      backgroundColor: "var(--button-filled)",
    },
    inactive: {
      width: "0%",
      height: "100%",
      backgroundColor: "var(--component-background)",
    },
  };
  ///////////////////////////////////////////////////////////////
  //counter variant
  const counterPositionVariant = {
    lifeThree: {
      right: "0%",
    },
    lifeTwo: {
      right: "33%",
    },
    lifeOne: {
      right: "66%",
    },
    lifeZero: {
      left: "0%",
    },
  };

  let lifeCounterPosition;
  if (lifeBarCount === 3) {
    lifeCounterPosition = "lifeThree";
  } else if (lifeBarCount === 2) {
    lifeCounterPosition = "lifeTwo";
  } else if (lifeBarCount === 1) {
    lifeCounterPosition = "lifeOne";
  } else {
    lifeCounterPosition = "lifeZero";
  }
  ////////////////////////////////////////////////////////////////////////
  return (
    <div className={styles.container}>
      <motion.div
        variants={borderVariant}
        animate={lifeBarBorder}
        className={styles.lifeBarContainer}
      >
        <div className={styles.lifeBar}>
          <motion.div
            variants={barVariant}
            animate={lifeBarCount === 0 ? "inactive" : "active"}
            transition={{ ease: "easeOut", duration: 1 }}
          />
          <motion.div
            variants={barVariant}
            animate={lifeBarCount > 1 ? "active" : "inactive"}
            transition={{ ease: "easeOut", duration: 1 }}
          />
          <motion.div
            variants={barVariant}
            animate={lifeBarCount === 3 ? "active" : "inactive"}
            transition={{ ease: "easeOut", duration: 1 }}
          />
        </div>
      </motion.div>
      <motion.div
        initial={"lifeThree"}
        variants={counterPositionVariant}
        animate={lifeCounterPosition}
        transition={{ ease: "easeOut" }}
        className={styles.lifeFraction}
      >
        {lifeBarCount} : 3
      </motion.div>
    </div>
  );
};

export default LifeBar;
