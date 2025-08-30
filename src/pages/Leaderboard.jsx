import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import TopBar from "../components/layout/TopBar";
import { useAuth } from "../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import "../components/Leaderboard/Leaderboard.css";

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

  return (
    <div className="min-h-screen bg-gray-100">
      <TopBar user={user} onLogout={handleLogout} />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="leaderboard-container">
          <h1 className="leaderboard-title">Leaderboard</h1>
          <ol className="leaderboard-list">
            {users.map((user, idx) => (
              <li key={user.id} className="leaderboard-item">
                <span className="leaderboard-rank">{idx + 1}.</span>
                <span className="leaderboard-name">{user.name || user.email}</span>
                <span className="leaderboard-points">{user.points ?? 0} pts</span>
              </li>
            ))}
          </ol>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
