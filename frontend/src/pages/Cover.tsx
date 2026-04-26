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
    <div className="section-hero">
      <p className="eyebrow">Pernikahan</p>

      <h1 className="hero-names">
        <span className="hero-name">Yasmin</span>
        <span className="hero-ampersand">&amp;</span>
        <span className="hero-name">Ghulam Abrar</span>
      </h1>

      <p className="hero-date">4 Juli 2026</p>

      <div className="hero-guest">
        <p className="eyebrow">Kepada Yth.</p>
        <p className="hero-guest-name">{guestName}</p>
      </div>

      <button type="button" className="button">
        Buka Undangan
      </button>
    </div>
  );
}
