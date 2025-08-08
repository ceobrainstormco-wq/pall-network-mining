import { useMiningDb } from "@/hooks/use-mining-db";
import { useAuth } from "@/contexts/AuthContext";
import { Zap, RefreshCw, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MiningControls() {
  const { mine, canMine, timeUntilNextMine: remainingTime, isMining } = useMiningDb();
  const { user } = useAuth();

  // Format remaining time for display
  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-slate-800/30 backdrop-blur-md rounded-2xl p-6 mb-6 border border-purple-500/20 shadow-2xl shadow-purple-500/10">
      {/* Mining Button */}
      <Button
        onClick={mine}
        disabled={!canMine || !user || isMining}
        data-testid="mine-button"
        className={`btn-interactive w-full font-bold py-4 px-8 text-xl mb-4 ${
          canMine && user
            ? 'mining-button bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 hover:shadow-cyan-500/25 text-white' 
            : 'bg-slate-600 text-slate-400 cursor-not-allowed hover:transform-none'
        } shadow-lg`}
        style={{ height: 'auto' }}
      >
        <span className="flex items-center justify-center">
          {!user ? (
            <>
              <Lock className="icon-interactive w-6 h-6 mr-2" />
              Please sign in to start mining
            </>
          ) : isMining ? (
            <>
              <RefreshCw className="icon-interactive w-6 h-6 mr-2 animate-spin" />
              Mining...
            </>
          ) : canMine ? (
            <>
              <Zap className="icon-interactive w-6 h-6 mr-2" />
              Start Mining
            </>
          ) : (
            <>
              <RefreshCw className="icon-interactive w-6 h-6 mr-2" />
              Mining Cooldown
            </>
          )}
        </span>
      </Button>

      {/* Timer Display */}
      {!user ? (
        <div className="text-center" data-testid="auth-message">
          <div className="text-slate-400 text-sm">Sign in with Google to unlock mining capabilities</div>
        </div>
      ) : !canMine && (
        <div className="text-center" data-testid="timer-display">
          <div className="text-slate-400 text-sm mb-2">Next mining available in:</div>
          <div className="text-2xl font-bold text-orange-400" data-testid="countdown-timer">
            {formatTime(remainingTime)}
          </div>
        </div>
      )}
    </div>
  );
}
