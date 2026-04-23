import { useState, useEffect } from "react";

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

// Helper: pick an avatar color based on name (stable per person)
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

// Helper: format attendance label
function getAttendingLabel(status: AttendingStatus): string {
  const labels = {
    [AttendingStatus.HADIR]: "Hadir",
    [AttendingStatus.TIDAK_HADIR]: "Tidak Hadir",
    [AttendingStatus.MUNGKIN]: "Mungkin",
  };
  return labels[status];
}

// Helper: badge colors for each status
function getBadgeStyle(status: AttendingStatus): React.CSSProperties {
  const styles = {
    [AttendingStatus.HADIR]: { background: "#E8F5E9", color: "#2E7D32" },
    [AttendingStatus.TIDAK_HADIR]: { background: "#E1F5FE", color: "#0277BD" },
    [AttendingStatus.MUNGKIN]: { background: "#FFF3E0", color: "#E65100" },
  };
  return styles[status];
}

export default function RSVP() {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [attending, setAttending] = useState<AttendingStatus | null>(null);

  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch RSVPs
  useEffect(() => {
    fetch("/api/rsvp/")
      .then((response) => response.json())
      .then((data) => {
        setRsvps(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Submit RSVPs
  async function handleSubmit() {
    if (!name) {
      setError("Nama wajib diisi");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/rsvp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          attending: attending || null,
          message: message || null,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit");

      const newRSVP = await response.json();
      setRsvps([...rsvps, newRSVP]);
      setName("");
      setAttending(null);
      setMessage(null);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: 20 }}>
      <h2 style={{ textAlign: "center", fontFamily: "serif" }}>RSVP</h2>
      <p style={{ textAlign: "center", fontFamily: "serif", marginBottom: 24 }}>
        Konfirmasi Kehadiran & Ucapan
      </p>

      {/* Form */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <label>
          Nama
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama"
            style={{
              width: "100%",
              padding: 10,
              marginTop: 4,
              borderRadius: 6,
              border: "1px solid #ddd",
            }}
          />
        </label>

        <label>
          Kehadiran
          <select
            value={attending ?? ""}
            onChange={(e) =>
              setAttending(e.target.value as AttendingStatus | null)
            }
            style={{
              width: "100%",
              padding: 10,
              marginTop: 4,
              borderRadius: 6,
              border: "1px solid #ddd",
            }}
          >
            <option value="">Kehadiran</option>
            <option value={AttendingStatus.HADIR}>Hadir</option>
            <option value={AttendingStatus.TIDAK_HADIR}>Tidak Hadir</option>
            <option value={AttendingStatus.MUNGKIN}>Mungkin</option>
          </select>
        </label>

        <label>
          Komentar atau Ucapan
          <textarea
            value={message ?? ""}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Komentar atau Ucapan"
            rows={4}
            style={{
              width: "100%",
              padding: 10,
              marginTop: 4,
              borderRadius: 6,
              border: "1px solid #ddd",
              resize: "vertical",
            }}
          />
        </label>

        <button
          onClick={handleSubmit}
          disabled={submitting}
          style={{
            padding: 12,
            background: "#6B4E3D",
            color: "white",
            border: "none",
            borderRadius: 24,
            fontSize: 16,
            cursor: submitting ? "not-allowed" : "pointer",
            opacity: submitting ? 0.6 : 1,
          }}
        >
          {submitting ? "Mengirim..." : "Kirim"}
        </button>

        {error && <p style={{ color: "red", fontSize: 14 }}>{error}</p>}
      </div>

      {/* List of submissions */}
      <div
        style={{ marginTop: 32, borderTop: "1px solid #eee", paddingTop: 24 }}
      >
        {loading ? (
          <p>Loading...</p>
        ) : (
          rsvps.map((rsvp) => (
            <div
              key={rsvp.id}
              style={{
                display: "flex",
                gap: 12,
                marginBottom: 20,
                padding: 12,
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: getAvatarColor(rsvp.name),
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: 14,
                  flexShrink: 0,
                }}
              >
                {rsvp.name}
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 4,
                  }}
                >
                  <strong>{rsvp.name}</strong>
                  {rsvp.attending && (
                    <span
                      style={{
                        ...getBadgeStyle(rsvp.attending),
                        padding: "2px 8px",
                        borderRadius: 4,
                        fontSize: 12,
                      }}
                    >
                      {getAttendingLabel(rsvp.attending)}
                    </span>
                  )}
                </div>
                {rsvp.message && (
                  <p style={{ margin: "4px 0", fontSize: 14 }}>
                    {rsvp.message}
                  </p>
                )}
                <p style={{ margin: 0, fontSize: 12, color: "#888" }}>
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
          ))
        )}
      </div>
    </div>
  );
}
