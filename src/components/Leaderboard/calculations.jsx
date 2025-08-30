import { getDatabase, ref, update, get } from "firebase/database";

// assign points based on mode
const calculatePointsForTrip = (trip) => {
  switch ((trip.mode || "").toLowerCase()) {
    case "bike":
    case "walk":
      return 10;
    case "transit":
      return 7;
    case "drive":
    case "car":
      return 1;
    default:
      return 0;
  }
};

// add trip + update user points
export const addTripAndUpdatePoints = async (userId, tripData) => {
  const db = getDatabase();
  const userRef = ref(db, `users/${userId}`);

  try {
    const earnedPoints = calculatePointsForTrip(tripData);

    const snapshot = await get(userRef);
    if (!snapshot.exists()) {
      throw new Error("User not found in database");
    }

    const userData = snapshot.val();
    const currentPoints = userData.points ?? 0;
    const newPoints = currentPoints + earnedPoints;

    await update(ref(db), {
      [`users/${userId}/points`]: newPoints,
      [`users/${userId}/trips/${tripData.id}`]: tripData,
    });

    console.log(`✅ Added ${tripData.mode} trip. +${earnedPoints} points.`);
  } catch (err) {
    console.error("Error adding trip:", err);
  }
};
