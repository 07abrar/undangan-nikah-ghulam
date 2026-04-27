import { useEffect, useState } from "react";

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

const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: "cover", label: "Cover" },
  { id: "quote", label: "Quote" },
  { id: "greetings", label: "Salam" },
  { id: "couple_profile", label: "Calon Mempelai" },
  { id: "event_details", label: "Detail Acara" },
  { id: "story", label: "Kisah" },
  { id: "rsvp", label: "RSVP" },
];

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>("cover");

  useEffect(() => {
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

  return (
    <div className="app-shell">
      <header className="app-header">
        <nav className="app-nav">
          {NAV_ITEMS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`nav-link${activeSection === id ? " is-active" : ""}`}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section id="cover" className="section">
          <Cover />
        </section>
        <section id="quote" className="section">
          <Quote />
        </section>
        <section id="greetings" className="section">
          <Greetings />
        </section>
        <section id="couple_profile" className="section">
          <CoupleProfile />
        </section>
        <section id="event_details" className="section">
          <EventDetails />
        </section>
        <section id="story" className="section">
          <Story />
        </section>
        <section id="rsvp" className="section">
          <RSVP />
        </section>
      </main>
    </div>
  );
}

export default App;
