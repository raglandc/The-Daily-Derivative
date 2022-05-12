import styles from "./Button.module.css";
import Link from "next/link";

interface ButtonProps {
  title: string;
  style: string;
  link: string;
  //incase you need the button to perform a function
  //while it accesses link, optional
  //pass a arrow function through '{variable}'
  action?: () => { payload: undefined; type: string };
}

const Button = (props: ButtonProps) => {
  return (
    <div
      onClick={props.action}
      className={props.style === "filled" ? styles.filled : styles.hollow}
    >
      <Link href={props.link}>{props.title}</Link>
    </div>
  );
};

export default Button;
