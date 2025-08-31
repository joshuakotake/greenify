import { useMemo, useState, useEffect } from "react";
import AddTripModal from "../components/Planner/parts/AddTripModal";
import TripCard from "../components/Planner/parts/TripCard";
import { totalSaved } from "../components/Planner/parts/utils";
import "../components/Planner/Planner.css";
import TopBar from "../components/layout/TopBar";
import LeafParticles from "../components/Leaderboard/LeafParticles";
import { useAuth } from "../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { listenToTrips } from "../lib/trips";
import { addTripAndUpdatePoints } from "../components/Leaderboard/calculations/";

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

    const tripWithDate = {
      ...trip,
      id: crypto.randomUUID(), // unique ID for trip
      date: new Date().toISOString(),
    };

    await addTripAndUpdatePoints(user.uid, tripWithDate);
    setOpen(false);
  };

  return (
    <div className="flex-col min-h-screen bg-gradient-to-br from-green-50 to-blue-50 relative">
      <LeafParticles />
      <TopBar user={user} onLogout={handleLogout} />

      <main className="max-w-4xl pt-5 mx-auto pb-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-gray-900 mb-2">
            Trip Planner
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Plan your sustainable journeys and track the carbon savings of your
            eco-friendly travel choices. Every eco-friendly trip counts towards
            a greener future.
          </p>
        </div>
        {trips.length === 0 ? (
          <div className="bg-white rounded-md shadow-sm border-gray-200">
            <div className="bg-green-50 rounded-t px-6 py-4 border-b border-green-100 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-1">
                  Your Trips
                </h2>
                <p className="text-green-700 text-sm">
                  Start planning your sustainable journeys
                </p>
              </div>
            </div>
            <div className="p-12 text-center">
              <div className="text-4xl mb-4">🚲</div>
              <p className="text-gray-500 mb-6">
                No trips yet. Add your first sustainable journey.
              </p>
              <button
                onClick={() => setOpen(true)}
                className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl text-base font-semibold shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-transparent"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Plan your first trip
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Trips Column */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-md shadow-sm border border-gray-200">
                <div className="bg-green-50 rounded-t px-6 py-4 border-b border-green-100 flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-1">
                      Your Trips
                    </h2>
                    <p className="text-green-700 text-sm">
                      Recent sustainable journeys
                    </p>
                  </div>
                  <button
                    onClick={() => setOpen(true)}
                    className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <span className="inline xs:hidden">Add Trip +</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </button>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {trips.map((t) => (
                      <TripCard key={t.id} t={t} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Column */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-md shadow-sm border border-gray-200">
                <div className="bg-green-50 rounded-t px-6 py-4 border-b border-green-100">
                  <h2 className="text-lg font-medium text-gray-900 mb-1">
                    Impact Summary
                  </h2>
                  <p className="text-green-700 text-sm">
                    Your environmental contribution
                  </p>
                </div>
                <div className="p-6">
                  <div className="text-center">
                    <div className="text-3xl mb-2">🌱</div>
                    <div className="text-2xl font-bold text-green-700 mb-1">
                      {saved.toFixed(1)} kg
                    </div>
                    <div className="text-sm text-gray-600">Total CO₂ saved</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {open && (
          <AddTripModal
            onClose={() => setOpen(false)}
            onConfirm={handleAddTrip}
          />
        )}
      </main>
    </div>
  );
}
