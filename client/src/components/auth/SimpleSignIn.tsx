import { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { FaGoogle } from 'react-icons/fa';

export function SimpleSignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');
      
      console.log('Starting Google sign-in...');
      console.log('Firebase config:', {
        authDomain: auth.app.options.authDomain,
        projectId: auth.app.options.projectId,
        apiKey: auth.app.options.apiKey ? 'present' : 'missing'
      });

      const result = await signInWithPopup(auth, provider);
      
      console.log('Sign-in successful:', result.user.email);
      
      toast({
        title: "Sign In Successful!",
        description: `Welcome ${result.user.displayName}!`,
      });
    } catch (error: any) {
      console.error('Sign-in error:', error);
      
      let errorMessage = "Sign-in failed. Please try again.";
      
      if (error.code === 'auth/popup-blocked') {
        errorMessage = "Popup was blocked. Please allow popups and try again.";
      } else if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = "Sign-in was cancelled.";
      } else if (error.code === 'auth/unauthorized-domain') {
        errorMessage = "This domain is not authorized. Please contact support.";
      } else if (error.code === 'auth/invalid-api-key') {
        errorMessage = "Invalid API key configuration.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Sign In Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-slate-800/50 border-slate-700">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-cyan-400">Sign In</CardTitle>
        <CardDescription className="text-slate-300">
          Sign in to start mining PALL tokens
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          data-testid="google-signin-button"
          className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-bold py-3 px-6 text-lg transition-all duration-300"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-3" />
              Signing in...
            </>
          ) : (
            <>
              <FaGoogle className="w-5 h-5 mr-3 text-red-500" />
              Continue with Google
            </>
          )}
        </Button>
        
        <div className="mt-4 text-center text-sm text-slate-400">
          <p>Secure authentication powered by Firebase</p>
        </div>
      </CardContent>
    </Card>
  );
}