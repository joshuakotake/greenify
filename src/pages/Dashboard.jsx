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
    <div className="min-h-screen bg-gray-100">
      <TopBar user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome Section */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.displayName || user?.email || 'User'}!
            </h1>
            <p className="text-gray-600">
              Track your carbon footprint and stay within your sustainable limits
            </p>
          </div>

          {/* Carbon Tracking Section */}
          <div className="space-y-6">
            {/* Today's Progress */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CarbonProgressBar 
                currentUsage={currentDailyUsage}
                dailyBudget={dailyBudget}
              />
              
              {/* Additional info card or future component */}
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                    <div className="font-medium text-blue-900">Log New Trip</div>
                    <div className="text-sm text-blue-600">Add transportation data</div>
                  </button>
                  <button className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                    <div className="font-medium text-green-900">View Planner</div>
                    <div className="text-sm text-green-600">Plan sustainable routes</div>
                  </button>
                  <button className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                    <div className="font-medium text-purple-900">Set Goals</div>
                    <div className="text-sm text-purple-600">Adjust your carbon budget</div>
                  </button>
                </div>
              </div>
            </div>

            {/* Weekly Overview */}
            <WeeklyChart dailyBudget={dailyBudget} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;