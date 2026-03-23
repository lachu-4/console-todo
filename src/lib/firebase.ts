import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCARsYLmhy2V3OKALXgPNgPG6lLpzGTfng",
  authDomain: "to-do-54a42.firebaseapp.com",
  projectId: "to-do-54a42",
  storageBucket: "to-do-54a42.firebasestorage.app",
  messagingSenderId: "299680694526",
  appId: "1:299680694526:web:1dae7088952653dfd2a5af"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
