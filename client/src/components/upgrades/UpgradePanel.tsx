import { UpgradeCard } from './UpgradeCard';
import { UpgradeStatus } from './UpgradeStatus';
import { useUpgrades } from '@/hooks/use-upgrades';
import { UPGRADE_PACKAGES } from '@/types/upgrades';
import { Shield, Wallet, AlertTriangle } from 'lucide-react';

export function UpgradePanel() {
  const { activeUpgrade, walletConnected, walletAddress } = useUpgrades();

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
          Mining Speed Upgrades
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Boost your PALL token mining speed with our premium upgrade packages. 
          Secure payments via USDT on BNB Smart Chain.
        </p>
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
        <div className="mb-6 bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-orange-400 mr-3" />
            <div>
              <div className="text-orange-400 font-medium">MetaMask Wallet Required</div>
              <div className="text-orange-300 text-sm">
                Connect your MetaMask wallet to purchase upgrades with USDT
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
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Packages */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-cyan-400" />
          Available Packages
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {UPGRADE_PACKAGES.map((pkg) => (
            <UpgradeCard
              key={pkg.id}
              package={pkg}
              isActive={activeUpgrade?.packageId === pkg.id}
              disabled={!!activeUpgrade && activeUpgrade.packageId !== pkg.id}
            />
          ))}
        </div>
      </div>

      {/* Security Info */}
      <div className="bg-slate-800/20 backdrop-blur-md rounded-xl p-6 border border-slate-700/30">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-green-400" />
          Security & Payment Info
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h5 className="font-semibold text-cyan-400 mb-2">Payment Security</h5>
            <ul className="space-y-1 text-slate-300">
              <li>• Payments processed via BNB Smart Chain</li>
              <li>• USDT BEP-20 token standard</li>
              <li>• MetaMask wallet integration</li>
              <li>• Transaction verification on blockchain</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-purple-400 mb-2">Upgrade Features</h5>
            <ul className="space-y-1 text-slate-300">
              <li>• Instant activation after payment</li>
              <li>• Automatic expiry handling</li>
              <li>• Persistent upgrade tracking</li>
              <li>• One-time payment per package</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}