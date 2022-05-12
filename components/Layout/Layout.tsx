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
    <div className={styles.layout}>
      <div className={styles.container}>
        <MainNavigation />
        <main className={styles.main}>{props.children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
