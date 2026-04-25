// RSVP.tsx
import { useState, useEffect } from "react";
import styles from "./RSVP.module.css";

const AttendingStatus = {
  HADIR: "hadir",
  TIDAK_HADIR: "tidak_hadir",
  MUNGKIN: "mungkin",
} as const;

type AttendingStatus = (typeof AttendingStatus)[keyof typeof AttendingStatus];

type RSVP = {
  id: number;
  name: string;
  attending: AttendingStatus | null;
  message: string | null;
  created_at: string;
};

// Helper: stable avatar color per person (dynamic value — stays inline)
function getAvatarColor(name: string): string {
  const colors = [
    "#E91E63",
    "#4CAF50",
    "#2196F3",
    "#FF9800",
    "#9C27B0",
    "#00BCD4",
  ];
  const hash = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return colors[hash % colors.length];
}

// Helper: first letter(s) for the avatar circle
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const second = parts[1]?.[0] ?? "";
  return (first + second).toUpperCase();
}

function getAttendingLabel(status: AttendingStatus): string {
  return {
    [AttendingStatus.HADIR]: "Hadir",
    [AttendingStatus.TIDAK_HADIR]: "Tidak Hadir",
    [AttendingStatus.MUNGKIN]: "Mungkin",
  }[status];
}

// Returns the right CSS Module class name for each status
function getBadgeClass(status: AttendingStatus): string {
  return {
    [AttendingStatus.HADIR]: styles.badgeHadir,
    [AttendingStatus.TIDAK_HADIR]: styles.badgeTidakHadir,
    [AttendingStatus.MUNGKIN]: styles.badgeMungkin,
  }[status];
}

export default function RSVP() {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [attending, setAttending] = useState<AttendingStatus | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/rsvp/")
      .then((res) => res.json())
      .then((data) => {
        setRsvps(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  async function handleSubmit() {
    if (!name) {
      setError("Nama wajib diisi");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/rsvp/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          attending: attending || null,
          message: message || null,
        }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      const newRSVP = await res.json();
      setRsvps([...rsvps, newRSVP]);
      setName("");
      setAttending(null);
      setMessage(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>RSVP</h2>
      <p className={styles.subtitle}>Konfirmasi Kehadiran & Ucapan</p>

      <div className={styles.form}>
        <label className={styles.field}>
          Nama
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama"
            className={styles.input}
          />
        </label>

        <label className={styles.field}>
          Kehadiran
          <select
            value={attending ?? ""}
            onChange={(e) =>
              setAttending((e.target.value || null) as AttendingStatus | null)
            }
            className={styles.select}
          >
            <option value="">Kehadiran</option>
            <option value={AttendingStatus.HADIR}>Hadir</option>
            <option value={AttendingStatus.TIDAK_HADIR}>Tidak Hadir</option>
            <option value={AttendingStatus.MUNGKIN}>Mungkin</option>
          </select>
        </label>

        <label className={styles.field}>
          Komentar atau Ucapan
          <textarea
            value={message ?? ""}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Komentar atau Ucapan"
            rows={4}
            className={styles.textarea}
          />
        </label>

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className={styles.submit}
        >
          {submitting ? "Mengirim..." : "Kirim"}
        </button>

        {error && <p className={styles.error}>{error}</p>}
      </div>

      <div className={styles.divider}>
        {rsvps.map((rsvp) => (
          <div key={rsvp.id} className={styles.item}>
            <div
              className={styles.avatar}
              style={{ background: getAvatarColor(rsvp.name) }}
            >
              {getInitials(rsvp.name)}
            </div>

            <div className={styles.content}>
              <div className={styles.itemHeader}>
                <strong>{rsvp.name}</strong>
                {rsvp.attending && (
                  <span
                    className={`${styles.badge} ${getBadgeClass(rsvp.attending)}`}
                  >
                    {getAttendingLabel(rsvp.attending)}
                  </span>
                )}
              </div>
              {rsvp.message && <p className={styles.message}>{rsvp.message}</p>}
              <p className={styles.date}>
                {new Date(rsvp.created_at).toLocaleString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
