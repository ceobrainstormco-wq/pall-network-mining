import { useState } from 'react';
import { NewUpgradeCard } from './NewUpgradeCard';
import { UpgradeStatus } from './UpgradeStatus';
import { NEW_UPGRADE_PACKAGES } from '@/types/new-upgrades';
import { Shield, Wallet, AlertTriangle, Users, DollarSign, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

export function NewUpgradePanel() {
  const { user } = useAuth();
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [activeUpgrade, setActiveUpgrade] = useState<any>(null);

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
          Premium Mining Packages
        </h2>
        <p className="text-slate-400 max-w-3xl mx-auto">
          Unlock incredible mining speeds and earn referral commissions with our premium packages. 
          Pay with USDT on BNB Smart Chain.
        </p>
      </div>

      {/* Benefits Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-slate-800/20 backdrop-blur-md border-cyan-500/20">
          <CardContent className="p-4 text-center">
            <Zap className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-1">Speed Boosts</h3>
            <p className="text-sm text-slate-400">Up to 6000% faster mining</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/20 backdrop-blur-md border-green-500/20">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-1">Referral System</h3>
            <p className="text-sm text-slate-400">5% F1 + 2.5% F2 commissions</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/20 backdrop-blur-md border-purple-500/20">
          <CardContent className="p-4 text-center">
            <DollarSign className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-1">Profit Sharing</h3>
            <p className="text-sm text-slate-400">Monthly PALL rewards</p>
          </CardContent>
        </Card>
      </div>

      {/* Current Status */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Wallet className="w-5 h-5 mr-2 text-cyan-400" />
          Current Status
        </h3>
        <UpgradeStatus />
      </div>

      {/* Wallet Status */}
      {!walletConnected && (
        <div className="mb-6 bg-orange-500/10 border border-orange-500/30 rounded-xl p-6">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-orange-400 mr-4 mt-0.5" />
            <div>
              <div className="text-orange-400 font-medium text-lg mb-2">Connect MetaMask Wallet</div>
              <div className="text-orange-300 mb-4">
                You need to connect your MetaMask wallet to purchase upgrade packages with USDT on BNB Smart Chain.
              </div>
              <div className="bg-orange-500/20 rounded-lg p-4">
                <h4 className="font-medium text-orange-300 mb-2">Important Notes:</h4>
                <ul className="text-sm text-orange-200 space-y-1">
                  <li>• Each package can only be purchased once per user</li>
                  <li>• Payment is processed securely via your MetaMask wallet</li>
                  <li>• Package activation is immediate after payment confirmation</li>
                  <li>• Referral commissions are paid instantly in USDT</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Connected Wallet Info */}
      {walletConnected && walletAddress && (
        <div className="mb-6 bg-green-500/10 border border-green-500/30 rounded-xl p-4">
          <div className="flex items-center">
            <Wallet className="w-5 h-5 text-green-400 mr-3" />
            <div>
              <div className="text-green-400 font-medium">Wallet Connected</div>
              <div className="text-green-300 text-sm font-mono">
                {walletAddress.slice(0, 8)}...{walletAddress.slice(-6)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security & Payment Info */}
      <Card className="mb-8 bg-slate-800/20 backdrop-blur-md border-slate-700/30">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Shield className="w-5 h-5 mr-2 text-cyan-400" />
            Security & Payment Info
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-white mb-2">Package Restrictions</h4>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• One package purchase per user (lifetime)</li>
                <li>• Can upgrade to higher tier packages</li>
                <li>• Instant activation after payment</li>
                <li>• No KYC verification required</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Referral Commissions</h4>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• F1 referrals: 5% commission in USDT</li>
                <li>• F2 referrals: 2.5% commission in USDT</li>
                <li>• Instant payout to your wallet</li>
                <li>• Automatic commission calculation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upgrade Packages */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
          <Zap className="w-5 h-5 mr-2 text-cyan-400" />
          Available Packages
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {NEW_UPGRADE_PACKAGES.map((pkg) => (
            <NewUpgradeCard
              key={pkg.id}
              package={pkg}
              isActive={activeUpgrade?.packageId === pkg.id}
              disabled={!!activeUpgrade && activeUpgrade.packageId !== pkg.id}
              walletConnected={walletConnected}
            />
          ))}
        </div>
      </div>

      {/* Additional Benefits */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-center text-white">
            All Packages Include
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="text-center">
              <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <h4 className="font-medium text-white mb-1">Monthly Profit Sharing</h4>
              <p className="text-sm text-slate-400">Receive monthly PALL token dividends</p>
            </div>
            <div className="text-center">
              <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <h4 className="font-medium text-white mb-1">Referral Earnings</h4>
              <p className="text-sm text-slate-400">Earn from F1 and F2 referrals</p>
            </div>
            <div className="text-center">
              <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <h4 className="font-medium text-white mb-1">Booster Increases</h4>
              <p className="text-sm text-slate-400">Enhanced booster buy percentages</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}