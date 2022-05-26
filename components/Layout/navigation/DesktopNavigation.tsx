import styles from "./DesktopNavigation.module.css";
import Button from "../../ui/Button";
import DropDownMenu from "../../ui/DropDownMenu";
import { useSession, signOut } from "next-auth/react";

const DesktopNavigation = () => {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className={styles.container}>
        <DropDownMenu />
        <Button style="filled" title="Sign in" link="/sign-in" />
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <DropDownMenu />
        <Button
          style="hollow"
          title="Sign out"
          link="/"
          action={() => signOut()}
        />
      </div>
    );
  }
};

export default DesktopNavigation;
