import { useEffect, useState } from "react";
import styles from "./EventDetails.module.css";

// Wedding moment — kept in UTC for now since the whole stack is UTC.
// Note: month is 0-indexed in Date.UTC, so 6 = July.
const TARGET_MS = Date.UTC(2026, 6, 4, 9, 0, 0);

const VENUE_NAME = "Nanik Convention Hall";
const VENUE_ADDRESS =
  "W Trans - Sumatra Hwy, Simpang Rima, Peukan Bada, Aceh Besar Regency, Aceh 23232, Indonesia";
const MAPS_URL = "https://maps.app.goo.gl/vACDFoc9peSG18bL8";

// Build the Google Calendar "add event" URL once at module load.
// URLSearchParams handles encoding spaces, ampersands, etc. automatically.
const CALENDAR_URL = (() => {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: "Pernikahan Yasmin & Ghulam Abrar",
    // Google Calendar format: YYYYMMDDTHHMMSSZ/YYYYMMDDTHHMMSSZ (UTC)
    // Spans 09:00–15:00 to cover both akad and resepsi.
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
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
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
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>Akad Nikah dan Resepsi</h2>
        <p className={styles.subtitle}>Sabtu, 4 Juli 2026</p>
        <hr className={styles.divider} />

        <div className={styles.countdown}>
          <CountdownBox value={timeLeft.days} label="Hari" />
          <CountdownBox value={timeLeft.hours} label="Jam" />
          <CountdownBox value={timeLeft.minutes} label="Menit" />
          <CountdownBox value={timeLeft.seconds} label="Detik" />
        </div>

        <a
          href={CALENDAR_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.calendarButton}
        >
          + Tambah ke Kalender
        </a>

        <div className={styles.venueCard}>
          <h3 className={styles.venueName}>{VENUE_NAME}</h3>
          <p className={styles.venueAddress}>{VENUE_ADDRESS}</p>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mapsButton}
          >
            Buka Maps
          </a>
        </div>

        <div className={styles.scheduleGrid}>
          <div className={styles.scheduleCard}>
            <h3 className={styles.scheduleEvent}>Akad Nikah</h3>
            <p className={styles.scheduleTime}>Pukul 09.00 WIB</p>
          </div>
          <div className={styles.scheduleCard}>
            <h3 className={styles.scheduleEvent}>Resepsi</h3>
            <p className={styles.scheduleTime}>Pukul 11.00 WIB s/d selesai</p>
          </div>
        </div>
      </div>
    </>
  );
}

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div className={styles.countdownBox}>
      <span className={styles.countdownNumber}>
        {value.toString().padStart(2, "0")}
      </span>
      <span className={styles.countdownLabel}>{label}</span>
    </div>
  );
}
