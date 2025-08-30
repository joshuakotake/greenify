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
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  getDocs
} from "firebase/firestore";

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

// Firestore helpers for emissions
const addEmission = async (emissionData) => {
  return await addDoc(collection(db, 'emissions'), {
    ...emissionData,
    timestamp: serverTimestamp()
  });
};

const getUserEmissions = (uid, callback) => {
  const q = query(
    collection(db, 'emissions'),
    where('uid', '==', uid),
    orderBy('date', 'desc')
  );
  
  return onSnapshot(q, (snapshot) => {
    const emissions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(emissions);
  });
};

// Get all users for leaderboard
const getAllUsersEmissions = async () => {
  const q = query(collection(db, 'emissions'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export { 
  db, 
  auth, 
  login, 
  register, 
  logout, 
  onUserStateChange,
  addEmission,
  getUserEmissions,
  getAllUsersEmissions,
  serverTimestamp,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot
};