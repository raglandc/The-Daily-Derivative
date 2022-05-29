import Link from "next/link";
//@ts-ignore
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <Link href="/">
      <div className={styles.logo}>
        <BlockMath math="\frac{daily}{dx}" />
      </div>
    </Link>
  );
};

export default Logo;
