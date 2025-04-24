import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDLwdv5tzLZ0OE7WQbKfRbqdCwBrYMmlQ",
  authDomain: "wellilab.firebaseapp.com",
  projectId: "wellilab",
  storageBucket: "wellilab.firebasestorage.app",
  messagingSenderId: "150212748452",
  appId: "1:150212748452:web:4a49b7eac6037ebd2bb231",
  measurementId: "G-ZEGLE380DG"
  };

// Initialize Firebase only if not already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { auth, RecaptchaVerifier, signInWithPhoneNumber };
