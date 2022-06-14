import MobileNavIcon from "./side-drawer/MobileNavIcon";
import SVGIcon from "../../UI/SVGIcon";
import DesktopSignInOut from "./DesktopSignInOut";
import useDarkMode from "use-dark-mode";
import styles from "./MainNavigation.module.css";
import DropDownMenu from "../../DropDownMenu";
import Logo from "../../UI/Logo";

//svg for dark/light mode
import { faMoon } from "@fortawesome/free-solid-svg-icons";

//////////Main component/////////
/////////////////////////////////
const MainNavigation = () => {
  const darkMode = useDarkMode(false);
  return (
    <nav className={styles.container}>
      <div className={styles.moonContainer}>
        <span
          onClick={darkMode.toggle}
          title={darkMode.value === true ? "Dark Mode" : "Light Mode"}
        >
          <SVGIcon icon={faMoon} />
        </span>
        <DropDownMenu />
      </div>
      <Logo />
      <DesktopSignInOut />
      <MobileNavIcon />
    </nav>
  );
};

export default MainNavigation;
