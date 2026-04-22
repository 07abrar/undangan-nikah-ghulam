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
  attending: AttendingStatus;
  created_at: string;
};

export default function RSVP() {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [attending, setAttending] = useState<AttendingStatus | "">("");

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
    try {
      const response = await fetch("/api/rsvp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, attending }),
      });

      const newRSVP = await response.json();
      setRsvps([...rsvps, newRSVP]);
      setName("");
      setAttending("");
    } catch (error) {
      setError((error as Error).message);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>RSVPs</h2>
      <ul>
        {rsvps.map((rsvp) => (
          <li key={rsvp.id}>
            <strong>{rsvp.name}</strong>: {rsvp.attending}{" "}
            <em>({new Date(rsvp.created_at).toLocaleString()})</em>
          </li>
        ))}
      </ul>
      <h2>Submit an RSVP</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nama"
      />
      <label htmlFor="attending">Kehadiran</label>
      <select
        id="attending"
        value={attending}
        onChange={(e) => setAttending(e.target.value as AttendingStatus | "")}
      >
        <option value="">Pilih kehadiran</option>
        <option value={AttendingStatus.HADIR}>Hadir</option>
        <option value={AttendingStatus.TIDAK_HADIR}>Tidak Hadir</option>
        <option value={AttendingStatus.MUNGKIN}>Mungkin</option>
      </select>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
