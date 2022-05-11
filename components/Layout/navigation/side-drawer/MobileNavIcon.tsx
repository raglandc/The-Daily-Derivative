import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  setMenuStatus,
  selectStatus,
} from "../../../../app/features/menuStatusSlice";

import SideDrawer from "./SideDrawer";

import styles from "./MobileNavIcon.module.css";

const MobileNavIcon = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const toggleStatus = () => dispatch(setMenuStatus());

  return (
    <>
      <SideDrawer />
      <div className={styles.menu} onClick={toggleStatus}>
        <div className={styles.menuSlash}></div>
        <div
          aria-expanded={!status}
          className={!status ? styles.menuSlash : styles.menuSlashActive_middle}
        ></div>
        <div className={styles.menuSlash}></div>
      </div>
    </>
  );
};

export default MobileNavIcon;
