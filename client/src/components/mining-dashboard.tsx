import { MiningControls } from "./mining-controls";
import { useMiningDb } from "@/hooks/use-mining-db";
import { DollarSign } from "lucide-react";

export function MiningDashboard() {
  const { coins: totalCoins, canMine, timeUntilNextMine: remainingTime, speedMultiplier, isLoading } = useMiningDb();

  if (isLoading) {
    return (
      <main className="w-full max-w-md mx-auto">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full max-w-md mx-auto">
      {/* Mining Stats Card */}
      <div className="bg-slate-800/30 backdrop-blur-md rounded-2xl p-6 mb-6 border border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
        {/* Coin Counter */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mr-2 icon-interactive">
              <DollarSign className="w-5 h-5 text-yellow-900" />
            </div>
            <h2 className="text-2xl font-semibold text-slate-300">Total Coins</h2>
          </div>
          <div 
            className="text-5xl md:text-6xl font-bold text-cyan-400 mb-2 transition-all duration-500 hover:scale-105 cursor-pointer" 
            data-testid="coin-counter"
            id="coinCounter"
          >
            {totalCoins.toLocaleString()}
          </div>
          <p className="text-slate-400">PALL Tokens Mined</p>
        </div>

        {/* Mining Status */}
        <div className="flex items-center justify-center mb-4" data-testid="mining-status">
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${canMine ? 'bg-green-400 animate-pulse' : 'bg-orange-400'}`} />
            <span className={`font-medium ${canMine ? 'text-green-400' : 'text-orange-400'}`}>
              {canMine ? 'Ready to Mine' : 'Cooldown Active'}
            </span>
          </div>
        </div>
      </div>

      {/* Mining Controls */}
      <MiningControls />

      {/* Mining Info */}
      <div className="bg-slate-800/20 backdrop-blur-md rounded-xl p-4 border border-purple-500/20 shadow-lg shadow-purple-500/10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-slate-400">Mining Rate:</span>
          <span className="text-green-400 font-semibold">{speedMultiplier} PALL / Click</span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-slate-400">Speed Multiplier:</span>
          <span className={`font-semibold ${speedMultiplier > 1 ? 'text-cyan-400' : 'text-slate-400'}`}>
            {speedMultiplier}x
          </span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-slate-400">Cooldown:</span>
          <span className="text-orange-400 font-semibold">24 Hours</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Network:</span>
          <span className="text-cyan-400 font-semibold">Pall Blockchain</span>
        </div>
      </div>
    </main>
  );
}
