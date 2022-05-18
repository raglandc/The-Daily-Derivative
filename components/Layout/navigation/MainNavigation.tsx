import Link from "next/link";
import MobileNavIcon from "./side-drawer/MobileNavIcon";
import SVGIcon from "../../ui/SVGIcon";
import DesktopNavigation from "./DesktopNavigation";
import useDarkMode from "use-dark-mode";
import styles from "./MainNavigation.module.css";

//svg for dark/light mode
import { faMoon } from "@fortawesome/free-solid-svg-icons";

//////////Main component/////////
/////////////////////////////////
const MainNavigation = () => {
  const darkMode = useDarkMode(false);
  return (
    <nav className={styles.container}>
      <span
        onClick={darkMode.toggle}
        title={darkMode.value === true ? "Dark Mode" : "Light Mode"}
      >
        <SVGIcon icon={faMoon} />
      </span>
      <Link href="/">LOGO</Link>
      <DesktopNavigation />
      <MobileNavIcon />
    </nav>
  );
};

export default MainNavigation;