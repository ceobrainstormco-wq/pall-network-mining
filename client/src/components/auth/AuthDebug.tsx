import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';

export function AuthDebug() {
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    const checkAuthStatus = () => {
      const info = {
        currentDomain: window.location.origin,
        firebaseDomain: auth.app.options.authDomain,
        projectId: auth.app.options.projectId,
        hasApiKey: !!auth.app.options.apiKey,
        currentUser: auth.currentUser?.email || 'Not signed in',
        timestamp: new Date().toISOString()
      };
      setDebugInfo(info);
      console.log('🔥 Auth Debug Info:', info);
    };

    checkAuthStatus();
    
    // Update on auth state changes
    const unsubscribe = auth.onAuthStateChanged(() => {
      checkAuthStatus();
    });

    return unsubscribe;
  }, []);

  // Only show in development
  if (import.meta.env.PROD) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded text-xs max-w-xs">
      <div className="font-bold mb-1">Auth Debug</div>
      <div>Domain: {debugInfo.currentDomain}</div>
      <div>Firebase: {debugInfo.firebaseDomain}</div>
      <div>User: {debugInfo.currentUser}</div>
      <div>API: {debugInfo.hasApiKey ? '✅' : '❌'}</div>
    </div>
  );
}