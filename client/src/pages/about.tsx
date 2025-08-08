import { Button } from '@/components/ui/button';
import { HamburgerMenu } from '@/components/navigation/HamburgerMenu';
import { Link } from 'wouter';
import { ArrowLeft, Info, Shield, Users, Zap } from 'lucide-react';

export default function About() {
  return (
    <div className="relative min-h-screen bg-slate-900 text-slate-50 font-sans">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <img 
          src="/crypto-background.svg" 
          alt="" 
          className="w-full h-full object-cover opacity-60"
          style={{ minWidth: '100vw', minHeight: '100vh' }}
        />
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
      <div className="relative min-h-screen flex flex-col p-6 py-16">
        {/* Back Button */}
        <div className="mb-6">
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
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl overflow-hidden mb-4 mx-auto shadow-lg border-2 border-cyan-400/30">
            <img 
              src="/pall-logo-new.svg" 
              alt="Pall Network Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent mb-2">
            About Pall Network
          </h1>
          <p className="text-slate-400">v1.0</p>
        </div>

        {/* About Content */}
        <div className="w-full max-w-2xl mx-auto space-y-6">
          {/* Main Description */}
          <div className="bg-slate-800/30 backdrop-blur-md rounded-2xl p-6 border border-slate-700/30">
            <div className="prose prose-invert max-w-none">
              <p className="text-slate-300 leading-relaxed mb-4">
                <strong className="text-cyan-400">Pall Network</strong> is a decentralized Web3 project focused on bringing blockchain mining and earning opportunities to mobile users around the world. Our vision is to empower individuals by giving them access to secure, user-friendly, and innovative tools to participate in the growing crypto economy — right from their smartphones.
              </p>
              
              <p className="text-slate-300 leading-relaxed mb-4">
                Through our app, users can mine Pall Tokens, build strong teams, and earn rewards in a fair and transparent environment. Our platform integrates Web3 technologies like MetaMask, smart contracts, and BEP-20 token standards to ensure security, transparency, and true ownership of digital assets.
              </p>
              
              <p className="text-slate-300 leading-relaxed">
                We believe in community growth, long-term sustainability, and the power of blockchain to change lives. Join us in this digital revolution — and be a part of the future.
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-800/30 backdrop-blur-md rounded-xl p-4 border border-slate-700/30">
              <div className="flex items-center mb-3">
                <Zap className="w-6 h-6 text-yellow-400 mr-3" />
                <h3 className="font-semibold text-yellow-400">Mobile Mining</h3>
              </div>
              <p className="text-sm text-slate-300">
                Mine PALL tokens directly from your smartphone with our optimized mining system.
              </p>
            </div>

            <div className="bg-slate-800/30 backdrop-blur-md rounded-xl p-4 border border-slate-700/30">
              <div className="flex items-center mb-3">
                <Shield className="w-6 h-6 text-green-400 mr-3" />
                <h3 className="font-semibold text-green-400">Web3 Security</h3>
              </div>
              <p className="text-sm text-slate-300">
                Built on blockchain technology with MetaMask integration for maximum security.
              </p>
            </div>

            <div className="bg-slate-800/30 backdrop-blur-md rounded-xl p-4 border border-slate-700/30">
              <div className="flex items-center mb-3">
                <Users className="w-6 h-6 text-blue-400 mr-3" />
                <h3 className="font-semibold text-blue-400">Team Building</h3>
              </div>
              <p className="text-sm text-slate-300">
                Invite friends and build your network to earn additional rewards together.
              </p>
            </div>

            <div className="bg-slate-800/30 backdrop-blur-md rounded-xl p-4 border border-slate-700/30">
              <div className="flex items-center mb-3">
                <Info className="w-6 h-6 text-purple-400 mr-3" />
                <h3 className="font-semibold text-purple-400">Transparency</h3>
              </div>
              <p className="text-sm text-slate-300">
                All transactions are transparent and verifiable on the blockchain.
              </p>
            </div>
          </div>

          {/* Technical Information */}
          <div className="bg-slate-800/30 backdrop-blur-md rounded-2xl p-6 border border-slate-700/30">
            <h3 className="text-lg font-semibold text-cyan-400 mb-4">Technical Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-slate-300 mb-2">Platform</h4>
                <ul className="space-y-1 text-slate-400">
                  <li>• Progressive Web App (PWA)</li>
                  <li>• Mobile-first design</li>
                  <li>• Cross-platform compatibility</li>
                  <li>• Offline capabilities</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-300 mb-2">Blockchain</h4>
                <ul className="space-y-1 text-slate-400">
                  <li>• BNB Smart Chain network</li>
                  <li>• USDT BEP-20 payments</li>
                  <li>• MetaMask integration</li>
                  <li>• Smart contract security</li>
                </ul>
              </div>
            </div>
          </div>

          {/* App Information */}
          <div className="bg-slate-800/20 backdrop-blur-md rounded-xl p-4 border border-slate-700/30 text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 rounded-lg overflow-hidden mr-2">
                <img 
                  src="/pall-logo.jpg" 
                  alt="Pall Network" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-semibold text-slate-300">Pall Network</h4>
            </div>
            <p className="text-sm text-slate-400 mb-2" data-testid="app-version">
              Version 1.0.0
            </p>
            <p className="text-xs text-slate-500">
              &copy; 2024 Pall Network. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}