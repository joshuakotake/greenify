import React from "react";

export default function TripCard({ t }) {
  return (
    <div className="trip-card">
      <div>
        <div className="trip-title">
          <span className="badge">{t.mode}</span> {t.from} → {t.to}
        </div>
        <div className="trip-sub">
          {t.distance_km.toFixed(1)} km · {t.time_min} min · CO₂ saved {t.co2_saved_kg.toFixed(2)} kg
        </div>
      </div>
      <div className="trip-date">{new Date(t.createdAt).toLocaleString()}</div>
    </div>
  );
}