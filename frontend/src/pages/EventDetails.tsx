import { useEffect, useState } from "react";

const TARGET_MS = Date.UTC(2026, 6, 4, 9, 0, 0);

const VENUE_NAME = "Nanik Convention Hall";
const VENUE_ADDRESS =
  "W Trans - Sumatra Hwy, Simpang Rima, Peukan Bada, Aceh Besar Regency, Aceh 23232, Indonesia";
const MAPS_URL = "https://maps.app.goo.gl/vACDFoc9peSG18bL8";

const CALENDAR_URL = (() => {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: "Pernikahan Yasmin & Ghulam Abrar",
    dates: "20260704T090000Z/20260704T150000Z",
    details: "Akad Nikah pukul 09.00 WIB\nResepsi pukul 11.00 WIB s/d selesai",
    location: `${VENUE_NAME}, ${VENUE_ADDRESS}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
})();

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calculateTimeLeft(): TimeLeft {
  const diff = TARGET_MS - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function EventDetails() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="section-body">
      <h2 className="section-title">Akad Nikah dan Resepsi</h2>
      <p className="section-subtitle">Sabtu, 4 Juli 2026</p>
      <hr
        className="divider"
        style={{ marginBottom: "var(--space-xl)" }}
      />

      <div className="countdown-grid">
        <CountdownBox value={timeLeft.days} label="Hari" />
        <CountdownBox value={timeLeft.hours} label="Jam" />
        <CountdownBox value={timeLeft.minutes} label="Menit" />
        <CountdownBox value={timeLeft.seconds} label="Detik" />
      </div>

      <a
        href={CALENDAR_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="button"
        style={{ marginBottom: "var(--space-xl)" }}
      >
        + Tambah ke Kalender
      </a>

      <div className="card venue-card">
        <h3 className="venue-name">{VENUE_NAME}</h3>
        <p className="venue-address">{VENUE_ADDRESS}</p>
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="button button-outline"
        >
          Buka Maps
        </a>
      </div>

      <div className="schedule-grid">
        <div className="card card-snug">
          <h3 className="schedule-event">Akad Nikah</h3>
          <p className="schedule-time">Pukul 09.00 WIB</p>
        </div>
        <div className="card card-snug">
          <h3 className="schedule-event">Resepsi</h3>
          <p className="schedule-time">Pukul 11.00 WIB s/d selesai</p>
        </div>
      </div>
    </div>
  );
}

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="card card-tight countdown-box">
      <span className="countdown-number">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="plain-capital-text">{label}</span>
    </div>
  );
}
