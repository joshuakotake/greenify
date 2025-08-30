const CAR_EMISSION = 0.27; // kg CO2 per km (simple)
const SPEED_KMH = { walk: 5, bike: 15, transit: 25, drive: 35 };

function hashToDistanceKm(a, b) {
  const s = (a + b).split("").reduce((n, c) => n + c.charCodeAt(0), 0);
  return 1 + (s % 9); // 1..9 km
}

function buildPolyline(seed) {
  const x0 = 10 + (seed % 10);
  const y0 = 80 - (seed % 10);
  return [
    { x: x0, y: y0 },
    { x: x0 + 20, y: y0 - 18 },
    { x: x0 + 45, y: y0 - 8 },
    { x: x0 + 65, y: y0 - 28 },
  ];
}

export function planRoute(from, to, mode) {
  const distance_km = hashToDistanceKm(from, to);
  const time_min = Math.max(2, Math.round((distance_km / SPEED_KMH[mode]) * 60));
  const co2_saved_kg = mode === "drive" ? 0 : distance_km * CAR_EMISSION;
  const polyline = buildPolyline(distance_km);
  return { distance_km, time_min, co2_saved_kg, polyline };
}