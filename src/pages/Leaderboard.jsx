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
      const data = snapshot.val();
      if (data) {
        // Convert object to array and sort by points descending
        const usersArray = Object.entries(data).map(([id, user]) => ({
          id,
          ...user,
        }));
        usersArray.sort((a, b) => (b.points ?? 0) - (a.points ?? 0));
        setUsers(usersArray);
      } else {
        setUsers([]);
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  const getRankIcon = (rank) => {
    return `#${rank}`;
  };

  return (
    <div className="flex-col min-h-screen bg-gradient-to-br from-green-50 to-blue-50 relative">
      <LeafParticles />
      <TopBar user={user} onLogout={handleLogout} />

      <main className="max-w-4xl mx-auto pt-20 pb-8 px-4 sm:px-6 lg:px-8">
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="bg-green-50 px-6 py-4 border-b border-green-100">
            <h2 className="text-lg font-medium text-gray-900 mb-1">
              Top Performers
            </h2>
            <p className="text-green-700 text-sm">
              Ranked by eco-friendly actions and carbon savings
            </p>
          </div>

          <div className="p-6">
            {users.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🌱</div>
                <p className="text-gray-500 text-lg">No participants yet!</p>
                <p className="text-gray-400 text-sm mt-2">
                  Be the first to start tracking your carbon footprint.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {users.map((userData, idx) => {
                  const rank = idx + 1;
                  return (
                    <div
                      key={userData.id}
                      className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                        rank <= 3
                          ? "bg-green-50 border-green-200"
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
                          {getRankIcon(rank)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {userData.name || userData.email}
                          </div>
                          <div className="text-sm text-gray-500">
                            Rank #{rank}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">
                          {userData.points ?? 0}
                        </div>
                        <div className="text-sm text-gray-500">points</div>
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
