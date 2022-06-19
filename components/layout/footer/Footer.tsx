import styles from "./Footer.module.css";

const Footer = () => {
  //create dynamic year the developer does not need to update the copy right year every year
  const currentTime = new Date(Date.now());
  const currentYear = currentTime.getFullYear();

  return (
    <div className={styles.container}>
      <div>&copy; {currentYear}</div>
      <p>
        made with ❤️ by{" "}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://vidaldevelopers.com"
        >
          Vidal Developers
        </a>
      </p>
    </div>
  );
};

export default Footer;
