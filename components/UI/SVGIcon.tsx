import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./SVGIcon.module.css";

interface IconProps {
  icon: any;
  action?: () => void;
  title?: string;
}

const SVGIcon = (props: IconProps) => {
  const iconString = props.icon;

  return (
    <span title={props.title} onClick={props.action}>
      <FontAwesomeIcon icon={iconString} className={styles.icon} />
    </span>
  );
};

export default SVGIcon;
