import styles from "./Button.module.css";

interface ButtonProps {
  title: string;
  style: string;
}

const Button = (props: ButtonProps) => {
  return (
    <div className={props.style === "filled" ? styles.filled : styles.hollow}>
      <p className={styles.title}>{props.title}</p>
    </div>
  );
};

export default Button;
