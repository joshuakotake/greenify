import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../hooks/useAuth";
import TopBar from "../components/layout/TopBar";
import CarbonProgressBar from "../components/tracking/CarbonProgressBar";
import WeeklyChart from "../components/tracking/WeeklyChart";
import LeafParticles from "../components/Leaderboard/LeafParticles";

const Dashboard = () => {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Hardcoded data for now
  const currentDailyUsage = 15.3; // kg CO2
  const dailyBudget = 20;

  return (
    <div className="flex-col min-h-screen bg-gradient-to-br from-green-50 to-blue-50 relative">
      <LeafParticles />
      <TopBar user={user} onLogout={handleLogout} />

      <main className="max-w-4xl mx-auto pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-gray-900 mb-2">
            Welcome back,{" "}
            {user?.displayName || user?.email?.split("@")[0] || "leon"}!
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Track your carbon footprint and stay within your sustainable limits.
            Every small action counts towards a greener future.
          </p>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Left Column - Daily Progress & Carbon Savings */}
          <div className="xl:col-span-5 space-y-6">
            {/* Daily Progress Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="bg-green-50 px-6 py-4 border-b border-green-100">
                <h3 className="text-lg font-medium text-gray-900 mb-1 flex items-center">
                  <span className="w-2 h-6 bg-green-500 rounded-full mr-3"></span>
                  Today's Carbon Budget
                </h3>
                <p className="text-green-700 text-sm">
                  Track your daily emissions
                </p>
              </div>
              <div className="p-6">
                <CarbonProgressBar
                  currentUsage={currentDailyUsage}
                  dailyBudget={dailyBudget}
                />
              </div>
            </div>

            {/* Today's Impact Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
              <div className="bg-green-50 px-6 py-4 border-b border-green-100">
                <h3 className="text-lg font-medium text-gray-900 mb-1 flex items-center">
                  <span className="w-2 h-6 bg-green-500 rounded-full mr-3"></span>
                  Carbon Savings
                </h3>
                <p className="text-green-700 text-sm">
                  Today's environmental impact
                </p>
              </div>
              <div className="p-6 flex-1">
                <div className="grid grid-cols-2 gap-4 h-full">
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100 flex flex-col justify-center">
                    <div className="text-2xl mb-2">⚡</div>
                    <div className="text-sm text-gray-600 mb-1">
                      Energy Equivalent
                    </div>
                    <div className="text-lg font-semibold text-green-700">
                      {((dailyBudget - currentDailyUsage) * 1.8).toFixed(1)} kWh
                    </div>
                    <div className="text-xs text-green-600 mt-1">
                      {Math.round((dailyBudget - currentDailyUsage) * 1.8)} hrs
                      of home power
                    </div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100 flex flex-col justify-center">
                    <div className="text-2xl mb-2">🔥</div>
                    <div className="text-sm text-gray-600 mb-1">
                      Under Budget
                    </div>
                    <div className="text-lg font-semibold text-green-700">
                      {currentDailyUsage < dailyBudget ? "3" : "0"} Days
                    </div>
                    <div className="text-xs text-green-600 mt-1">
                      Current streak
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Weekly Overview */}
          <div className="xl:col-span-7">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col">
              <div className="bg-green-50 px-6 py-4 border-b border-green-100">
                <h3 className="text-lg font-medium text-gray-900 mb-1 flex items-center">
                  <span className="w-2 h-6 bg-green-500 rounded-full mr-3"></span>
                  Weekly Overview
                </h3>
                <p className="text-green-700 text-sm">
                  Your carbon footprint trends
                </p>
              </div>
              <div className="p-6 flex-1">
                <WeeklyChart dailyBudget={dailyBudget} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
