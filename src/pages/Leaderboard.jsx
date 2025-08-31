import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import TopBar from "../components/layout/TopBar";
import { useAuth } from "../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import LeafParticles from "../components/Leaderboard/LeafParticles";

const Leaderboard = () => {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const usersRef = ref(db, "users");

    const unsubscribe = onValue(usersRef, (snapshot) => {
      const userData = snapshot.val();

      if (userData) {
        // Calculate total CO2 saved for each user from their nested trips
        const usersArray = Object.entries(userData).map(([id, user]) => {
          let totalCO2Saved = 0;

          // Check if user has trips and calculate total CO2 saved
          if (user.trips) {
            Object.values(user.trips).forEach((trip) => {
              totalCO2Saved += trip.co2_saved_kg || 0;
            });
          }

          return {
            id,
            ...user,
            totalCO2Saved,
          };
        });

        // Sort by total CO2 saved descending
        usersArray.sort(
          (a, b) => (b.totalCO2Saved ?? 0) - (a.totalCO2Saved ?? 0)
        );
        setUsers(usersArray);
      } else {
        setUsers([]);
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex-col min-h-screen bg-gradient-to-br from-green-50 to-blue-50 relative">
      <LeafParticles />
      <TopBar user={user} onLogout={handleLogout} />

      <main className="max-w-4xl pt-5 mx-auto pb-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-gray-900 mb-2">
            Leaderboard
          </h1>
          <p className="text-gray-600 max-w-2xl">
            See how you stack up against other eco-warriors in reducing carbon
            footprints.
          </p>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-md shadow-sm border border-gray-200">
          <div className="bg-green-50 rounded-t px-6 py-4 border-b border-green-100">
            <h2 className="text-lg font-medium text-gray-900 mb-1">
              Top Performers
            </h2>
            <p className="text-green-700 text-sm">
              Ranked by total CO₂ saved through eco-friendly transportation
            </p>
          </div>

          <div className="p-6">
            {users.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🌱</div>
                <p className="text-gray-500 text-lg">No participants yet!</p>
                <p className="text-gray-400 text-sm mt-2">
                  Be the first to start saving CO₂ with eco-friendly trips.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {users.map((userData, idx) => {
                  const rank = idx + 1;
                  const isCurrentUser = userData.id === user?.uid;
                  const displayName =
                    userData?.name ||
                    (isCurrentUser ? user?.displayName : "Anonymous");

                  return (
                    <div
                      key={userData.id}
                      className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                        isCurrentUser
                          ? "bg-green-50 border-blue-600 ring-1 ring-blue-500"
                          : rank <= 3
                          ? "bg-green-50 border-2 border-green-600"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex items-center justify-center w-10 h-10 rounded-full font-medium ${
                            rank <= 3
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {`#${rank}`}
                        </div>
                        <div>
                          <div
                            className={`text-gray-900 ${
                              isCurrentUser ? "font-bold" : "font-medium"
                            }`}
                          >
                            {displayName}
                            {isCurrentUser && (
                              <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                You
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">
                          {userData.totalCO2Saved?.toFixed(1) ?? "0.0"} kg
                        </div>
                        <div className="text-sm text-gray-500">CO₂ saved</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
