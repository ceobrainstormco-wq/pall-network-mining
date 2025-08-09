import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider } from "firebase/auth";

// Firebase configuration - DIRECT FIX for authentication domain issue
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "pall-network-mining.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebasestorage.app`,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Debug: Log Firebase config and current domain (Production Mode)
if (import.meta.env.DEV) {
  console.log('🔥 Firebase Config Check:', {
    hasApiKey: !!firebaseConfig.apiKey,
    authDomain: firebaseConfig.authDomain,
    projectId: firebaseConfig.projectId,
    hasAppId: !!firebaseConfig.appId,
    currentURL: typeof window !== 'undefined' ? window.location.origin : 'server-side'
  });
}

// Always log current domain for auth troubleshooting
if (typeof window !== 'undefined') {
  console.log('🔥 Domain Check - Current:', window.location.origin);
  console.log('🔥 Domain Check - Firebase Auth:', firebaseConfig.authDomain);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Auth Providers with custom parameters for domain issue fix
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const facebookProvider = new FacebookAuthProvider();
facebookProvider.addScope('email');

export const twitterProvider = new TwitterAuthProvider();

export default app;