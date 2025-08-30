import { getDatabase, ref, push, onValue } from "firebase/database";

// Add a new trip for a user
export function addTrip(uid, trip) {
  const db = getDatabase();
  const tripsRef = ref(db, `users/${uid}/trips`);
  return push(tripsRef, trip);
}

// Listen to all trips for a user (real-time updates)
export function listenToTrips(uid, callback) {
  const db = getDatabase();
  const tripsRef = ref(db, `users/${uid}/trips`);
  const unsubscribe = onValue(tripsRef, (snapshot) => {
    const data = snapshot.val() || {};
    // Convert object to array with id
    const trips = Object.entries(data).map(([id, trip]) => ({ id, ...trip }));
    callback(trips);
  });
  // Return unsubscribe function for cleanup
  return unsubscribe;
}