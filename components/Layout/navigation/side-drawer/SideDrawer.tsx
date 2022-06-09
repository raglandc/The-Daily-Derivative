import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Link from "next/link";
import { motion } from "framer-motion";
//styles
import styles from "./SideDrawer.module.css";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
////////////////////////////////////////////////////////////////

//components
import SignInButton from "../../../ui/SignInButton";

//user session imports
import { signIn, signOut, useSession } from "next-auth/react";
////////////////////////////////////////////////////

interface SideDrawerProps {
  show: any;
  onClose: any;
}

const SideDrawer = ({ show, onClose }: SideDrawerProps): JSX.Element | null => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const closeHandler = () => {
    onClose();
  };

  const { data: session } = useSession();

  const SideDrawerContent = show ? (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      className={styles.container}
    >
      <div className={styles.titleContainer}>
        <div>
          <h4 className={styles.titleWord}>The</h4>
          <h4 className={styles.titleWord}>Daily</h4>
          <h4 className={styles.titleWord}>Derivative</h4>
        </div>
        <div className={styles.closeSideDrawer} onClick={closeHandler}>
          close (x)
        </div>
      </div>
      <ul className={styles.linkContainer}>
        <li className={styles.link} onClick={closeHandler}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.link} onClick={closeHandler}>
          <Link href="/how-to-play">How-to-play</Link>
        </li>
        <li className={styles.link} onClick={closeHandler}>
          <Link href="/user-stats">Stats</Link>
        </li>
        <li className={styles.link} onClick={closeHandler}>
          <Link href="/about">About</Link>
        </li>
        <li className={styles.link} onClick={closeHandler}>
          <Link href="/frequently-asked-questions">FAQ</Link>
        </li>
      </ul>

      {session ? (
        <div className={styles.buttonContainer}>
          <SignInButton
            title="Sign Out"
            link="/"
            action={() => {
              closeHandler;
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
              closeHandler;
              signIn("google", { callbackUrl: "/" });
            }}
            icon={faGoogle}
          />
          <SignInButton
            title="Twitter"
            link="/"
            action={() => {
              closeHandler;
              signIn("twitter", { callbackUrl: "/" });
            }}
            icon={faTwitter}
          />
          <SignInButton
            title="LinkedIn"
            link="/"
            action={() => {
              closeHandler;
              signIn("linkedin", { callbackUrl: "/" });
            }}
            icon={faLinkedin}
          />
          <SignInButton
            title="Facebook"
            link="/"
            action={() => {
              closeHandler;
              signIn("linkedin", { callbackUrl: "/" });
            }}
            icon={faFacebook}
          />
        </div>
      )}
    </motion.div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      SideDrawerContent,
      document.getElementById("mobile-menu-root") as HTMLElement
    );
  } else {
    return null;
  }
};

export default SideDrawer;
