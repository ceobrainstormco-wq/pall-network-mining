import { useUpgrades } from '@/hooks/use-upgrades';
import { Badge } from '@/components/ui/badge';
import { Zap, Clock, Crown, Infinity } from 'lucide-react';

export function UpgradeStatus() {
  const { activeUpgrade, speedMultiplier, getTimeUntilExpiry } = useUpgrades();

  if (!activeUpgrade) {
    return (
      <div className="bg-slate-800/20 backdrop-blur-md rounded-xl p-4 border border-slate-700/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center mr-3">
              <Zap className="w-4 h-4 text-slate-400" />
            </div>
            <div>
              <div className="text-sm font-medium text-slate-300">Standard Mining</div>
              <div className="text-xs text-slate-500">1x speed</div>
            </div>
          </div>
          <Badge variant="outline" className="text-slate-400 border-slate-600">
            Basic
          </Badge>
        </div>
      </div>
    );
  }

  const getIcon = () => {
    switch (activeUpgrade.packageId) {
      case '6month':
        return <Clock className="w-4 h-4 text-blue-400" />;
      case '1year':
        return <Zap className="w-4 h-4 text-purple-400" />;
      case 'unlimited':
        return <Crown className="w-4 h-4 text-yellow-400" />;
      default:
        return <Zap className="w-4 h-4 text-cyan-400" />;
    }
  };

  const getGradient = () => {
    switch (activeUpgrade.packageId) {
      case '6month':
        return 'from-blue-500 to-blue-600';
      case '1year':
        return 'from-purple-500 to-purple-600';
      case 'unlimited':
        return 'from-yellow-500 to-yellow-600';
      default:
        return 'from-cyan-500 to-cyan-600';
    }
  };

  const timeUntilExpiry = getTimeUntilExpiry(activeUpgrade);

  return (
    <div className="bg-slate-800/20 backdrop-blur-md rounded-xl p-4 border border-green-500/30 shadow-lg shadow-green-500/10">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className={`w-8 h-8 bg-gradient-to-r ${getGradient()} rounded-full flex items-center justify-center mr-3`}>
            {getIcon()}
          </div>
          <div>
            <div className="text-sm font-medium text-green-400" data-testid="active-package-name">
              {activeUpgrade.packageName}
            </div>
            <div className="text-xs text-slate-400">
              {speedMultiplier}x mining speed
            </div>
          </div>
        </div>
        <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          Active
        </Badge>
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center text-slate-400">
          {activeUpgrade.expiresAt ? (
            <>
              <Clock className="w-3 h-3 mr-1" />
              {timeUntilExpiry}
            </>
          ) : (
            <>
              <Infinity className="w-3 h-3 mr-1" />
              Lifetime access
            </>
          )}
        </div>
        <div className="text-cyan-400 font-medium" data-testid="speed-multiplier">
          {speedMultiplier}x Speed
        </div>
      </div>
    </div>
  );
}