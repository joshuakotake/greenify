import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBkC_qgWz-buw_RVnpBB7UNBomwTfvJULM",
  authDomain: "greenify-ca166.firebaseapp.com",
  projectId: "greenify-ca166",
  storageBucket: "greenify-ca166.appspot.com",
  messagingSenderId: "490974684125",
  appId: "1:490974684125:web:eeb50d621068865a7d4c34",
  measurementId: "G-36NKKY75E9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

// Auth helpers
const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);
const register = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);
const logout = () => signOut(auth);
const onUserStateChange = (callback) => onAuthStateChanged(auth, callback);

export { db, auth, login, register, logout, onUserStateChange };
