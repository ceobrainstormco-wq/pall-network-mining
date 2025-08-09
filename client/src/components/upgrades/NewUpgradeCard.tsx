import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UpgradePackage } from '@/types/new-upgrades';
import { Zap, Check, Wallet, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NewUpgradeCardProps {
  package: UpgradePackage;
  isActive: boolean;
  disabled: boolean;
  walletConnected: boolean;
}

export function NewUpgradeCard({ package: pkg, isActive, disabled, walletConnected }: NewUpgradeCardProps) {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const { toast } = useToast();

  const handlePurchase = async () => {
    if (!walletConnected) {
      toast({
        title: "Wallet Required",
        description: "Please connect your MetaMask wallet first.",
        variant: "destructive",
      });
      return;
    }

    setIsPurchasing(true);
    
    try {
      // Here you would implement the Web3 payment logic
      // For now, we'll simulate the process
      toast({
        title: "Purchase Initiated",
        description: `Processing ${pkg.name} package payment...`,
      });
      
      // Simulate Web3 transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Package Activated!",
        description: `${pkg.name} package successfully purchased and activated.`,
      });
    } catch (error) {
      toast({
        title: "Purchase Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPurchasing(false);
    }
  };

  const speedMultiplier = (pkg.speedBoost / 100) + 1; // 200% = 3x speed

  return (
    <Card className={`relative overflow-hidden transition-all duration-300 hover:scale-[1.02] ${
      isActive 
        ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-400/50 shadow-lg shadow-green-500/20' 
        : 'bg-slate-800/30 backdrop-blur-md border-slate-700/30 hover:border-slate-600/50'
    }`}>
      {/* Badge */}
      <div className="absolute top-4 right-4">
        <Badge 
          variant={pkg.badge === 'POPULAR' ? 'default' : 'secondary'}
          className={`text-xs font-bold ${
            pkg.badge === 'POPULAR' 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
              : pkg.badge === 'ELITE'
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
              : 'bg-slate-600 text-slate-200'
          }`}
        >
          {pkg.badge}
        </Badge>
      </div>

      <CardHeader className="pb-4">
        <div className="flex items-center mb-2">
          <div 
            className="w-8 h-8 rounded-lg mr-3 flex items-center justify-center"
            style={{ backgroundColor: pkg.color.primary + '20' }}
          >
            <Zap className="w-4 h-4" style={{ color: pkg.color.primary }} />
          </div>
          <CardTitle className="text-xl font-bold" style={{ color: pkg.color.primary }}>
            {pkg.name}
          </CardTitle>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-white mb-1">${pkg.price}</div>
          <div className="text-sm text-slate-400">One-time payment</div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Speed Boost Highlight */}
        <div className="text-center p-4 rounded-lg bg-slate-700/30">
          <div className="text-2xl font-bold mb-1" style={{ color: pkg.color.primary }}>
            {speedMultiplier}x Speed
          </div>
          <div className="text-sm text-slate-400">
            {pkg.speedBoost}% faster mining
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2">
          {pkg.features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <Check className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-slate-300">{feature}</span>
            </div>
          ))}
        </div>

        {/* Purchase Button */}
        <div className="pt-4">
          {isActive ? (
            <Button 
              className="w-full bg-green-600 hover:bg-green-500 text-white"
              disabled
            >
              <Check className="w-4 h-4 mr-2" />
              Active Package
            </Button>
          ) : disabled ? (
            <Button 
              className="w-full"
              variant="outline"
              disabled
            >
              Already Purchased Different Package
            </Button>
          ) : !walletConnected ? (
            <Button 
              onClick={() => toast({
                title: "Connect Wallet",
                description: "Please connect your MetaMask wallet first.",
                variant: "destructive",
              })}
              className="w-full bg-orange-600 hover:bg-orange-500 text-white"
            >
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet to Purchase
            </Button>
          ) : (
            <Button 
              onClick={handlePurchase}
              disabled={isPurchasing}
              className="w-full font-bold py-3"
              style={{ 
                backgroundColor: pkg.color.primary,
                color: pkg.type === 'golden' || pkg.type === 'silver' ? '#000' : '#fff'
              }}
            >
              {isPurchasing ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Purchase {pkg.name}
                </>
              )}
            </Button>
          )}
        </div>

        {/* Payment Info */}
        {!isActive && !disabled && (
          <div className="text-center text-xs text-slate-500 pt-2">
            Payment via USDT (BNB Smart Chain)
          </div>
        )}
      </CardContent>
    </Card>
  );
}