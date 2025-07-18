// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiOdMBhen7gSVd35rc7C9aPLp3qa0rLAw",
  authDomain: "cubarenta-nuevo.firebaseapp.com",
  projectId: "cubarenta-nuevo",
  storageBucket: "cubarenta-nuevo.firebasestorage.app",
  messagingSenderId: "18917546180",
  appId: "1:18917546180:web:b0e0213f3e1b2dcd781191",
  measurementId: "G-B8FJ4C4S6H"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Analytics if running in the browser
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, analytics };
