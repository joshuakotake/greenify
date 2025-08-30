import React from "react";

export default function TripCard({ t }) {
  return (
    <div className="trip-card">
      <div>
        <p className="badge mb-2">
          {t.mode.charAt(0).toUpperCase() + t.mode.slice(1)}
        </p>
        <div className="trip-title text-center items-center">
          <p>{t.from}</p>
          <p>↓</p>
          <p>{t.to}</p>
        </div>
        <div className="trip-sub">
          {t.distance_km.toFixed(1)} km · {t.time_min} min · CO₂ saved{" "}
          {t.co2_saved_kg.toFixed(2)} kg
        </div>
      </div>
      <div className="trip-date">
        {new Date(t.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })}
      </div>
    </div>
  );
}
