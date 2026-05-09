import { VENUE_LAT, VENUE_LNG } from "../const";

const MAP_EMBED_URL = `https://maps.google.com/maps?q=${VENUE_LAT},${VENUE_LNG}&z=17&output=embed`;

export function GoogleMap() {
  return (
    <iframe
      title="Lokasi Venue"
      className="venue-map"
      src={MAP_EMBED_URL}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
