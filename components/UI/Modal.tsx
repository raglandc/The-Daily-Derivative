import { FC } from "react";
import React, { useState, useEffect, ReactNode } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import { motion } from "framer-motion";

interface ModalProps {
  show: any;
  onClose: any;
  children: ReactNode;
  title: string;
}

const Modal = ({ show, onClose, children, title }: ModalProps) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const closeHandler = () => {
    onClose();
  };

  const modalContent = show && (
    <div onClick={closeHandler} className={styles.overlay}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className={styles.container}
      >
        <div className={styles.header}>
          <h3>{title}</h3>
          <button onClick={closeHandler} className={styles.button}>
            X
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </motion.div>
    </div>
  );

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root") as HTMLElement
    );
  } else {
    return null;
  }
};

export default Modal;
