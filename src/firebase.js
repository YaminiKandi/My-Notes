import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDKTgcWqDdVDVhAbDSRNk_pM8M9CVAjW-A",
  authDomain: "yk-notes.firebaseapp.com",
  projectId: "yk-notes",
  storageBucket: "yk-notes.appspot.com",
  messagingSenderId: "147971136993",
  appId: "1:147971136993:web:dd58f05c58ca8dddf306a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app
