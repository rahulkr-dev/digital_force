import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const userExist = user.userExists;
    setUser(userExist);
    // console.log(userExist);
  }, []);
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
          <Link href="/uploadimg">
            <p className={styles.routes}>UPLOAD IMAGE</p>
          </Link>

          <Link href="/signup">
            <p className={styles.routes}>{user ? "CHAT" : "SIGNUP"}</p>
          </Link>

          <Link href="/login">
            <p className={styles.routes}>{user ? "LOGOUT" : "LOGIN"}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
