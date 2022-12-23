import Link from "next/link";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import styles from "../../styles/About.module.css";

const about = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* About Us */}
      <div className={styles.about_us}>
        <h2 className={styles.about}>ABOUT US</h2>

        <p className={styles.about_para}>
          This website is designed to upload the user's image and save it in the
          cloud. You can see all images uploaded by other users and upload your
          own. You can also delete your images.
        </p>

        <p className={styles.about_para}>
          You can see all the images uploaded by other users without logging in.
          But if you want to upload an image in digital force website, you have
          to log in.
        </p>

        <p className={styles.about_para}>
          For more information, please{" "}
          <Link className={styles.contacts} href="/contact">
            contact us
          </Link>
          .
        </p>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default about;
