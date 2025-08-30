import React, { useMemo, useState, useEffect } from "react";
import AddTripModal from "../components/Planner/parts/AddTripModal";
import TripCard from "../components/Planner/parts/TripCard";
import { totalSaved } from "../components/Planner/parts/utils";
import "../components/Planner/Planner.css";
import TopBar from "../components/layout/TopBar";
import { useAuth } from "../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { addTrip, listenToTrips } from "../lib/trips";

export default function PlannerPage() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [trips, setTrips] = useState([]);
  const saved = useMemo(() => totalSaved(trips), [trips]);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = listenToTrips(user.uid, setTrips);
    return () => unsubscribe();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleAddTrip = async (trip) => {
    if (!user) return;
    await addTrip(user.uid, {
      ...trip,
      date: new Date().toISOString(), // Always add date!
    });
    setOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top navigation bar */}
      <TopBar user={user} onLogout={handleLogout} />

      {/* Page content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <section className="planner-section">
          <div className="row head">
            <h1 className="title">Plan a Trip</h1>
            <button className="btn" onClick={() => setOpen(true)}>
              + Add Trip
            </button>
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
                  {trips.map((t) => (
                    <TripCard key={t.id} t={t} />
                  ))}
                </div>
              </div>
              <div className="col panel">
                <h3 className="h3">Summary</h3>
                <p>
                  Total CO₂ saved: <b>{saved.toFixed(2)} kg</b>
                </p>
              </div>
            </div>
          )}

          {open && (
            <AddTripModal
              onClose={() => setOpen(false)}
              onConfirm={handleAddTrip}
            />
          )}
        </section>
      </main>
    </div>
  );
}
