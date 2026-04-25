import styles from "./Cover.module.css";

// TODO: fetch the guest name from the backend later
// (e.g. read a token from the URL like ?to=abc123, then GET /api/guests/abc123)
const guestName = "Tamu Undangan";

export default function Cover() {
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
