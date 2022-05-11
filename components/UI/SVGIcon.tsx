import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./SVGIcon.module.css";

interface IconProps {
  icon: any;
}

const SVGIcon = (props: IconProps) => {
  const iconString = props.icon;

  return (
    <>
      <FontAwesomeIcon icon={iconString} className={styles.icon} />
    </>
  );
};

export default SVGIcon;
