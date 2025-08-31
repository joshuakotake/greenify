import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../hooks/useAuth";
import TopBar from "../components/layout/TopBar";
import CarbonProgressBar from "../components/tracking/CarbonProgressBar";
import WeeklyCO2Chart from "../components/tracking/WeeklyChart";
import LeafParticles from "../components/Leaderboard/LeafParticles";
import { useEffect, useState, useMemo } from "react";
import { listenToTrips } from "../lib/trips";

const Dashboard = () => {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    if (!user) return;
    const unsubscribe = listenToTrips(user.uid, setTrips);
    return () => unsubscribe();
  }, [user]);

  // Carbon saving goals data
  const dailySavingGoal = 10;

  const currentDailySavings = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return trips
      .filter((t) => t.date && t.date.slice(0, 10) === today)
      .reduce((sum, t) => sum + (t.co2Saved || t.co2_saved_kg || 0), 0);
  }, [trips]);

  const totalDistance = useMemo(() => {
    return trips.reduce((sum, t) => sum + (t.distance_km || 0), 0);
  }, [trips]);

  const totalCO2Saved = useMemo(() => {
    return trips.reduce((sum, t) => sum + (t.co2_saved_kg || 0), 0);
  }, [trips]);

  return (
    <div className="flex-col min-h-screen bg-gradient-to-br from-green-50 to-blue-50 relative">
      <LeafParticles />
      <TopBar user={user} onLogout={handleLogout} />

      <main className="max-w-4xl pt-5 mx-auto pb-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-gray-900 mb-2">
            Welcome back,{" "}
            {user?.displayName || user?.email?.split("@")[0] || "leon"}!
          </h1>
          <p className="text-gray-600 max-w-xl">
            Track your carbon savings and work towards your sustainable goals.
            See your impact grow with every eco-friendly trip you take.
          </p>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Left Column - Daily Progress & Carbon Savings */}
          <div className="xl:col-span-5 space-y-6">
            {/* Daily Savings Progress Card */}
            <div className="bg-white rounded-md shadow-sm border border-gray-200">
              <div className="bg-green-50 rounded-t px-6 py-4 border-b border-green-100">
                <h3 className="text-lg font-medium text-gray-900 mb-1 flex items-center">
                  <span className="w-2 h-6 bg-green-500 rounded-full mr-3"></span>
                  Today's Carbon Saving Goal
                </h3>
                <p className="text-green-700 text-sm">
                  Track your daily carbon savings
                </p>
              </div>
              <div className="p-6">
                <CarbonProgressBar
                  currentUsage={currentDailySavings}
                  dailyBudget={dailySavingGoal}
                />
              </div>
            </div>

            {/* Carbon Impact Summary */}
            <div className="bg-white rounded-md shadow-sm border border-gray-200 flex flex-col">
              <div className="bg-green-50 rounded-t px-6 py-4 border-b border-green-100">
                <h3 className="text-lg font-medium text-gray-900 mb-1 flex items-center">
                  <span className="w-2 h-6 bg-green-500 rounded-full mr-3"></span>
                  Carbon Impact Summary
                </h3>
                <p className="text-green-700 text-sm">
                  See your total carbon impacts
                </p>
              </div>
              <div className="p-7 flex-1">
                <div className="grid grid-cols-2 gap-4 h-full ">
                  <div className="text-center p-4 bg-blue-50 rounded-lg flex flex-col justify-center">
                    <div className="text-sm font-medium text-blue-600 mb-1">
                      Total Distance Travelled
                    </div>
                    <div className="text-lg font-semibold text-blue-800">
                      {totalDistance.toFixed(2)} km
                    </div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg flex flex-col justify-center">
                    <div className="text-sm font-medium text-green-600 mb-1">
                      Total CO₂ Saved
                    </div>
                    <div className="text-lg font-semibold text-green-700">
                      {totalCO2Saved.toFixed(2)} kg
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Weekly Savings Overview */}
          <div className="xl:col-span-7">
            <div className="bg-white rounded-md shadow-sm border border-gray-200 h-full flex flex-col">
              <div className="bg-green-50 rounded-t px-6 py-4 border-b border-green-100">
                <h3 className="text-lg font-medium text-gray-900 mb-1 flex items-center">
                  <span className="w-2 h-6 bg-green-500 rounded-full mr-3"></span>
                  Weekly Savings Overview
                </h3>
                <p className="text-green-700 text-sm">
                  Your carbon saving trends and progress towards goals
                </p>
              </div>
              <div className="p-6 flex-1">
                <WeeklyCO2Chart trips={trips} dailyBudget={dailySavingGoal} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
