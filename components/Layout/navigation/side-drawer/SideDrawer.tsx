import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  setMenuStatus,
  selectStatus,
} from "../../../../app/features/menuStatusSlice";
import Link from "next/link";
//styles
import styles from "./SideDrawer.module.css";
import { faGoogle, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
////////////////////////////////////////////////////////////////

//components
import SignInButton from "../../../ui/SignInButton";

//user session imports
import { signIn, signOut, useSession } from "next-auth/react";
////////////////////////////////////////////////////

const SideDrawer = () => {
  const dispatch = useAppDispatch();
  const sideDrawerStatus = useAppSelector(selectStatus);
  const toggleStatus = () => {
    dispatch(setMenuStatus());
  };

  const { data: session } = useSession();

  if (sideDrawerStatus) {
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

        {session ? (
          <div className={styles.buttonContainer}>
            <SignInButton
              title="Sign Out"
              link="/"
              action={() => {
                toggleStatus;
                signOut({ callbackUrl: "/" });
              }}
            />
          </div>
        ) : (
          <div className={styles.buttonContainer}>
            <p>sign in with</p>
            <SignInButton
              title="Google"
              link="/"
              action={() => {
                toggleStatus;
                signIn("google", { callbackUrl: "/" });
              }}
              icon={faGoogle}
            />
            <SignInButton
              title="Twitter"
              link="/"
              action={() => {
                toggleStatus;
                signIn("twitter", { callbackUrl: "/" });
              }}
              icon={faTwitter}
            />
            <SignInButton
              title="LinkedIn"
              link="/"
              action={() => {
                toggleStatus;
                signIn("linkedin", { callbackUrl: "/" });
              }}
              icon={faLinkedin}
            />
            <SignInButton
              title="Facebook"
              link="/"
              action={() => {
                toggleStatus;
                signIn("linkedin", { callbackUrl: "/" });
              }}
              icon={faFacebook}
            />
          </div>
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default SideDrawer;
