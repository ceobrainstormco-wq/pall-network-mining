import { Button } from '@/components/ui/button';
import { HamburgerMenu } from '@/components/navigation/HamburgerMenu';
import { Link } from 'wouter';
import { ArrowLeft, Shield, Clock } from 'lucide-react';

export default function KYC() {
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
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent mb-2">
            KYC Verification
          </h1>
          <p className="text-slate-400">Know Your Customer verification process</p>
        </div>

        {/* Coming Soon Content */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-slate-800/30 backdrop-blur-md rounded-2xl p-8 border border-slate-700/30 text-center">
            {/* Coming Soon Icon */}
            <div className="w-20 h-20 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-10 h-10 text-red-400" />
            </div>

            {/* Coming Soon Message */}
            <h2 className="text-2xl font-bold text-slate-300 mb-4" data-testid="coming-soon-title">
              Coming Soon
            </h2>
            <p className="text-slate-400 mb-6 leading-relaxed">
              KYC verification features are currently under development. This will allow you to verify your identity for enhanced security and access to premium features.
            </p>

            {/* What to Expect */}
            <div className="bg-slate-700/30 rounded-xl p-4 mb-6">
              <h3 className="font-semibold text-red-400 mb-3">What to Expect</h3>
              <ul className="space-y-2 text-sm text-slate-300 text-left">
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  Identity document verification
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  Enhanced account security
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  Access to premium features
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  Increased transaction limits
                </li>
              </ul>
            </div>

            {/* Notification Button */}
            <Button
              disabled
              className="w-full bg-slate-700/50 text-slate-400 cursor-not-allowed"
              data-testid="notify-button"
            >
              Get Notified When Available
            </Button>
          </div>

          {/* Security Note */}
          <div className="mt-6 bg-slate-800/20 backdrop-blur-md rounded-xl p-4 border border-slate-700/30">
            <div className="flex items-start">
              <Shield className="w-5 h-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-cyan-400 mb-1">Security First</h4>
                <p className="text-sm text-slate-300">
                  Your personal information will be encrypted and stored securely. We follow industry-standard KYC practices to protect your data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}