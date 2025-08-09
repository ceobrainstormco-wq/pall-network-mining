import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged, signInWithRedirect, signInWithPopup, getRedirectResult, signOut } from 'firebase/auth';
import { auth, googleProvider, facebookProvider, twitterProvider } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signInWithTwitter: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for redirect result on page load
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          console.log('🔥 Redirect sign-in successful:', result.user.email);
          await syncUserWithDatabase(result.user);
        }
      } catch (error: any) {
        console.error('🔥 Redirect result error:', error);
      }
    };
    
    checkRedirectResult();
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      // Sync user data with database when authenticated
      if (user) {
        try {
          await syncUserWithDatabase(user);
        } catch (error) {
          console.error('Error syncing user with database:', error);
        }
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Helper function to sync Firebase user with database
  const syncUserWithDatabase = async (firebaseUser: User) => {
    try {
      const response = await fetch('/api/auth/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          profilePicture: firebaseUser.photoURL,
          provider: firebaseUser.providerData[0]?.providerId || 'unknown',
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to sync user with database');
      }
    } catch (error) {
      console.error('Database sync error:', error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      console.log('🔥 Starting Google sign-in with popup...');
      console.log('🔥 Current domain:', window.location.origin);
      console.log('🔥 Firebase config check:', {
        authDomain: auth.app.options.authDomain,
        projectId: auth.app.options.projectId,
        hasApiKey: !!auth.app.options.apiKey
      });
      
      // Use popup for better custom domain compatibility
      const result = await signInWithPopup(auth, googleProvider);
      
      if (result.user) {
        console.log('🔥 Google sign-in successful:', result.user.email);
        await syncUserWithDatabase(result.user);
      }
      
    } catch (error: any) {
      console.error('🔥 Google sign-in error:', error);
      console.error('🔥 Error code:', error.code);
      console.error('🔥 Error message:', error.message);
      
      // If popup fails, try redirect as fallback
      if (error.code === 'auth/popup-blocked' || error.code === 'auth/popup-closed-by-user') {
        console.log('🔥 Popup failed, trying redirect...');
        await signInWithRedirect(auth, googleProvider);
      } else {
        throw error;
      }
    }
  };

  const signInWithFacebook = async () => {
    try {
      await signInWithRedirect(auth, facebookProvider);
    } catch (error: any) {
      console.error('Error signing in with Facebook:', error);
      throw error;
    }
  };

  const signInWithTwitter = async () => {
    try {
      await signInWithRedirect(auth, twitterProvider);
    } catch (error: any) {
      console.error('Error signing in with Twitter:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signInWithGoogle,
    signInWithFacebook,
    signInWithTwitter,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}