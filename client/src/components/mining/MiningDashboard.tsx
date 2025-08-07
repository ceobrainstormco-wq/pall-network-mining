import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Pickaxe, Coins, Clock, Zap, TrendingUp } from 'lucide-react';
import { useMiningDb } from '@/hooks/use-mining-db';

export function MiningDashboard() {
  const {
    coins,
    lastMineTime,
    miningStreak,
    speedMultiplier,
    canMine,
    timeUntilNextMine,
    isLoading,
    error,
    mine,
    isMining,
  } = useMiningDb();

  const [displayTime, setDisplayTime] = useState('');

  // Format remaining time for display
  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Update countdown display
  useEffect(() => {
    if (timeUntilNextMine > 0) {
      const timer = setInterval(() => {
        setDisplayTime(formatTime(timeUntilNextMine));
      }, 1000);
      
      return () => clearInterval(timer);
    } else {
      setDisplayTime('');
    }
  }, [timeUntilNextMine]);

  const progressPercentage = timeUntilNextMine > 0 
    ? ((24 * 60 * 60 * 1000 - timeUntilNextMine) / (24 * 60 * 60 * 1000)) * 100 
    : 100;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500">Error loading mining data: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Mining Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-cyan-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-cyan-300">Total Coins</CardTitle>
            <Coins className="h-4 w-4 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{coins}</div>
            <p className="text-xs text-cyan-200">PALL tokens earned</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/20 to-red-600/20 border-orange-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-300">Mining Streak</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{miningStreak}</div>
            <p className="text-xs text-orange-200">consecutive mines</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 border-purple-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-300">Speed Multiplier</CardTitle>
            <Zap className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{speedMultiplier}x</div>
            <p className="text-xs text-purple-200">mining speed</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Mining Interface */}
      <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-cyan-400 flex items-center justify-center gap-2">
            <Pickaxe className="h-6 w-6" />
            PALL Mining Station
          </CardTitle>
          <CardDescription className="text-slate-300">
            Mine PALL tokens every 24 hours
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Mining Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Mining Progress</span>
              <span className="text-cyan-400">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress 
              value={progressPercentage} 
              className="h-3 bg-slate-700"
            />
          </div>

          {/* Mining Button */}
          <div className="text-center">
            {canMine ? (
              <Button
                onClick={mine}
                disabled={isMining}
                size="lg"
                data-testid="mine-button"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-4 px-8 text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
              >
                {isMining ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Mining...
                  </>
                ) : (
                  <>
                    <Pickaxe className="w-5 h-5 mr-2" />
                    Mine PALL Tokens
                  </>
                )}
              </Button>
            ) : (
              <div className="space-y-3">
                <Button
                  disabled
                  size="lg"
                  className="w-full bg-slate-600 text-slate-300 font-bold py-4 px-8 text-lg cursor-not-allowed"
                  data-testid="mine-button-disabled"
                >
                  <Clock className="w-5 h-5 mr-2" />
                  Mining Cooldown Active
                </Button>
                
                {displayTime && (
                  <div className="text-center">
                    <Badge variant="secondary" className="text-lg px-4 py-2">
                      Next mine in: {displayTime}
                    </Badge>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Last Mine Info */}
          {lastMineTime && (
            <div className="text-center text-sm text-slate-400">
              Last mined: {lastMineTime.toLocaleString()}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}