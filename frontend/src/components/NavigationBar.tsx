type SectionId =
  | "cover"
  | "quote"
  | "couple_profile"
  | "event_details"
  | "story"
  | "rsvp";

const NAV_ITEMS: { id: SectionId; icon: string; label: string }[] = [
  { id: "cover", icon: "assets/icon/cover.svg", label: "Cover" },
  { id: "quote", icon: "assets/icon/quote.svg", label: "Quote" },
  {
    id: "couple_profile",
    icon: "assets/icon/calon_mempelai.svg",
    label: "Calon Mempelai",
  },
  {
    id: "event_details",
    icon: "assets/icon/detail_acara.svg",
    label: "Detail Acara",
  },
  { id: "story", icon: "assets/icon/kisah.svg", label: "Kisah" },
  { id: "rsvp", icon: "assets/icon/rsvp.svg", label: "RSVP" },
];

interface NavigationBarProps {
  activeSection: SectionId;
}

function NavigationBar({ activeSection }: NavigationBarProps) {
  return (
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
  );
}

export default NavigationBar;
