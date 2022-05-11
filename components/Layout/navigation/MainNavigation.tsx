import Link from "next/link";
import MobileNavIcon from "./side-drawer/MobileNavIcon";
import styles from "./MainNavigation.module.css";

//////////Main component/////////
/////////////////////////////////
const MainNavigation = () => {
  return (
    <nav className={styles.container}>
      <Link href="/">LOGO</Link>
      {/* <DesktopNavigation /> */}
      <MobileNavIcon />
    </nav>
  );
};

export default MainNavigation;
