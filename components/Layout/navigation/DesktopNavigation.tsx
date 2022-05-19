import styles from "./DesktopNavigation.module.css";
import Button from "../../ui/Button";
import { useSession, signOut } from "next-auth/react";

const DesktopNavigation = () => {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className={styles.container}>
        <Button style="filled" title="Sign in" link="/sign-in" />
        {/* <div>drop down menu</div> */}
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <Button
          style="filled"
          title="Sign out"
          link="/"
          action={() => signOut()}
        />
        {/* <div>drop down menu</div> */}
      </div>
    );
  }
};

export default DesktopNavigation;
