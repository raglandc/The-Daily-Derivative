import Link from "next/link";
import MobileNavIcon from "./side-drawer/MobileNavIcon";
import SVGIcon from "../../UI/svgIcon";
import styles from "./MainNavigation.module.css";

//svg for dark/light mode
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";

//////////Main component/////////
/////////////////////////////////
const MainNavigation = () => {
  return (
    <nav className={styles.container}>
      {/* <DesktopNavigation /> */}
      <SVGIcon icon={faMoon} />
      <Link href="/">LOGO</Link>
      <MobileNavIcon />
    </nav>
  );
};

export default MainNavigation;
