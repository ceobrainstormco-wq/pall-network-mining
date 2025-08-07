import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider } from "firebase/auth";

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebasestorage.app`,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Debug: Log Firebase config and current domain
console.log('🔥 Firebase Config Check:', {
  hasApiKey: !!firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  hasAppId: !!firebaseConfig.appId,
  currentURL: typeof window !== 'undefined' ? window.location.origin : 'server-side'
});

console.log('🔥 Environment Variables:', {
  PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  APP_ID: import.meta.env.VITE_FIREBASE_APP_ID,
});

// Log the exact domain that needs to be added to Firebase authorized domains
if (typeof window !== 'undefined') {
  console.log('🔥 ADD THIS DOMAIN TO FIREBASE AUTHORIZED DOMAINS:', window.location.origin);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Auth Providers
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');

export const facebookProvider = new FacebookAuthProvider();
facebookProvider.addScope('email');

export const twitterProvider = new TwitterAuthProvider();

export default app;