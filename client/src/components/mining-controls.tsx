import { useMining } from "@/hooks/use-mining";
import { useAuth } from "@/contexts/AuthContext";
import { Zap, RefreshCw, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MiningControls() {
  const { canMine, remainingTime, handleMining, formatTime } = useMining();
  const { user } = useAuth();

  return (
    <div className="bg-slate-800/30 backdrop-blur-md rounded-2xl p-6 mb-6 border border-purple-500/20 shadow-2xl shadow-purple-500/10">
      {/* Mining Button */}
      <Button
        onClick={handleMining}
        disabled={!canMine || !user}
        data-testid="mine-button"
        className={`w-full font-bold py-4 px-8 text-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg mb-4 ${
          canMine && user
            ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 hover:shadow-cyan-500/25 text-white' 
            : 'bg-slate-600 text-slate-400 cursor-not-allowed hover:scale-100'
        }`}
        style={{ height: 'auto' }}
      >
        <span className="flex items-center justify-center">
          {!user ? (
            <>
              <Lock className="w-6 h-6 mr-2" />
              Please sign in to start mining
            </>
          ) : canMine ? (
            <>
              <Zap className="w-6 h-6 mr-2" />
              Start Mining
            </>
          ) : (
            <>
              <RefreshCw className="w-6 h-6 mr-2 animate-spin" />
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
