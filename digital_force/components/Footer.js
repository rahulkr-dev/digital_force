import styles from "../styles/Footer.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footer_container}>
        {/* Social Media */}
        <div className={styles.social_media}>
          <p className={styles.social_name}>Follow us on</p>
          <div className={styles.social_icon}>
            <Link
              href="https://www.linkedin.com/in/abhijit-biswas-3b6586162/"
              target="_blank"
            >
              <img
                className={styles.icons}
                src="/linkedin.png"
                alt="LinkedIn"
              />
            </Link>

            <Link href="https://github.com/abhijitnr" target="_blank">
              <img className={styles.icons} src="/github.png" alt="GitHub" />
            </Link>

            <Link
              href="https://www.instagram.com/abhijit.gyans/"
              target="_blank"
            >
              <img
                className={styles.icons}
                src="/instagram.png"
                alt="Instagram"
              />
            </Link>

            <Link href="https://www.youtube.com/@GYANSforGYANI" target="_blank">
              <img className={styles.icons} src="/youtube.png" alt="YouTube" />
            </Link>
          </div>
        </div>

        {/* Contact Us and About Us */}
        <div className={styles.contact_about}>
          <Link href="/about">
            <p className={styles.info}>About Us</p>
          </Link>

          <Link href="/contact">
            <p className={styles.info}>Contact Us</p>
          </Link>
        </div>

        {/* Copyrights */}
        <div className={styles.copyrights}>
          <p className={styles.copy_text}>
            Designed and Developed by Digital Force, © Copyright 2023. All
            rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
