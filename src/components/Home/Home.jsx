// src/components/Home/Home.jsx
import React, { useState, useEffect } from "react";
import { logout } from "../../firebase";
import { db } from "../../firebase";
import { collection, addDoc, query, where, orderBy, onSnapshot } from "firebase/firestore";
import EmissionForm from "../Emissions/EmissionsForm";
import EmissionList from "../Emissions/EmissionsList";

export default function Home({ user, onLogout }) {
  const [emissions, setEmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Listen for user's emissions in real-time
  useEffect(() => {
    if (!user) return;
    
    const q = query(
      collection(db, 'emissions'),
      where('uid', '==', user.uid),
      orderBy('date', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const emissionsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEmissions(emissionsData);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, [user]);

  // Add new emission to Firestore
  const handleAddEmission = async (emissionData) => {
    try {
      await addDoc(collection(db, 'emissions'), {
        ...emissionData,
        uid: user.uid
      });
    } catch (error) {
      console.error('Error adding emission:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">🌱 Greenify</h1>
            <p className="text-green-100">Welcome back, {user?.email}</p>
          </div>
          <button
            onClick={async () => {
              await logout();
              onLogout();
            }}
            className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Add Emission */}
          <div>
            <EmissionForm onSubmit={handleAddEmission} />
          </div>
          
          {/* Right Column: Emissions List */}
          <div>
            {loading ? (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-center text-gray-500">Loading...</div>
              </div>
            ) : (
              <EmissionList emissions={emissions} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}