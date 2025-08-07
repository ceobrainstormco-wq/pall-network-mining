import { MiningDashboard } from "@/components/mining-dashboard";
import { UserProfile } from "@/components/auth/UserProfile";
import { UpgradeStatus } from "@/components/upgrades/UpgradeStatus";
import { HamburgerMenu } from "@/components/navigation/HamburgerMenu";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-slate-900 text-slate-50 font-sans">
      {/* Futuristic Crypto Background */}
      <div className="fixed inset-0 pointer-events-none">
        <img 
          src="/crypto-background.svg" 
          alt="" 
          className="w-full h-full object-cover opacity-60"
          style={{ minWidth: '100vw', minHeight: '100vh' }}
        />
        {/* Additional gradient overlay for depth */}
        <div 
          className="absolute inset-0 opacity-40" 
          style={{
            background: "radial-gradient(ellipse at center, transparent 0%, rgba(15, 23, 42, 0.8) 70%, rgba(15, 23, 42, 0.95) 100%)"
          }}
        />
      </div>

      {/* Hamburger Menu */}
      <HamburgerMenu />

      {/* Main Container */}
      <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
        {/* Header */}
        <header className="text-center mb-8">
          {/* App Logo/Icon */}
          <div className="w-16 h-16 rounded-2xl overflow-hidden mb-4 mx-auto shadow-lg border-2 border-cyan-400/30">
            <img 
              src="/pall-logo.jpg" 
              alt="Pall Network Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* App Name */}
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent mb-2">
            Pall Network
          </h1>
          <p className="text-slate-400 text-lg">Crypto Mining Simulator</p>
        </header>

        {/* User Profile */}
        <div className="w-full max-w-md mx-auto mb-4">
          <UserProfile />
        </div>

        {/* Upgrade Status */}
        <div className="w-full max-w-md mx-auto mb-4">
          <UpgradeStatus />
        </div>

        {/* Navigation */}
        <div className="w-full max-w-md mx-auto mb-6">
          <Link href="/upgrades">
            <Button 
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 transition-all duration-300 hover:scale-105"
              data-testid="upgrades-button"
            >
              <Zap className="w-5 h-5 mr-2" />
              Mining Speed Upgrades
            </Button>
          </Link>
        </div>

        {/* Mining Dashboard */}
        <MiningDashboard />

        {/* Footer */}
        <footer className="mt-8 text-center text-slate-500 text-sm">
          <p>&copy; 2024 Pall Network. Mining simulation app.</p>
        </footer>
      </div>
    </div>
  );
}
