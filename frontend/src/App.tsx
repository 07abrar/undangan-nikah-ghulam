import { useEffect, useState } from "react";

import CoupleProfile from "./pages/CoupleProfile";
import Cover from "./pages/Cover";
import EventDetails from "./pages/EventDetails";
import RSVP from "./pages/RSVP";
import Story from "./pages/Story";
import Quote from "./pages/Quote";

const SECTION_IDS = [
  "cover",
  "quote",
  "couple_profile",
  "event_details",
  "story",
  "rsvp",
] as const;
type SectionId = (typeof SECTION_IDS)[number];

const NAV_ITEMS: { id: SectionId; icon: string; label: string }[] = [
  { id: "cover", icon: "assets/icon/cover.svg", label: "Cover" },
  { id: "quote", icon: "assets/icon/quote.svg", label: "Quote" },
  { id: "couple_profile", icon: "assets/icon/calon_mempelai.svg", label: "Calon Mempelai" },
  { id: "event_details", icon: "assets/icon/detail_acara.svg", label: "Detail Acara" },
  { id: "story", icon: "assets/icon/kisah.svg", label: "Kisah" },
  { id: "rsvp", icon: "assets/icon/rsvp.svg", label: "RSVP" },
];

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("cover");

  useEffect(() => {
    if (!isOpen) return;
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
  }, [isOpen]);

  const handleOpen = () => setIsOpen(true);

  if (!isOpen) {
    return <Cover onOpen={handleOpen} />;
  }

  return (
    <div className="app-shell">
      <nav className="floating-nav">
        {NAV_ITEMS.map(({ id, icon, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`nav-link${activeSection === id ? " is-active" : ""}`}
            title={label}
          >
            <img src={`${import.meta.env.BASE_URL}${icon}`} alt={label} />
          </a>
        ))}
      </nav>

      <main>
        <section id="cover" className="section">
          <Cover />
        </section>
        <section id="quote" className="section">
          <Quote />
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
