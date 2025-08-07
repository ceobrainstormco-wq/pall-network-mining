import { Button } from '@/components/ui/button';
import { HamburgerMenu } from '@/components/navigation/HamburgerMenu';
import { Link } from 'wouter';
import { ArrowLeft, Users, UserPlus } from 'lucide-react';

export default function Team() {
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
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Your Team
          </h1>
          <p className="text-slate-400">Manage your team members and referrals</p>
        </div>

        {/* Team Content */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-slate-800/30 backdrop-blur-md rounded-2xl p-8 border border-slate-700/30 text-center">
            {/* Empty State */}
            <div className="mb-6">
              <div className="w-20 h-20 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-300 mb-2">
                No Team Members Yet
              </h3>
              <p className="text-slate-400 mb-6">
                You have not invited any team members yet. Start building your network by sharing your invitation code.
              </p>
            </div>

            {/* Team Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-700/30 rounded-xl p-4">
                <div className="text-2xl font-bold text-cyan-400" data-testid="team-count">0</div>
                <div className="text-sm text-slate-400">Team Members</div>
              </div>
              <div className="bg-slate-700/30 rounded-xl p-4">
                <div className="text-2xl font-bold text-green-400" data-testid="total-earnings">0</div>
                <div className="text-sm text-slate-400">Total Earnings</div>
              </div>
            </div>

            {/* Action Button */}
            <Link href="/invitation">
              <Button 
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3"
                data-testid="invite-team-button"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                Invite Team Members
              </Button>
            </Link>
          </div>

          {/* Information Card */}
          <div className="mt-6 bg-slate-800/20 backdrop-blur-md rounded-xl p-4 border border-slate-700/30">
            <h4 className="font-semibold text-cyan-400 mb-2">How Team Building Works</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• Share your invitation code with friends</li>
              <li>• Earn bonuses when they join and mine</li>
              <li>• Build a stronger network together</li>
              <li>• Unlock exclusive team rewards</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}