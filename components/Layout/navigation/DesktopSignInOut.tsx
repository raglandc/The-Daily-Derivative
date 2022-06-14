import styles from "./DesktopSignInOut.module.css";
import Button from "../../UI/Button";
import { useSession, signIn, signOut } from "next-auth/react";

const DesktopSignInOut = () => {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className={styles.container}>
        <Button
          style="filled"
          title="Sign in"
          link="/"
          action={() => signIn()}
        />
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
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

export default DesktopSignInOut;
