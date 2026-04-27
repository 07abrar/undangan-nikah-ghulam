type StoryEvent = {
  date: string;
  description: string;
};

const TIMELINE: StoryEvent[] = [
  {
    date: "16 Mei 2025",
    description: "Kami bertukar CV melalui masing-masing teman kami.",
  },
  {
    date: "31 Mei 2025",
    description: "Orangtua Ghulam Abrar bersilaturahmi ke rumah Yasmin.",
  },
  {
    date: "1 Juni 2025",
    description:
      "Taaruf pertama kami via jarak jauh. Di bulan ini juga kami memutuskan untuk lanjut ke khitbah.",
  },
  {
    date: "11 Oktober 2025",
    description: "Hari pertama kami bertemu secara langsung.",
  },
  {
    date: "17 Oktober 2025",
    description: "Dengan izin Allah, kami melaksanakan khitbah.",
  },
  {
    date: "18 Oktober 2025",
    description: "Taaruf terakhir kami di rumah Yasmin.",
  },
  { date: "4 Juli 2026", description: "Kami akan menikah, insyaallah." },
];

export default function Story() {
  return (
    <div className="section-body">
      <h2 className="section-title">Sebuah Kisah Singkat</h2>
      <hr
        className="divider"
        style={{ marginBottom: "var(--space-xl)" }}
      />

      <ol className="timeline">
        {TIMELINE.map((event, index) => {
          const isFinal = index === TIMELINE.length - 1;
          const entryClass = `timeline-entry${isFinal ? " timeline-entry-final" : ""}`;
          const markerClass = `timeline-marker${isFinal ? " timeline-marker-final" : ""}`;

          return (
            <li key={event.date} className={entryClass}>
              <span className={markerClass} aria-hidden="true">
                {isFinal ? "♥" : <span className="timeline-marker-dot" />}
              </span>
              <p className="timeline-date">{event.date}</p>
              <p className="timeline-description">{event.description}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
