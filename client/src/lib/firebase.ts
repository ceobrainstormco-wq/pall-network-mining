import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration with your new project
const firebaseConfig = {
  apiKey: "AIzaSyDAWM_IEJI6kHo4Ov-8DyRXOvZcEn3mLg8",
  authDomain: "pall-network-mining.firebaseapp.com",
  projectId: "pall-network-mining", 
  storageBucket: "pall-network-mining.appspot.com",
  appId: "1:912242352810:web:8873d57f25d1a7412466d3",
};

// Force console log to verify correct config is loaded
console.log("🔥 Firebase Config Loaded:", {
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  hasApiKey: !!firebaseConfig.apiKey,
  timestamp: new Date().toISOString()
});

console.log("🔥 Full Config Check:", firebaseConfig);

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