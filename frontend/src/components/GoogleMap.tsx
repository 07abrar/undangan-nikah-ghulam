const VENUE_LAT = 5.5226955;
const VENUE_LNG = 95.2735277;
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
