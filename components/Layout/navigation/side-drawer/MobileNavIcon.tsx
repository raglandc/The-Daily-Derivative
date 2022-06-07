import { useState } from "react";
import SideDrawer from "./SideDrawer";

import styles from "./MobileNavIcon.module.css";

const MobileNavIcon = () => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const toggleStatus = () => {
    setShowSideDrawer((prev) => !prev);
  };

  return (
    <>
      <SideDrawer show={showSideDrawer} onClose={toggleStatus} />
      <div className={styles.menu} onClick={toggleStatus}>
        <div className={styles.menuSlash}></div>
        <div
          aria-expanded={!showSideDrawer}
          className={
            !showSideDrawer ? styles.menuSlash : styles.menuSlashActive_middle
          }
        ></div>
        <div className={styles.menuSlash}></div>
      </div>
    </>
  );
};

export default MobileNavIcon;
