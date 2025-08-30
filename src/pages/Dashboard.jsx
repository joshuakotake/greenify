import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../hooks/useAuth";
import TopBar from "../components/layout/TopBar";
import CarbonProgressBar from "../components/tracking/CarbonProgressBar";
import WeeklyChart from "../components/tracking/WeeklyChart";

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
  const dailyBudget = 20; // kg CO2
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <TopBar user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Welcome back, {user?.displayName || user?.email?.split('@')[0] || 'leon'}!
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track your carbon footprint and stay within your sustainable limits. 
            Every small action counts towards a greener future.
          </p>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Left Column - Daily Progress & Carbon Savings */}
          <div className="xl:col-span-5 space-y-6">
            
            {/* Daily Progress Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white mb-1">Today's Carbon Budget</h2>
                <p className="text-green-100 text-sm">Track your daily emissions in real-time</p>
              </div>
              <div className="p-6">
                <CarbonProgressBar 
                  currentUsage={currentDailyUsage}
                  dailyBudget={dailyBudget}
                />
              </div>
            </div>

            {/* Today's Impact Summary */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-2 h-8 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full mr-3"></span>
                Carbon Savings
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100">
                  <div className="text-2xl mb-2">⚡</div>
                  <div className="text-sm text-gray-600 mb-1">Energy Equivalent</div>
                  <div className="text-xl font-bold text-amber-700">
                    {((dailyBudget - currentDailyUsage) * 1.8).toFixed(1)} kWh
                  </div>
                  <div className="text-xs text-amber-600 mt-1">
                    {Math.round((dailyBudget - currentDailyUsage) * 1.8)} hrs of home power
                  </div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
                  <div className="text-2xl mb-2">🔥</div>
                  <div className="text-sm text-gray-600 mb-1">Under Budget</div>
                  <div className="text-xl font-bold text-purple-700">
                    {currentDailyUsage < dailyBudget ? '3' : '0'} Days
                  </div>
                  <div className="text-xs text-purple-600 mt-1">
                    Current streak
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Weekly Overview */}
          <div className="xl:col-span-7">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 h-full">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white mb-1">Weekly Overview</h2>
                <p className="text-indigo-100 text-sm">Your carbon footprint trends and patterns</p>
              </div>
              <div className="p-6">
                <WeeklyChart dailyBudget={dailyBudget} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Row */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="text-3xl mb-3">📊</div>
            <div className="text-sm text-gray-500 uppercase tracking-wide mb-1">This Month</div>
            <div className="text-2xl font-bold text-gray-900">348.2 kg</div>
            <div className="text-sm text-green-600 mt-1">↓ 12% vs last month</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="text-3xl mb-3">🔥</div>
            <div className="text-sm text-gray-500 uppercase tracking-wide mb-1">Current Streak</div>
            <div className="text-2xl font-bold text-gray-900">5 Days</div>
            <div className="text-sm text-orange-600 mt-1">Under budget</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="text-3xl mb-3">⚡</div>
            <div className="text-sm text-gray-500 uppercase tracking-wide mb-1">Energy Saved</div>
            <div className="text-2xl font-bold text-gray-900">32.4 kWh</div>
            <div className="text-sm text-amber-600 mt-1">This week</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="text-3xl mb-3">🌍</div>
            <div className="text-sm text-gray-500 uppercase tracking-wide mb-1">Ranking</div>
            <div className="text-2xl font-bold text-gray-900">#3</div>
            <div className="text-sm text-green-600 mt-1">Among friends</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;