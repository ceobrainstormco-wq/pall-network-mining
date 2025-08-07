import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Temporarily hardcode correct values since env vars are swapped
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "pall-network-app.firebaseapp.com",
  projectId: "pall-network-app", 
  storageBucket: "pall-network-app.appspot.com",
  appId: "1:513633967334:web:a242605682cc223a972f27",
};

// Debug: Log Firebase config (without API key for security)
console.log('Firebase Config Check:', {
  hasApiKey: !!firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  hasAppId: !!firebaseConfig.appId,
});

console.log('Environment Variables:', {
  PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  APP_ID: import.meta.env.VITE_FIREBASE_APP_ID,
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