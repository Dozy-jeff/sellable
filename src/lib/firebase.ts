// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCr4Dcvgwz19m2bFBK0aQSHK92ni_M--tU",
  authDomain: "sellable-63676.firebaseapp.com",
  projectId: "sellable-63676",
  storageBucket: "sellable-63676.firebasestorage.app",
  messagingSenderId: "992573483691",
  appId: "1:992573483691:web:0d67769cdad504dde725ee",
  measurementId: "G-PS0D2S6XX7"
};

// Initialize Firebase (only once)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

// Analytics is only initialized on client side
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, auth, db, analytics };
