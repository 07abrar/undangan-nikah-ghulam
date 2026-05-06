import { useState } from "react";

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

const SAMPLE_RSVPS: RSVP[] = [
  {
    id: 1,
    name: "Ghulam",
    attending: AttendingStatus.HADIR,
    message: "Tes",
    created_at: "2026-04-15T10:30:00Z",
  },
  {
    id: 2,
    name: "Abrar",
    attending: AttendingStatus.MUNGKIN,
    message: "Tes",
    created_at: "2026-04-20T14:00:00Z",
  },
  {
    id: 3,
    name: "Yasmin",
    attending: AttendingStatus.TIDAK_HADIR,
    message: "123",
    created_at: "2026-04-22T09:15:00Z",
  },
];

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

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
}

function getAttendingLabel(status: AttendingStatus): string {
  switch (status) {
    case AttendingStatus.HADIR:
      return "Hadir";
    case AttendingStatus.TIDAK_HADIR:
      return "Tidak Hadir";
    case AttendingStatus.MUNGKIN:
      return "Mungkin";
  }
}

function getBadgeClass(status: AttendingStatus): string {
  switch (status) {
    case AttendingStatus.HADIR:
      return "badge-hadir";
    case AttendingStatus.TIDAK_HADIR:
      return "badge-tidak-hadir";
    case AttendingStatus.MUNGKIN:
      return "badge-mungkin";
  }
}

export default function RSVP() {
  const [rsvps, setRsvps] = useState<RSVP[]>(SAMPLE_RSVPS);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [attending, setAttending] = useState<AttendingStatus | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit() {
    if (!name) {
      setError("Nama wajib diisi");
      return;
    }
    setSubmitting(true);
    setError(null);

    const newRSVP: RSVP = {
      id: Date.now(),
      name,
      attending,
      message,
      created_at: new Date().toISOString(),
    };
    setRsvps([...rsvps, newRSVP]);
    setName("");
    setAttending(null);
    setMessage(null);
    setSubmitting(false);
  }

  return (
    <div className="section-form">
      <h2 className="section-title text-center">RSVP</h2>
      <p className="section-subtitle text-center">
        Konfirmasi Kehadiran & Ucapan
      </p>

      <div className="form-stack">
        <label className="field">
          Nama
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama"
            className="input"
          />
        </label>

        <label className="field">
          Kehadiran
          <select
            value={attending ?? ""}
            onChange={(e) =>
              setAttending((e.target.value || null) as AttendingStatus | null)
            }
            className="select"
          >
            <option value="">Kehadiran</option>
            <option value={AttendingStatus.HADIR}>Hadir</option>
            <option value={AttendingStatus.TIDAK_HADIR}>Tidak Hadir</option>
            <option value={AttendingStatus.MUNGKIN}>Mungkin</option>
          </select>
        </label>

        <label className="field">
          Komentar atau Ucapan
          <textarea
            value={message ?? ""}
            onChange={(e) => setMessage(e.target.value || null)}
            placeholder="Komentar atau Ucapan"
            rows={4}
            className="textarea"
          />
        </label>

        <button onClick={handleSubmit} disabled={submitting} className="button button-gold">
          {submitting ? "Mengirim..." : "Kirim"}
        </button>

        {error && <p className="form-error">{error}</p>}
      </div>

      <div className="rsvp-feed">
        {rsvps.map((rsvp) => (
          <div key={rsvp.id} className="rsvp-item">
            <div
              className="avatar"
              style={{ background: getAvatarColor(rsvp.name) }}
            >
              {getInitials(rsvp.name)}
            </div>

            <div className="rsvp-item-content">
              <div className="rsvp-item-header">
                <strong>{rsvp.name}</strong>
                {rsvp.attending && (
                  <span className={`badge ${getBadgeClass(rsvp.attending)}`}>
                    {getAttendingLabel(rsvp.attending)}
                  </span>
                )}
              </div>
              {rsvp.message && <p className="rsvp-message">{rsvp.message}</p>}
              <p className="rsvp-date">
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
