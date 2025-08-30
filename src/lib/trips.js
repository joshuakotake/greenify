import { getDatabase, ref, push, onValue, remove, update } from "firebase/database";

export function addTrip(uid, trip) {
  const db = getDatabase();
  const tripsRef = ref(db, `users/${uid}/trips`);
  return push(tripsRef, trip);
}

export function listenToTrips(uid, callback) {
  const db = getDatabase();
  const tripsRef = ref(db, `users/${uid}/trips`);
  return onValue(tripsRef, (snapshot) => {
    const data = snapshot.val() || {};
    const trips = Object.entries(data).map(([id, trip]) => ({ id, ...trip }));
    callback(trips);
  });
}

export function deleteTrip(uid, tripId) {
  const db = getDatabase();
  return remove(ref(db, `users/${uid}/trips/${tripId}`));
}

export function updateTrip(uid, tripId, updates) {
  const db = getDatabase();
  return update(ref(db, `users/${uid}/trips/${tripId}`), updates);
}