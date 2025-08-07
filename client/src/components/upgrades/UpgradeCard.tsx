import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Clock, Crown, Wallet } from 'lucide-react';
import { UpgradePackage } from '@/types/upgrades';
import { useUpgrades } from '@/hooks/use-upgrades';

interface UpgradeCardProps {
  package: UpgradePackage;
  isActive?: boolean;
  disabled?: boolean;
}

export function UpgradeCard({ package: pkg, isActive = false, disabled = false }: UpgradeCardProps) {
  const { purchaseUpgrade, isProcessing, walletConnected } = useUpgrades();
  const [purchasing, setPurchasing] = useState(false);

  const handlePurchase = async () => {
    setPurchasing(true);
    try {
      await purchaseUpgrade(pkg);
    } finally {
      setPurchasing(false);
    }
  };

  const getIcon = () => {
    switch (pkg.id) {
      case '6month':
        return <Clock className="w-6 h-6" />;
      case '1year':
        return <Zap className="w-6 h-6" />;
      case 'unlimited':
        return <Crown className="w-6 h-6" />;
      default:
        return <Zap className="w-6 h-6" />;
    }
  };

  const getGradient = () => {
    switch (pkg.id) {
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

  return (
    <div className={`relative bg-slate-800/30 backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 ${
      isActive 
        ? 'border-green-500/50 shadow-lg shadow-green-500/20' 
        : pkg.popular
        ? 'border-purple-500/30 shadow-lg shadow-purple-500/10'
        : 'border-slate-700/30 hover:border-cyan-500/30'
    }`}>
      {/* Popular Badge */}
      {pkg.popular && !isActive && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1">
            Most Popular
          </Badge>
        </div>
      )}

      {/* Active Badge */}
      {isActive && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1">
            Active
          </Badge>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <div className={`w-12 h-12 bg-gradient-to-r ${getGradient()} rounded-full flex items-center justify-center mx-auto mb-3`}>
          {getIcon()}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
        <p className="text-slate-400 text-sm">{pkg.description}</p>
      </div>

      {/* Speed Multiplier */}
      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-cyan-400 mb-1">
          {pkg.speedMultiplier}x
        </div>
        <div className="text-slate-400 text-sm">Mining Speed</div>
      </div>

      {/* Duration */}
      <div className="text-center mb-6">
        <div className="text-lg font-semibold text-white mb-1">
          {pkg.duration === 0 ? 'Lifetime' : `${pkg.duration} Month${pkg.duration > 1 ? 's' : ''}`}
        </div>
        <div className="text-slate-400 text-sm">Duration</div>
      </div>

      {/* Price */}
      <div className="text-center mb-6">
        <div className="text-2xl font-bold text-green-400 mb-1">
          ${pkg.priceUSDT} USDT
        </div>
        <div className="text-slate-400 text-sm">One-time payment</div>
      </div>

      {/* Purchase Button */}
      <Button
        onClick={handlePurchase}
        disabled={disabled || isActive || purchasing || isProcessing}
        data-testid={`upgrade-${pkg.id}-button`}
        className={`w-full font-bold py-3 px-6 text-lg transition-all duration-300 ${
          isActive
            ? 'bg-green-600 text-white cursor-not-allowed'
            : `bg-gradient-to-r ${getGradient()} hover:shadow-lg hover:scale-105 text-white`
        }`}
      >
        {isActive ? (
          'Currently Active'
        ) : purchasing || isProcessing ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            Processing...
          </div>
        ) : !walletConnected ? (
          <div className="flex items-center justify-center">
            <Wallet className="w-5 h-5 mr-2" />
            Connect Wallet
          </div>
        ) : (
          `Upgrade Now`
        )}
      </Button>

      {/* Benefits */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center text-sm text-slate-300">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
          {pkg.speedMultiplier}x faster token mining
        </div>
        <div className="flex items-center text-sm text-slate-300">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
          Instant activation
        </div>
        <div className="flex items-center text-sm text-slate-300">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
          Secure BEP-20 payment
        </div>
      </div>
    </div>
  );
}