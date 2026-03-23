import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1GbF9kNxZPjkHVJ5qplTex_ZH16pbw-Y",
  authDomain: "to-do-361cb.firebaseapp.com",
  projectId: "to-do-361cb",
  storageBucket: "to-do-361cb.firebasestorage.app",
  messagingSenderId: "692087325595",
  appId: "1:692087325595:web:590d9f37530612a669573e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
