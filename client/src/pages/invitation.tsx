import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { HamburgerMenu } from '@/components/navigation/HamburgerMenu';
import { Link } from 'wouter';
import { ArrowLeft, Gift, Copy, Users, Share } from 'lucide-react';

export default function Invitation() {
  const [inviteCode] = useState('PALL2024ABC');
  const [referrals] = useState(3);
  const { toast } = useToast();

  const copyInviteCode = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode);
      toast({
        title: "Code Copied!",
        description: "Your invitation code has been copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy code. Please copy manually.",
        variant: "destructive",
      });
    }
  };

  const shareInviteCode = async () => {
    const shareText = `Join me on Pall Network and start mining PALL tokens! Use my invitation code: ${inviteCode}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join Pall Network',
          text: shareText,
        });
      } catch (error) {
        // User cancelled or error occurred
      }
    } else {
      // Fallback to copy
      copyInviteCode();
    }
  };

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
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
            Invitation Code
          </h1>
          <p className="text-slate-400">Share and earn rewards with friends</p>
        </div>

        {/* Invitation Content */}
        <div className="w-full max-w-md mx-auto space-y-6">
          {/* Invitation Code Card */}
          <div className="bg-slate-800/30 backdrop-blur-md rounded-2xl p-6 border border-yellow-500/30 shadow-lg shadow-yellow-500/10">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">Your Invitation Code</h3>
              <p className="text-slate-400 text-sm">Share this code with friends to earn rewards</p>
            </div>
            
            {/* Code Display */}
            <div className="bg-slate-700/50 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-yellow-400 tracking-wider" data-testid="invite-code">
                  {inviteCode}
                </div>
                <Button
                  onClick={copyInviteCode}
                  size="sm"
                  variant="outline"
                  className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
                  data-testid="copy-code-button"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Share Button */}
            <Button
              onClick={shareInviteCode}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3"
              data-testid="share-code-button"
            >
              <Share className="w-5 h-5 mr-2" />
              Share Invitation Code
            </Button>
          </div>

          {/* Referral Stats */}
          <div className="bg-slate-800/30 backdrop-blur-md rounded-2xl p-6 border border-slate-700/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-300">Referral Stats</h3>
              <Users className="w-5 h-5 text-cyan-400" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400" data-testid="referral-count">
                  {referrals}
                </div>
                <div className="text-sm text-slate-400">Successful Referrals</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {referrals * 5}
                </div>
                <div className="text-sm text-slate-400">Bonus PALL Earned</div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-700/50">
              <p className="text-xs text-slate-400 text-center">
                You've invited {referrals} users and earned {referrals * 5} bonus PALL tokens!
              </p>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-slate-800/20 backdrop-blur-md rounded-xl p-4 border border-slate-700/30">
            <h4 className="font-semibold text-cyan-400 mb-3">How Referrals Work</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">1.</span>
                Share your unique invitation code
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">2.</span>
                Friends sign up using your code
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">3.</span>
                Earn 5 PALL tokens for each successful referral
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">4.</span>
                Build your team and unlock more rewards
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}