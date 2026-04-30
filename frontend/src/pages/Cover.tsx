import { useEffect, useState } from "react";

const FALLBACK_NAME = "Tamu Undangan";

type Props = {
  onOpen?: () => void;
};

export default function Cover({ onOpen }: Props) {
  const [guestName, setGuestName] = useState(FALLBACK_NAME);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("to");
    if (name) setGuestName(name);
  }, []);

  return (
    <div className="section-cover">
      <div className="cover-top">
        <p className="plain-capital-text">Pernikahan</p>

        <h1 className="couple-names">
          <span className="couple-name-cover">Yasmin</span>
          <span className="couple-ampersand">&amp;</span>
          <span className="couple-name-cover">Ghulam Abrar</span>
        </h1>

        <p className="event-date-cover">4 Juli 2026</p>
      </div>

      <div className="cover-bottom">
        <div className="invited-guest">
          <p className="plain-capital-text">Kepada Yth.</p>
          <p className="invited-guest-name">{guestName}</p>
        </div>

        {onOpen && (
          <button type="button" className="button" onClick={onOpen}>
            Buka Undangan
          </button>
        )}
      </div>
    </div>
  );
}
