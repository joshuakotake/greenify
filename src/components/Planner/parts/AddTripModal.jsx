import React, { useEffect, useState } from "react";
import { ModeChips } from "./ModeChips";
import MapBoxMap from "./MapBoxMap";
import PlaceAutocomplete from "./PlaceAutocomplete";
import { makeTrip } from "./utils";
import { geocode, directions } from "../../../lib/mapboxRoute";
import { computeEmissions } from "../../../lib/route";
import { IconMapPin, IconBuilding } from "./icons";

// --- Stub for transit ---
function buildTransitPolyline(from, to, segments = 4) {
  const [x0, y0] = from;
  const [x1, y1] = to;
  const points = [[x0, y0]];

  for (let i = 1; i < segments; i++) {
    const t = i / segments;
    const x = x0 + t * (x1 - x0) + (Math.random() - 0.5) * 0.01;
    const y = y0 + t * (y1 - y0) + (Math.random() - 0.5) * 0.01;
    points.push([x, y]);
  }

  points.push([x1, y1]);
  return points;
}

export default function AddTripModal({ onClose, onConfirm }) {
  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [fromCoords, setFromCoords] = useState(null);
  const [toCoords, setToCoords] = useState(null);
  const [mode, setMode] = useState("bike");

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [route, setRoute] = useState({
    distance_km: 0,
    time_min: 0,
    co2_saved_kg: 0,
    emissions_kg: 0,
    routeCoordinates: [],
  });

  useEffect(() => {
    let ignore = false;
    const t = setTimeout(async () => {
      if (!fromText.trim() || !toText.trim()) return;
      try {
        setLoading(true);
        setErr("");

        const from = fromCoords || (await geocode(fromText));
        const to = toCoords || (await geocode(toText));

        if (mode === "transit") {
          // stubbed transit route
          const distance_km = Math.random() * 5 + 5; // 5–10 km fake distance
          const speed = 25; // km/h
          const time_min = Math.round((distance_km / speed) * 60);

          const emissions = computeEmissions(distance_km, "transit", {
            baseline: "car",
          });
          const routeCoordinates = buildTransitPolyline(from, to);

          if (!ignore)
            setRoute({
              distance_km,
              time_min,
              co2_saved_kg: emissions.saved_kg,
              emissions_kg: emissions.emissions_kg,
              ef_selected: emissions.factors.selected_kg_per_km,
              ef_baseline: emissions.factors.baseline_kg_per_km,
              routeCoordinates,
            });
        } else {
          // walk / bike / drive → Mapbox
          const r = await directions(from, to, mode);
          const emissions = computeEmissions(r.distance_km, mode, {
            baseline: "car",
          });

          if (!ignore)
            setRoute({
              ...r,
              co2_saved_kg: emissions.saved_kg,
              emissions_kg: emissions.emissions_kg,
              ef_selected: emissions.factors.selected_kg_per_km,
              ef_baseline: emissions.factors.baseline_kg_per_km,
            });
        }
      } catch (e) {
        if (!ignore) setErr(e.message || "Routing failed");
      } finally {
        if (!ignore) setLoading(false);
      }
    }, 250);
    return () => {
      ignore = true;
      clearTimeout(t);
    };
  }, [fromText, toText, fromCoords, toCoords, mode]);

  const disabled = !fromText.trim() || !toText.trim() || loading;

  const confirm = () => {
    onConfirm(
      makeTrip({
        from: fromText,
        to: toText,
        mode,
        route: {
          distance_km: route.distance_km,
          time_min: route.time_min,
          co2_saved_kg: route.co2_saved_kg,
          emissions_kg: route.emissions_kg,
          polyline: route.routeCoordinates,
        },
      })
    );
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head px-2">
          <div className="font-medium text-xl">Add Trip</div>
          <button className="close" aria-label="Close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="row">
          <div className="col">
            <PlaceAutocomplete
              labelIcon={<IconMapPin />}
              value={fromText}
              setValue={(v) => {
                setFromText(v);
                setFromCoords(null);
              }}
              onPick={(item) => {
                setFromText(item.label);
                setFromCoords(item.coords);
              }}
              placeholder="Start location"
            />
          </div>
          <div className="col">
            <PlaceAutocomplete
              labelIcon={<IconBuilding />}
              value={toText}
              setValue={(v) => {
                setToText(v);
                setToCoords(null);
              }}
              onPick={(item) => {
                setToText(item.label);
                setToCoords(item.coords);
              }}
              placeholder="Destination"
            />
          </div>
        </div>

        <ModeChips mode={mode} setMode={setMode} />

        <MapBoxMap routeCoordinates={route.routeCoordinates} />

        <div className="stats-card">
          <div className="stats-row">
            <div>
              <div className="stat-label">Distance:</div>
              <div className="stat-sub">{route.distance_km.toFixed(1)} km</div>
            </div>
            <div>
              <div className="stat-label">Time:</div>
              <div className="stat-sub">{Math.max(0, route.time_min)} min</div>
            </div>
            <div>
              <div className="stat-label">CO₂ saved vs car:</div>
              <div className="stat-sub">{route.co2_saved_kg.toFixed(2)} kg</div>
            </div>
            <div>
              <div className="stat-label">Mode:</div>
              <div className="stat-sub">
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </div>
            </div>
          </div>
        </div>

        {err && <div style={{ marginTop: 10, color: "#b91c1c" }}>{err}</div>}

        <div className="actions px-3">
          <button className="cancel" onClick={onClose}>
            Cancel
          </button>
          <div className="right">
            <button
              className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={disabled}
              onClick={confirm}
            >
              <span className="relative z-10">
                {loading ? "Calculating…" : "Confirm Trip"}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
