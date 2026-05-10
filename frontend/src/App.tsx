import { useEffect, useRef, useState } from "react";

import MusicPlayer from "./components/MusicPlayer";
import NavigationBar from "./components/NavigationBar";
import CoupleProfile from "./pages/CoupleProfile";
import Cover from "./pages/Cover";
import EventDetails from "./pages/EventDetails";
import Footer from "./pages/Footer";
import Quote from "./pages/Quote";
import RSVP from "./pages/RSVP";
import Story from "./pages/Story";
import Thanks from "./pages/Thanks";

const SECTION_IDS = [
  "cover",
  "quote",
  "couple_profile",
  "event_details",
  "story",
  "rsvp",
  "thanks",
] as const;
type SectionId = (typeof SECTION_IDS)[number];

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("cover");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

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

  const handleOpen = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}assets/music/a_town_with_an_ocean_free.mp3`}
        loop
        preload="auto"
      />
      {!isOpen ? (
        <Cover onOpen={handleOpen} />
      ) : (
        <div className="app-shell">
          <div className="floating-nav-group">
            <NavigationBar activeSection={activeSection} />
            <MusicPlayer isPlaying={isPlaying} onToggle={toggleMusic} />
          </div>

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
            <section id="thanks" className="section">
              <Thanks />
            </section>
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
