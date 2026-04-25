// App.tsx
import CoupleProfile from "./pages/CoupleProfile";
import RSVP from "./pages/RSVP";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <h1 className={styles.title}>Ghulam & Yasmin</h1>
      </header>

      <nav className={styles.nav}>
        <a href="#couple_profile" className={styles.navLink}>
          Calon Mempelai
        </a>
        <a href="#rsvp" className={styles.navLink}>
          RSVP
        </a>
      </nav>

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
