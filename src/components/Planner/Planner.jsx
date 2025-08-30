import React, { useMemo, useState } from "react";
import AddTripModal from "./parts/AddTripModal";
import TripCard from "./parts/TripCard";
import { totalSaved } from "./parts/utils";
import "./Planner.css";

export default function Planner() {
  const [open, setOpen] = useState(false);
  const [trips, setTrips] = useState([]);

  const saved = useMemo(() => totalSaved(trips), [trips]);

  return (
    <section className="planner-section">
      <div className="row head">
        <h1 className="title">Plan a Trip</h1>
        <button className="btn" onClick={() => setOpen(true)}>+ Add Trip</button>
      </div>

      {trips.length === 0 ? (
        <div className="panel empty">
          No trips yet. Add your first sustainable journey.
        </div>
      ) : (
        <div className="row">
          <div className="col panel">
            <h3 className="h3">Trips</h3>
            <div className="trip-grid">
              {trips.map((t) => <TripCard key={t.id} t={t} />)}
            </div>
          </div>
          <div className="col panel">
            <h3 className="h3">Summary</h3>
            <p>Total CO₂ saved: <b>{saved.toFixed(2)} kg</b></p>
          </div>
        </div>
      )}

      {open && (
        <AddTripModal
          onClose={() => setOpen(false)}
          onConfirm={(trip) => {
            setTrips((prev) => [trip, ...prev]);
            setOpen(false);
          }}
        />
      )}
    </section>
  );
}
