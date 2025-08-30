const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

// UI mode → Mapbox profile
const PROFILE = { walk: "walking", bike: "cycling", drive: "driving", transit: "walking" }; // transit fallback

const cache = new Map();

export async function geocode(place){
  const key = `geo:${place}`;
  if (cache.has(key)) return cache.get(key);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json?access_token=${TOKEN}&limit=1`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Geocoding failed");
  const data = await res.json();
  const coords = data.features?.[0]?.geometry?.coordinates; // [lon, lat]
  if (!coords) throw new Error(`No results for "${place}"`);
  cache.set(key, coords);
  return coords;
}

export async function directions(fromCoords, toCoords, mode){
  const prof = PROFILE[mode] || "walking";
  const key = `dir:${fromCoords.join(",")}:${toCoords.join(",")}:${prof}`;
  if (cache.has(key)) return cache.get(key);

  const url = `https://api.mapbox.com/directions/v5/mapbox/${prof}/${fromCoords[0]},${fromCoords[1]};${toCoords[0]},${toCoords[1]}?geometries=geojson&overview=full&access_token=${TOKEN}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Directions failed");
  const data = await res.json();
  const route = data.routes?.[0];
  if (!route) throw new Error("No route found");

  const result = {
    distance_km: route.distance / 1000,
    time_min: Math.round(route.duration / 60),
    routeCoordinates: route.geometry.coordinates
  };
  cache.set(key, result);
  return result;
}

export async function planRealRoute(fromStr, toStr, mode){
  const from = await geocode(fromStr);
  const to = await geocode(toStr);
  const { distance_km, time_min, routeCoordinates } = await directions(from, to, mode);
  const CO2_PER_KM_CAR = 0.27;
  const co2_saved_kg = mode === "drive" ? 0 : distance_km * CO2_PER_KM_CAR;
  return { distance_km, time_min, co2_saved_kg, routeCoordinates, from, to };
}
