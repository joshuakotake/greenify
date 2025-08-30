import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "../firebase"; // <-- import app

const auth = getAuth(app);
const db = getDatabase(app); // <-- pass app

export async function signUp(email, password, name) {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    // Save user info to realtime database
    await set(ref(db, "users/" + user.uid), {
      name: name,
      email: user.email,
      points: 0,
    });
  } catch (err) {
    console.error("Sign up error:", err);
    throw err;
  }
}