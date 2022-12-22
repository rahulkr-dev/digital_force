import Link from "next/link";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import styles from "../../styles/Contact.module.css";

const developers = [
  {
    image: "https://avatars.githubusercontent.com/u/103665864?v=4",
    name: "Abhijit Biswas",
    github: "https://github.com/abhijitnr",
    linkedin: "https://www.linkedin.com/in/abhijit-biswas-3b6586162/",
    portfolio: "https://abhijitnr.github.io/",
  },
  {
    image: "https://avatars.githubusercontent.com/u/102371010?v=4",
    name: "Gowtham Chokkalingam",
    github: "https://github.com/Gowtham-Chokkalingam",
    linkedin: "https://www.linkedin.com/in/gowthamchokkalingam/",
    portfolio: "https://gowtham-chokkalingam.github.io/",
  },
  {
    image: "https://avatars.githubusercontent.com/u/103633895?v=4",
    name: "Rahul Kumar",
    github: "https://github.com/rahulkr-dev",
    linkedin: "https://www.linkedin.com/in/rahul-kumar-850b39232/",
    portfolio: "https://rahulkr-dev.github.io/",
  },
  {
    image: "https://avatars.githubusercontent.com/u/85919490?v=4",
    name: "Venketesh",
    github: "https://github.com/VenketeshRushi",
    linkedin: "https://www.linkedin.com/in/venketesh-rushi-423722236/",
    portfolio: "https://venketeshrushi.github.io/Portfolio/",
  },
];

const contact = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar />
      {/* Contact Page */}
      <h2 className={styles.digital_tag}>Digital Force developers</h2>

      <div className={styles.contact_container}>
        {developers.map((item) => (
          <div className={styles.profile_container}>
            <img className={styles.avater} src={item.image} />

            <p className={styles.avater_name}>{item.name}</p>

            <div className={styles.link_container}>
              <Link href={item.github} target="_blank">
                <img
                  className={styles.profile_icon}
                  src="/github.png"
                  alt={item.name}
                />
              </Link>

              <Link href={item.linkedin} target="_blank">
                <img
                  className={styles.profile_icon}
                  src="/linkedin.png"
                  alt={item.name}
                />
              </Link>

              <Link href={item.portfolio} target="_blank">
                <img
                  className={styles.profile_icon}
                  src="/portfolio.webp"
                  alt={item.name}
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
};

export default contact;
