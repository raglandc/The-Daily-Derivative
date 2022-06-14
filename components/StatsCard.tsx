import styles from "./StatsCard.module.css";
import Container from "./UI/Container";
//@ts-ignore
import { animate } from "framer-motion";
import { useEffect, useRef } from "react";

//stats props interface
interface StatsCardProps {
  title: string;
  numberToAnimate: number;
}

const StatsCard = (props: StatsCardProps) => {
  return (
    <Container>
      <h2 className={styles.cardHeader}>{props.title}</h2>
      <div className={styles.numberContainer}>
        <AnimateNumber from={0} to={props.numberToAnimate} />
      </div>
    </Container>
  );
};

interface AnimatedNumberProps {
  from: number;
  to: number;
}

//animated number using framer motion
function AnimateNumber({ from, to }: AnimatedNumberProps) {
  //using useRef so it does not rerender each time a number changes
  //I am using type any to keep TS quite, the type is "Node" that
  //contains a textContent property
  const nodeRef = useRef<any>();

  useEffect(() => {
    const node = nodeRef.current;

    const controls = animate(from, to, {
      delay: 0.5,
      duration: 2,
      onUpdate(value) {
        node.textContent = value.toFixed(0);
      },
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [from, to]);

  return <p className={styles.number} ref={nodeRef} />;
}

export default StatsCard;
