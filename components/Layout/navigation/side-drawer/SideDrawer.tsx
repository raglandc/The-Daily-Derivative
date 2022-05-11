import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  setMenuStatus,
  selectStatus,
} from "../../../../app/features/menuStatusSlice";
import Link from "next/link";
import styles from "./SideDrawer.module.css";

//components
import Button from "../../../UI/Button";

const SideDrawer = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const toggleStatus = () => dispatch(setMenuStatus());

  if (status) {
    return (
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <div>
            <h4 className={styles.titleWord}>The</h4>
            <h4 className={styles.titleWord}>Daily</h4>
            <h4 className={styles.titleWord}>Derivative</h4>
          </div>
          <div className={styles.closeSideDrawer} onClick={toggleStatus}>
            close (x)
          </div>
        </div>
        <div className={styles.linkContainer}>
          <div className={styles.link} onClick={toggleStatus}>
            <Link href="/">Home</Link>
          </div>
          <div className={styles.link} onClick={toggleStatus}>
            <Link href="/about">About</Link>
          </div>
          <div className={styles.link} onClick={toggleStatus}>
            <Link href="/user-stats">Stats</Link>
          </div>
          <div className={styles.link} onClick={toggleStatus}>
            <Link href="/frequently-asked-questions">FAQ</Link>
          </div>
          <div className={styles.link} onClick={toggleStatus}>
            <Link href="/contact">Contact</Link>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <Button title="Login" style="filled" />
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default SideDrawer;
