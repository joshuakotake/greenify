export default function TripCard({ t }) {
  return (
    <div className="trip-card">
      <div>
        <p className="badge mb-4 mt-2 text-center items-center">
          {t.mode.charAt(0).toUpperCase() + t.mode.slice(1)}
        </p>
        <div className="trip-title text-center items-center max-w-80">
          <p>{t.from}</p>
          <p>↓</p>
          <p>{t.to}</p>
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <div className="trip-sub mt-2">
            {t.distance_km.toFixed(1)} km · {t.time_min} min
          </div>
          <div className="trip-sub mt-2">
            {t.co2_saved_kg.toFixed(2)} kg CO₂ saved ·{" "}
            {new Date(t.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "2-digit",
              hour: "numeric",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
