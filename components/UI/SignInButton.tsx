import styles from "./SignInButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface ButtonProps {
  title: string;
  link: any;
  icon?: any;
  //incase you need the button to perform a function
  //while it accesses link, optional
  //pass a arrow function through '{variable}'
  action?: any;
}

const SignInButton = (props: ButtonProps) => {
  const iconString = props.icon;

  return (
    <div onClick={props.action} className={styles.button}>
      {props.icon ? (
        <span onClick={props.action}>
          <FontAwesomeIcon icon={iconString} className={styles.icon} />
        </span>
      ) : null}
      <span>{props.title}</span>
    </div>
  );
};

export default SignInButton;
