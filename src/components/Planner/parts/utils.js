export function totalSaved(trips) {
  return trips.reduce((s, t) => s + t.co2_saved_kg, 0);
}

export function makeTrip({ from, to, mode, route }) {
  const id = (crypto?.randomUUID?.() || Math.random().toString(36).slice(2));
  return {
    id,
    from,
    to,
    mode,
    distance_km: route.distance_km,
    time_min: route.time_min,
    co2_saved_kg: route.co2_saved_kg,
    polyline: route.polyline,
    createdAt: new Date().toISOString(),
  };
}
