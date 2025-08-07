import { UpgradePanel } from "@/components/upgrades/UpgradePanel";
import { HamburgerMenu } from "@/components/navigation/HamburgerMenu";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Upgrades() {
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
      <div className="relative min-h-screen flex flex-col items-center justify-center p-4 py-16">
        
        {/* Back Button */}
        <div className="absolute top-6 left-6">
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="bg-slate-800/50 border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:text-white"
              data-testid="back-button"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Mining
            </Button>
          </Link>
        </div>
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
          <p className="text-slate-400 text-lg">Mining Speed Upgrades</p>
        </header>

        {/* Upgrade Panel */}
        <UpgradePanel />

        {/* Footer */}
        <footer className="mt-16 text-center text-slate-500 text-sm">
          <p>&copy; 2024 Pall Network. Secure crypto mining upgrades.</p>
        </footer>
      </div>
    </div>
  );
}