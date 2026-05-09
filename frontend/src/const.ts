export const FALLBACK_GUEST_NAME = "Tamu Undangan";

export const VENUE_NAME = "Nanik Convention Hall";
export const VENUE_ADDRESS =
  "W Trans - Sumatra Hwy, Simpang Rima, Peukan Bada, Aceh Besar Regency, Aceh 23232, Indonesia";
export const MAPS_URL = "https://maps.app.goo.gl/vACDFoc9peSG18bL8";
export const VENUE_LAT = 5.5226955;
export const VENUE_LNG = 95.2735277;

export const TARGET_MS = Date.UTC(2026, 6, 4, 9, 0, 0);

export const CALENDAR_URL = (() => {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: "Pernikahan Yasmin & Ghulam Abrar",
    dates: "20260704T090000Z/20260704T150000Z",
    details: "Akad Nikah pukul 09.00 WIB\nResepsi pukul 11.00 WIB s/d selesai",
    location: `${VENUE_NAME}, ${VENUE_ADDRESS}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
})();
