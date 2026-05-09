import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { CountdownBox } from "../components/CountdownBox";
import { GoogleMap } from "../components/GoogleMap";
import { TARGET_MS, VENUE_NAME, VENUE_ADDRESS, MAPS_URL, CALENDAR_URL } from "../const";

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
      <hr className="divider" />

      <div className="countdown-section">
        <div className="countdown-grid">
          <CountdownBox value={timeLeft.days} label="Hari" />
          <CountdownBox value={timeLeft.hours} label="Jam" />
          <CountdownBox value={timeLeft.minutes} label="Menit" />
          <CountdownBox value={timeLeft.seconds} label="Detik" />
        </div>

        <Button href={CALENDAR_URL} className="button-gold">
          Tambah ke Kalender
        </Button>
      </div>

      <div className="card venue-card">
        <h3 className="venue-name">{VENUE_NAME}</h3>
        <GoogleMap />
        <p className="venue-address">{VENUE_ADDRESS}</p>
        <Button href={MAPS_URL} className="button-gold">
          Buka Maps
        </Button>
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
