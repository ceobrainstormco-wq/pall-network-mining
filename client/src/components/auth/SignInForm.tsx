import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';

export function SignInForm() {
  const { signInWithGoogle, signInWithFacebook, signInWithTwitter } = useAuth();
  const { toast } = useToast();
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const handleSignIn = async (provider: 'google' | 'facebook' | 'twitter') => {
    setLoadingProvider(provider);
    try {
      switch (provider) {
        case 'google':
          await signInWithGoogle();
          break;
        case 'facebook':
          await signInWithFacebook();
          break;
        case 'twitter':
          await signInWithTwitter();
          break;
      }
      
      toast({
        title: "Welcome to Pall Network!",
        description: "You're now signed in and ready to start mining.",
      });
    } catch (error: any) {
      console.error(`${provider} sign in error:`, error);
      
      let errorMessage = `There was an error signing in with ${provider}. Please try again.`;
      
      if (error.code === 'auth/popup-blocked') {
        errorMessage = "Popup was blocked. Please allow popups and try again.";
      } else if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = "Sign-in was cancelled. Please try again.";
      } else if (error.code === 'auth/unauthorized-domain') {
        errorMessage = "This domain is not authorized. Please contact support.";
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = `${provider} sign-in is not enabled. Please contact support.`;
      }
      
      toast({
        title: "Sign In Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-900 text-slate-50 font-sans">
      {/* Futuristic Crypto Background */}
      <div className="fixed inset-0 pointer-events-none">
        <img 
          src="/crypto-background.svg" 
          alt="" 
          className="w-full h-full object-cover opacity-60"
          style={{ minWidth: '100vw', minHeight: '100vh' }}
        />
        {/* Additional gradient overlay for depth */}
        <div 
          className="absolute inset-0 opacity-40" 
          style={{
            background: "radial-gradient(ellipse at center, transparent 0%, rgba(15, 23, 42, 0.8) 70%, rgba(15, 23, 42, 0.95) 100%)"
          }}
        />
      </div>

      {/* Sign In Content */}
      <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
        {/* Header */}
        <header className="text-center mb-8">
          {/* App Logo/Icon */}
          <div className="w-16 h-16 rounded-2xl overflow-hidden mb-4 mx-auto shadow-lg border-2 border-cyan-400/30">
            <img 
              src="/pall-logo-new.svg" 
              alt="Pall Network Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* App Name */}
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent mb-2">
            Pall Network
          </h1>
          <p className="text-slate-400 text-lg">Crypto Mining Simulator</p>
        </header>

        {/* Sign In Card */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-slate-800/30 backdrop-blur-md rounded-2xl p-8 border border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
            {/* Welcome Message */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-6 h-6 text-yellow-900" />
              </div>
              <h2 className="text-2xl font-bold text-cyan-400 mb-2">Authentication Required</h2>
              <p className="text-slate-400">Please sign in to start mining PALL tokens</p>
            </div>

            {/* Simple Google Sign In - Testing Mode */}
            <div className="space-y-4">
              <Button
                onClick={() => handleSignIn('google')}
                disabled={loadingProvider !== null}
                data-testid="google-signin-button"
                className="w-full font-bold py-4 px-6 text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg bg-white hover:bg-gray-50 text-gray-700 border border-gray-300"
                style={{ height: 'auto' }}
              >
                <span className="flex items-center justify-center">
                  {loadingProvider === 'google' ? (
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
                </span>
              </Button>

              {/* Temporarily disabled other providers for testing */}
              <div className="text-center text-sm text-slate-500">
                <p>Facebook and Twitter sign-in coming soon</p>
              </div>
            </div>

            {/* Info Text */}
            <div className="mt-6 text-center text-sm text-slate-500">
              <p>Secure authentication powered by Firebase</p>
              <p className="mt-1">Your mining progress will be saved to your account</p>
              <p className="mt-1">Choose any provider to get started</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-slate-500 text-sm">
          <p>&copy; 2024 Pall Network. Mining simulation app.</p>
        </footer>
      </div>
    </div>
  );
}