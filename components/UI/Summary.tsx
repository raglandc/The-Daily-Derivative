import styles from "./Summary.module.css";

interface SummaryProps {
  lifeBarCount: number;
}

const Summary = ({ lifeBarCount }: SummaryProps) => {
  return <>{lifeBarCount === 0 ? <div>sorry</div> : <div>winner</div>}</>;
};

export default Summary;
