import { FC } from "react";
import MainNavigation from "./navigation/MainNavigation";
import Footer from "./footer/Footer";

//styles
import styles from "./Layout.module.css";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: FC<LayoutProps> = (props) => {
  return (
    <>
      <MainNavigation />
      <main className={styles.main}>{props.children}</main>
      <Footer />
    </>
  );
};

export default Layout;
