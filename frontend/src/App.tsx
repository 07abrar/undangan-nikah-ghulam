import styles from "./App.module.css";
import CoupleProfile from "./pages/CoupleProfile";
import Cover from "./pages/Cover";
import RSVP from "./pages/RSVP";
import Quote from "./pages/Quote";

function App() {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <h1 className={styles.title}>Ghulam & Yasmin</h1>
      </header>

      <nav className={styles.nav}>
        <a href="#cover" className={styles.navLink}>
          Cover
        </a>
        <a href="#quote" className={styles.navLink}>
          Quote
        </a>
        <a href="#couple_profile" className={styles.navLink}>
          Calon Mempelai
        </a>
        <a href="#rsvp" className={styles.navLink}>
          RSVP
        </a>
      </nav>

      <section id="cover" className={styles.section}>
        <Cover />
      </section>
      <section id="quote" className={styles.section}>
        <Quote />
      </section>
      <section id="couple_profile" className={styles.section}>
        <CoupleProfile />
      </section>
      <section id="rsvp" className={styles.section}>
        <RSVP />
      </section>
    </div>
  );
}

export default App;
