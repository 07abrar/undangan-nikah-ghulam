import { useEffect, useState } from "react";

import styles from "./App.module.css";
import CoupleProfile from "./pages/CoupleProfile";
import Cover from "./pages/Cover";
import EventDetails from "./pages/EventDetails";
import Greetings from "./pages/Greetings";
import RSVP from "./pages/RSVP";
import Story from "./pages/Story";
import Quote from "./pages/Quote";

const SECTION_IDS = [
  "cover",
  "quote",
  "greetings",
  "couple_profile",
  "event_details",
  "story",
  "rsvp",
] as const;
type SectionId = (typeof SECTION_IDS)[number];

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>("cover");

  useEffect(() => {
    // rootMargin shrinks the observed viewport to a 0px-tall band at the
    // vertical center, so only the section crossing the middle of the screen
    // is "intersecting"
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    const elements = SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter((el): el is HTMLElement => el !== null);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  function navLinkClass(id: SectionId): string {
    return [styles.navLink, activeSection === id ? styles.navLinkActive : ""]
      .filter(Boolean)
      .join(" ");
  }

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <a href="#cover" className={styles.navLink}>
            Cover
          </a>
          <a href="#quote" className={styles.navLink}>
            Quote
          </a>
          <a href="#greetings" className={styles.navLink}>
            Salam
          </a>
          <a href="#couple_profile" className={styles.navLink}>
            Calon Mempelai
          </a>
          <a href="#event_details" className={styles.navLink}>
            Detail Acara
          </a>
          <a href="#story" className={styles.navLink}>
            Kisah
          </a>
          <a href="#rsvp" className={styles.navLink}>
            RSVP
          </a>
        </nav>
      </header>

      <main>
        <section id="cover" className={styles.section}>
          <Cover />
        </section>
        <section id="quote" className={styles.section}>
          <Quote />
        </section>
        <section id="greetings" className={styles.section}>
          <Greetings />
        </section>
        <section id="couple_profile" className={styles.section}>
          <CoupleProfile />
        </section>
        <section id="event_details" className={styles.section}>
          <EventDetails />
        </section>
        <section id="story" className={styles.section}>
          <Story />
        </section>
        <section id="rsvp" className={styles.section}>
          <RSVP />
        </section>
      </main>
    </div>
  );
}

export default App;
