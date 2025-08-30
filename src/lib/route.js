// emissions + simple route stub (keep your Mapbox route where applicable)

// --- Emission factors (kg CO2e per passenger-km) ---
const EF = {
  car: 0.25,      // solo petrol car (use 0.27 if you want to match your old constant)
  transit: 0.06,  // blended bus/rail
  bike: 0.0,
  walk: 0.0,
};

// keep compatibility if your code sometimes uses "drive"
const factorForMode = (mode) => {
  if (mode === "drive") return EF.car;
  return EF[mode] ?? EF.car;
};

// compute emissions and savings vs car baseline
export function computeEmissions(distance_km, mode, { baseline = "car" } = {}) {
  const d = Math.max(0, Number(distance_km) || 0);
  const modeEF = factorForMode(mode);
  const baseEF = factorForMode(baseline);

  const emissions_kg = d * modeEF;
  const baseline_kg = d * baseEF;
  const saved_kg = Math.max(0, baseline_kg - emissions_kg);

  return {
    distance_km: d,
    mode,
    factors: { selected_kg_per_km: modeEF, baseline_kg_per_km: baseEF },
    emissions_kg,
    baseline_kg,
    saved_kg,
  };
}

// --- Speed table just for time estimates (km/h) ---
const SPEED_KMH = { walk: 5, bike: 15, transit: 25, car: 35, drive: 35 };

// --- Your existing demo helpers (keep if you still use the stub map) ---
function hashToDistanceKm(a, b) {
  const s = (String(a) + String(b)).split("").reduce((n, c) => n + c.charCodeAt(0), 0);
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

// --- Stubbed planner (replace with Mapbox route if available) ---
export function planRoute(from, to, mode) {
  const distance_km = hashToDistanceKm(from, to);
  const speed = SPEED_KMH[mode] ?? 30;
  const time_min = Math.max(2, Math.round((distance_km / speed) * 60));

  // legit CO2 savings vs car baseline
  const res = computeEmissions(distance_km, mode, { baseline: "car" });

  const polyline = buildPolyline(distance_km);
  return {
    distance_km,
    time_min,
    co2_saved_kg: res.saved_kg,
    emissions_kg: res.emissions_kg,
    ef_selected: res.factors.selected_kg_per_km,
    ef_baseline: res.factors.baseline_kg_per_km,
    polyline,
  };
}

// --- Random-ish polyline generator for transit ---
function buildTransitPolyline(from, to, segments = 4) {
  const [x0, y0] = from;
  const [x1, y1] = to;
  const points = [[x0, y0]];

  for (let i = 1; i < segments; i++) {
    const t = i / segments;
    // interpolate with some random "wiggle"
    const x = x0 + t * (x1 - x0) + (Math.random() - 0.5) * 0.01;
    const y = y0 + t * (y1 - y0) + (Math.random() - 0.5) * 0.01;
    points.push([x, y]);
  }
  points.push([x1, y1]);
  return points;
}

export function planTransitRoute(from, to, distance_km) {
  // transit average ~25 km/h
  const SPEED_TRANSIT = 25;
  const time_min = Math.max(2, Math.round((distance_km / SPEED_TRANSIT) * 60));

  const emissions_kg = distance_km * 0.06;     // transit factor
  const baseline_kg = distance_km * 0.25;      // car baseline
  const saved_kg = Math.max(0, baseline_kg - emissions_kg);

  const polyline = buildTransitPolyline(from, to);

  return {
    distance_km,
    time_min,
    co2_saved_kg: saved_kg,
    emissions_kg,
    ef_selected: 0.06,
    ef_baseline: 0.25,
    routeCoordinates: polyline,
    mode: "transit",
    engine: "stub-transit"
  };
}
