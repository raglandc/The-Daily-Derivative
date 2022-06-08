import styles from "./StatsCard.module.css";
import Container from "./ui/Container";
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

//animated number using framer motion
function AnimateNumber({ from, to }: any) {
  //using useRef so it does not rerender each time a number changes
  const nodeRef = useRef<any>();

  useEffect(() => {
    const node = nodeRef.current;

    const controls = animate(from, to, {
      duration: 3,
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
