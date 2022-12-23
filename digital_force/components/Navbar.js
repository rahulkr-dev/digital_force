import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { deleteCookie } from "cookies-next";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      setUser(user.userExists);
    }
    // console.log(userExist);
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("userInfo");
    setUser(null);
    deleteCookie("userInfo");
  };
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

          {user ? (
            <Link href="/chat">
              <p className={styles.routes}>CHAT</p>
            </Link>
          ) : (
            <Link href="/signup">
              {" "}
              <p className={styles.routes}>SIGNUP</p>
            </Link>
          )}

          <Link href="/login">
            {user ? (
              <p className={styles.routes} onClick={handleLogout}>
                LOGOUT
              </p>
            ) : (
              <p className={styles.routes}>LOGIN</p>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
