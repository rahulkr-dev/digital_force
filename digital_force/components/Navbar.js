import styles from "../styles/Navbar.module.css";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className={styles.main_navbar}>
      <div className={styles.navbar_parent}>
        {/* Logo */}
        <div className={styles.navbar_logo}>
          <Link className={styles.logo_container} href="/">
            <img
              className={styles.logo_image}
              src="/digital_force_round.png"
              alt="Logo"
            />
            <p className={styles.logo}>DIGITAL FORCE</p>
          </Link>
        </div>

        {/* all routes */}
        <div className={styles.all_routes}>
          <Link href="/uploads">
            <p className={styles.routes}>UPLOAD IMAGE</p>
          </Link>

          <Link href="/signup">
            <p className={styles.routes}>SIGNUP</p>
          </Link>

          <Link href="/login">
            <p className={styles.routes}>LOGIN</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
