import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "workoutapp2023-c5844.firebaseapp.com",
  projectId: "workoutapp2023-c5844",
  storageBucket: "workoutapp2023-c5844.appspot.com",
  messagingSenderId: "189520695310",
  appId: "1:189520695310:web:6c44f35fb8579b0f5cec5f",
  measurementId: "G-3YJJYHG4QB",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export { signInWithEmailAndPassword, signOut };
