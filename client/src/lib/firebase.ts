import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: `${import.meta.env.VITE_FIREBASE_APP_ID}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_APP_ID,
  storageBucket: `${import.meta.env.VITE_FIREBASE_APP_ID}.appspot.com`,
  appId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

// Debug: Log Firebase config (without API key for security)
console.log('Firebase Config Check:', {
  hasApiKey: !!firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  hasAppId: !!firebaseConfig.appId,
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Auth Provider with additional settings
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');

export default app;