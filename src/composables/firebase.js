import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9Pku9_2ebq8X-NaXBF736nZHXIaCEKO8",
  authDomain: "creative-exam.firebaseapp.com",
  projectId: "creative-exam",
  storageBucket: "creative-exam.firebasestorage.app",
  messagingSenderId: "96387611280",
  appId: "1:96387611280:web:99ca0e2ad4ee21339f7615"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
