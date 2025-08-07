import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged, signInWithRedirect, getRedirectResult, signOut } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
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
          console.log('Redirect sign-in successful:', result.user.email);
        }
      } catch (error) {
        console.error('Redirect result error:', error);
      }
    };

    checkRedirectResult();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      console.log('Attempting Google sign-in with redirect...');
      console.log('Auth domain being used:', auth.app.options.authDomain);
      await signInWithRedirect(auth, googleProvider);
      // Note: signInWithRedirect doesn't return a result immediately
      // The user will be redirected and come back to this page
    } catch (error: any) {
      console.error('Error signing in with Google:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      // Provide more user-friendly error messages
      if (error.code === 'auth/operation-not-allowed') {
        throw new Error('Google sign-in is not enabled. Please contact support.');
      } else if (error.code === 'auth/unauthorized-domain') {
        throw new Error('This domain is not authorized. Please contact support.');
      }
      
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
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}