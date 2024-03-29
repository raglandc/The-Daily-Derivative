import Link from "next/link";
import styles from "./DropDownMenu.module.css";

const DropDownMenu = () => {
  return (
    <nav className={styles.dropDownContainer}>
      <div className={styles.downCaret}> Menu &or; </div>
      <Menu />
    </nav>
  );
};

const Menu = () => {
  return (
    <>
      <ul className={styles.listContainer}>
        <li className={styles.link}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.link}>
          <Link href="/how-to-play">How-to-play</Link>
        </li>
        <li className={styles.link}>
          <Link href="/user-stats">Stats</Link>
        </li>
        <li className={styles.link}>
          <Link href="/about">About</Link>
        </li>
        <li className={styles.link}>
          <Link href="/frequently-asked-questions">FAQ</Link>
        </li>
      </ul>
    </>
  );
};

export default DropDownMenu;
