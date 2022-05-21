import React, { useState, useEffect, ReactNode } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

interface ModalProps {
  show: any;
  onClose: any;
  children: ReactNode;
}

const Modal = ({ show, onClose, children }: ModalProps) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const closeHandler = () => {
    onClose();
  };

  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.header}>
          <a href="#" onClick={closeHandler}>
            <button>Close</button>
          </a>
          <div className={styles.body}>{children}</div>
        </div>
      </div>
    </div>
  ) : null;

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
