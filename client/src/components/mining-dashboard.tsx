import { ContinuousMiningControls } from "./ContinuousMiningControls";
import { useContinuousMining } from "@/hooks/use-continuous-mining";
import { DollarSign } from "lucide-react";

export function MiningDashboard() {
  const { totalCoins, isActive, progressPercentage } = useContinuousMining();

  // No loading state needed for continuous mining

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
            <div className={`w-3 h-3 rounded-full mr-2 ${!isActive ? 'bg-green-400 animate-pulse' : 'bg-cyan-400 animate-pulse'}`} />
            <span className={`font-medium ${!isActive ? 'text-green-400' : 'text-cyan-400'}`}>
              {!isActive ? 'Ready to Mine' : `Mining Active - ${progressPercentage.toFixed(1)}%`}
            </span>
          </div>
        </div>
      </div>

      {/* Continuous Mining Controls */}
      <ContinuousMiningControls />
    </main>
  );
}
