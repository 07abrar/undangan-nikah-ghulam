import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { FALLBACK_GUEST_NAME } from "../const";

type Props = {
  onOpen?: () => void;
};

export default function Cover({ onOpen }: Props) {
  const [guestName, setGuestName] = useState(FALLBACK_GUEST_NAME);

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
      <div className="cover-top">
        <p className="plain-capital-text">Pernikahan</p>

        <h1 className="couple-names">
          <p className="couple-name-cover">Ghulam Abrar</p>
          <p className="couple-ampersand">&amp;</p>
          <p className="couple-name-cover">Yasmin</p>
        </h1>

        <p className="event-date-cover">4 Juli 2026</p>
      </div>

      <div className="cover-bottom">
        <div className="invited-guest">
          <p className="plain-capital-text">Kepada Yth.</p>
          <p className="invited-guest-name">{guestName}</p>
        </div>

        {onOpen && <Button onClick={onOpen}>Buka Undangan</Button>}
      </div>
    </div>
  );
}
