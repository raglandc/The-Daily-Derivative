import { ReactNode } from "react";
import styles from "./Container.module.css";

interface ContainerProps {
  children: ReactNode;
  action?: any;
}

const Container = ({ children, action }: ContainerProps) => {
  return (
    <div onClick={action} className={styles.container}>
      {children}
    </div>
  );
};

export default Container;
