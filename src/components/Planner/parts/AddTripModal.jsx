import React, { useEffect, useState } from "react";
import { ModeChips } from "./ModeChips";
import MapBoxMap from "./MapBoxMap";
import PlaceAutocomplete from "./PlaceAutocomplete";
import { makeTrip } from "./utils";
import { planRealRoute, geocode, directions } from "../../../lib/mapboxRoute";
import { IconMapPin, IconBuilding } from "./icons";

export default function AddTripModal({ onClose, onConfirm }) {
  const [fromText, setFromText] = useState("Central Station");
  const [toText, setToText] = useState("EcoHub Workspace");
  const [fromCoords, setFromCoords] = useState(null);  // [lon,lat] when picked
  const [toCoords, setToCoords] = useState(null);
  const [mode, setMode] = useState("bike");

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [route, setRoute] = useState({
    distance_km: 0, time_min: 0, co2_saved_kg: 0, routeCoordinates: []
  });

  // whenever inputs change, fetch a route (debounced)
  useEffect(() => {
    let ignore = false;
    const t = setTimeout(async () => {
      if (!fromText.trim() || !toText.trim()) return;
      try {
        setLoading(true); setErr("");

        // Use picked coords if available; else geocode the text
        const from = fromCoords || await geocode(fromText);
        const to = toCoords || await geocode(toText);

        const r = await directions(from, to, mode);
        const CO2_PER_KM_CAR = 0.27;
        const co2_saved_kg = mode === "drive" ? 0 : (r.distance_km) * CO2_PER_KM_CAR;

        if (!ignore) setRoute({ ...r, co2_saved_kg });
      } catch (e) {
        if (!ignore) setErr(e.message || "Routing failed");
      } finally {
        if (!ignore) setLoading(false);
      }
    }, 250);
    return () => { ignore = true; clearTimeout(t); };
  }, [fromText, toText, fromCoords, toCoords, mode]);

  const disabled = !fromText.trim() || !toText.trim() || loading;

  const confirm = () => {
    onConfirm(makeTrip({
      from: fromText, to: toText, mode,
      route: {
        distance_km: route.distance_km,
        time_min: route.time_min,
        co2_saved_kg: route.co2_saved_kg,
        polyline: route.routeCoordinates
      }
    }));
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div className="modal-title">Add Trip</div>
          <button className="close" aria-label="Close" onClick={onClose}>×</button>
        </div>

        <div className="row">
          <div className="col">
            <PlaceAutocomplete
              labelIcon={<IconMapPin />}
              value={fromText}
              setValue={(v)=>{ setFromText(v); setFromCoords(null); }}
              onPick={(item) => { setFromText(item.label); setFromCoords(item.coords); }}
              placeholder="Start location"
            />
          </div>
          <div className="col">
            <PlaceAutocomplete
              labelIcon={<IconBuilding />}
              value={toText}
              setValue={(v)=>{ setToText(v); setToCoords(null); }}
              onPick={(item) => { setToText(item.label); setToCoords(item.coords); }}
              placeholder="Destination"
            />
          </div>
        </div>

        <ModeChips mode={mode} setMode={setMode} />

        <MapBoxMap routeCoordinates={route.routeCoordinates} />

        <div className="stats-card">
          <div className="stats-row">
            <div><div className="stat-label">Distance:</div><div className="stat-sub">{route.distance_km.toFixed(1)} km</div></div>
            <div><div className="stat-label">Time:</div><div className="stat-sub">{Math.max(0, route.time_min)} min</div></div>
            <div><div className="stat-label">CO₂ saved vs car:</div><div className="stat-sub">{route.co2_saved_kg.toFixed(2)} kg</div></div>
            <div><div className="stat-label">Mode:</div><div className="stat-sub">{mode}</div></div>
          </div>
        </div>

        {err && <div style={{marginTop:10, color:"#b91c1c"}}>{err}</div>}

        <div className="actions">
          <button className="cancel" onClick={onClose}>Cancel</button>
          <div className="right">
            <button className="confirm" disabled={disabled} onClick={confirm}>
              {loading ? "Calculating…" : "Confirm Trip"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
