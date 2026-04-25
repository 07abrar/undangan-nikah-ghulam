import { useEffect, useState } from "react";
import styles from "./Cover.module.css";

const FALLBACK_NAME = "Tamu Undangan";

export default function Cover() {
  const [guestName, setGuestName] = useState(FALLBACK_NAME);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("to");

    if (!token) return;

    fetch(`/api/guests/${token}`)
      .then((res) => {
        if (!res.ok) throw new Error("Guest not found");
        return res.json();
      })
      .then((data) => setGuestName(data.name))
      .catch(() => {
        // invalid token → keep fallback
      });
  }, []);

  return (
    <div className={styles.container}>
      <p className={styles.eyebrow}>Pernikahan</p>

      <h1 className={styles.names}>
        <span className={styles.name}>Yasmin</span>
        <span className={styles.ampersand}>&amp;</span>
        <span className={styles.name}>Ghulam Abrar</span>
      </h1>

      <p className={styles.date}>4 Juli 2026</p>

      <div className={styles.guest}>
        <p className={styles.guestLabel}>Kepada Yth.</p>
        <p className={styles.guestName}>{guestName}</p>
      </div>

      <button type="button" className={styles.button}>
        Buka Undangan
      </button>
    </div>
  );
}
