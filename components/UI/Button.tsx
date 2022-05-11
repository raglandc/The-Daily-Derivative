import styles from "./Button.module.css";
import Link from "next/link";

interface ButtonProps {
  title: string;
  style: string;
  link: string;
}

const Button = (props: ButtonProps) => {
  return (
    <div className={props.style === "filled" ? styles.filled : styles.hollow}>
      <Link href={props.link}>{props.title}</Link>
    </div>
  );
};

export default Button;
