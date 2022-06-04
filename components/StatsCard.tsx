import styles from "./StatsCard.module.css";
import Container from "./ui/Container";
//@ts-ignore
import AnimatedNumber from "animated-number-react";

//stats props interface
interface StatsCardProps {
  title: string;
  numberToAnimate: number;
}

const StatsCard = (props: StatsCardProps) => {
  //set the format of the animated number
  const formatValue = (value: number) => `${Number(value).toFixed(0)}`;
  return (
    <Container>
      <h2 className={styles.cardHeader}>{props.title}</h2>
      <div>
        <AnimatedNumber
          delay={200}
          formatValue={formatValue}
          className={styles.number}
          value={props.numberToAnimate}
          duration={618}
        />
      </div>
    </Container>
  );
};

export default StatsCard;
