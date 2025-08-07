import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function UserProfile() {
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Sign Out Failed",
        description: "There was an error signing out. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!user) return null;

  return (
    <div className="bg-slate-800/20 backdrop-blur-md rounded-xl p-4 mb-6 border border-cyan-500/20 shadow-lg shadow-cyan-500/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {user.photoURL ? (
            <img 
              src={user.photoURL} 
              alt={user.displayName || 'User'} 
              className="w-10 h-10 rounded-full border-2 border-cyan-400/50"
            />
          ) : (
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-cyan-400" data-testid="user-name">
              {user.displayName || 'Mining User'}
            </p>
            <p className="text-xs text-slate-400" data-testid="user-email">
              {user.email}
            </p>
          </div>
        </div>
        
        <Button
          onClick={handleLogout}
          variant="outline"
          size="sm"
          data-testid="logout-button"
          className="text-slate-300 border-slate-600 hover:bg-slate-700 hover:text-white"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}