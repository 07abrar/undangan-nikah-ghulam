import { useEffect, useState } from "react";

const FALLBACK_NAME = "Tamu Undangan";

export default function Cover() {
  const [guestName, setGuestName] = useState(FALLBACK_NAME);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("to");
    if (!token) return;

    const controller = new AbortController();
    fetch(`/api/guests/${encodeURIComponent(token)}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Guest not found");
        return res.json();
      })
      .then((data) => setGuestName(data.name))
      .catch((err) => {
        if (err.name === "AbortError") return;
      });

    return () => controller.abort();
  }, []);

  return (
    <div className="section-cover">
      <p className="plain-capital-text">Pernikahan</p>

      <h1 className="couple-names">
        <span className="couple-name-cover">Yasmin</span>
        <span className="couple-ampersand">&amp;</span>
        <span className="couple-name-cover">Ghulam Abrar</span>
      </h1>

      <p className="event-date-cover">4 Juli 2026</p>

      <div className="invited-guest">
        <p className="plain-capital-text">Kepada Yth.</p>
        <p className="invited-guest-name">{guestName}</p>
      </div>

      <button type="button" className="button">
        Buka Undangan
      </button>
    </div>
  );
}
