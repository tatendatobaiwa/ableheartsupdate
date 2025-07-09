// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Validate environment variables
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
];

const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName]);
if (missingVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
}

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_GA4_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only if measurement ID is provided and in production
let analytics = null;
if (import.meta.env.VITE_FIREBASE_MEASUREMENT_ID && import.meta.env.PROD) {
  analytics = getAnalytics(app);
}

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Firebase Analytics (with consent checking)
export const initializeFirebaseAnalytics = async () => {
  try {
    const supported = await isSupported();
    if (supported) {
      const analytics = getAnalytics(app);
      return analytics;
    }
    console.warn('Firebase Analytics not supported in this environment');
    return null;
  } catch (error) {
    console.error('Firebase Analytics initialization error:', error);
    return null;
  }
};

export default app;
