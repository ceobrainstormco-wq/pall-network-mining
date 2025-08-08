import { useContinuousMining } from "@/hooks/use-continuous-mining";
import { useAuth } from "@/contexts/AuthContext";
import { Zap, RefreshCw, Lock, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

export function ContinuousMiningControls() {
  const {
    isActive,
    timeRemaining,
    progressPercentage,
    canStartMining,
    startMining,
    formatTime,
  } = useContinuousMining();
  const { user } = useAuth();

  return (
    <div className="space-y-4">
      {/* Mining Status Card */}
      <Card className="bg-slate-800/30 backdrop-blur-md border border-purple-500/20 shadow-2xl shadow-purple-500/10">
        <CardContent className="p-6">
          {/* Mining Button */}
          <Button
            onClick={startMining}
            disabled={!user || !canStartMining}
            className={`btn-interactive w-full font-bold py-4 px-8 text-xl mb-4 ${
              canStartMining && user
                ? 'mining-button bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 hover:shadow-cyan-500/25 text-white' 
                : 'bg-slate-600 text-slate-400 cursor-not-allowed hover:transform-none'
            } shadow-lg`}
            data-testid="continuous-mining-button"
            style={{ height: 'auto' }}
          >
            <span className="flex items-center justify-center">
              {!user ? (
                <>
                  <Lock className="icon-interactive w-6 h-6 mr-2" />
                  Please sign in to start mining
                </>
              ) : isActive ? (
                <>
                  <RefreshCw className="icon-interactive w-6 h-6 mr-2 animate-spin" />
                  Mining in Progress...
                </>
              ) : (
                <>
                  <Zap className="icon-interactive w-6 h-6 mr-2" />
                  Start 24h Mining
                </>
              )}
            </span>
          </Button>

          {/* Progress Section - Only show if mining is active */}
          {isActive && (
            <div className="space-y-4">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Mining Progress</span>
                  <span className="text-sm font-medium text-cyan-400">
                    {progressPercentage.toFixed(1)}%
                  </span>
                </div>
                <Progress 
                  value={progressPercentage} 
                  className="h-3 bg-slate-700"
                />
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Started</span>
                  <span>1 PALL Token</span>
                  <span>Complete</span>
                </div>
              </div>

              {/* Countdown Timer */}
              <div className="bg-slate-700/30 rounded-xl p-4 border border-cyan-500/20">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Clock className="icon-interactive w-5 h-5 text-cyan-400" />
                  <span className="text-slate-300 font-medium">Time Remaining</span>
                </div>
                <div 
                  className="text-3xl font-bold text-center text-cyan-400 font-mono"
                  data-testid="mining-countdown"
                >
                  {formatTime(timeRemaining)}
                </div>
                <div className="text-center text-xs text-slate-400 mt-2">
                  Mining will complete automatically
                </div>
              </div>

              {/* Mining Animation */}
              <div className="flex items-center justify-center space-x-2 py-2">
                <div className="flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                      style={{
                        animationDelay: `${i * 0.3}s`,
                        animationDuration: '1.5s'
                      }}
                    />
                  ))}
                </div>
                <span className="text-sm text-cyan-400 font-medium">
                  Mining PALL Token
                </span>
              </div>
            </div>
          )}

          {/* Instructions for non-authenticated users */}
          {!user && (
            <div className="text-center mt-4" data-testid="auth-message">
              <div className="text-slate-400 text-sm">
                Sign in with Google to start your 24-hour mining session
              </div>
            </div>
          )}

          {/* Instructions for ready-to-mine users */}
          {user && canStartMining && !isActive && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mt-4">
              <div className="text-center">
                <div className="text-green-400 font-medium mb-1">Ready to Mine!</div>
                <div className="text-sm text-slate-300">
                  Start a 24-hour mining session to earn 1 PALL token
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Mining Info Card */}
      <Card className="bg-slate-800/20 backdrop-blur-md border border-cyan-500/20">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Reward:</span>
              <span className="text-green-400 font-semibold">1 PALL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Duration:</span>
              <span className="text-cyan-400 font-semibold">24 Hours</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Network:</span>
              <span className="text-cyan-400 font-semibold">Pall Chain</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Type:</span>
              <span className="text-purple-400 font-semibold">Continuous</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}