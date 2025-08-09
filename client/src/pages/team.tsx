import { useState } from 'react';
import { HamburgerMenu } from '@/components/navigation/HamburgerMenu';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'wouter';
import { 
  ArrowLeft, 
  Users, 
  Gift, 
  DollarSign, 
  Share2, 
  Copy, 
  Loader2,
  UserPlus,
  Coins,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

interface TeamStats {
  totalMembers: number;
  totalReferralRewards: number;
  totalCommissions: number;
  referrals: Array<{
    id: string;
    referredUsername: string;
    createdAt: string;
    signupRewardGiven: boolean;
  }>;
  commissions: Array<{
    id: string;
    packageType: string;
    packageValue: number;
    amountUsdt: number;
    createdAt: string;
  }>;
}

export default function Team() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const { data: teamStats, isLoading } = useQuery<TeamStats>({
    queryKey: ['/api/team', user?.uid],
    enabled: !!user?.uid,
  });

  const { data: userData } = useQuery({
    queryKey: ['/api/user', user?.uid],
    enabled: !!user?.uid,
  });

  const username = userData?.username || user?.displayName?.toLowerCase().replace(/\s+/g, '') || 'user';
  const invitationLink = `https://pallnetwork.com/signup?ref=${username}`;

  const handleShare = (platform: string) => {
    const text = `Join Pall Network and start mining PALL tokens! Use my invitation code: ${username}`;
    let shareUrl = '';

    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + '\n' + invitationLink)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(invitationLink)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(invitationLink)}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(invitationLink)}&text=${encodeURIComponent(text)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };

  const copyInvitationLink = async () => {
    try {
      await navigator.clipboard.writeText(invitationLink);
      toast({
        title: "Copied!",
        description: "Invitation link copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please copy the link manually",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="relative min-h-screen bg-slate-900 text-slate-50 font-sans">
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
        
        <HamburgerMenu />
        
        <div className="relative min-h-screen flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
            <span className="text-lg text-slate-300">Loading team data...</span>
          </div>
        </div>
      </div>
    );
  }

  const stats = teamStats || {
    totalMembers: 0,
    totalReferralRewards: 0,
    totalCommissions: 0,
    referrals: [],
    commissions: []
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

      <HamburgerMenu />

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
              src="/pall-logo-new.png" 
              alt="Pall Network Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent mb-2">
            Your Team
          </h1>
          <p className="text-slate-400">Manage your referrals and track earnings</p>
        </div>

        <div className="w-full max-w-4xl mx-auto space-y-6">
          {/* Invitation Code & Share */}
          <Card className="bg-slate-800/30 backdrop-blur-md border-cyan-500/20">
            <CardHeader>
              <CardTitle className="flex items-center text-cyan-400">
                <Share2 className="w-5 h-5 mr-2" />
                Your Invitation Code
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-700/30 p-4 rounded-lg">
                <p className="text-sm text-slate-400 mb-2">Invitation Code:</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-mono text-cyan-400">{username}</span>
                  <Button
                    onClick={copyInvitationLink}
                    size="sm"
                    className="bg-cyan-600 hover:bg-cyan-500"
                    data-testid="copy-code-button"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Link
                  </Button>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-slate-400 mb-3">Share on:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button
                    onClick={() => handleShare('whatsapp')}
                    className="bg-green-600 hover:bg-green-500"
                    data-testid="share-whatsapp"
                  >
                    WhatsApp
                  </Button>
                  <Button
                    onClick={() => handleShare('facebook')}
                    className="bg-blue-600 hover:bg-blue-500"
                    data-testid="share-facebook"
                  >
                    Facebook
                  </Button>
                  <Button
                    onClick={() => handleShare('twitter')}
                    className="bg-sky-600 hover:bg-sky-500"
                    data-testid="share-twitter"
                  >
                    Twitter
                  </Button>
                  <Button
                    onClick={() => handleShare('telegram')}
                    className="bg-blue-500 hover:bg-blue-400"
                    data-testid="share-telegram"
                  >
                    Telegram
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-slate-800/30 backdrop-blur-md border-blue-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-blue-400">
                  <Users className="w-5 h-5 mr-2" />
                  Total Members
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">
                  {stats.totalMembers}
                </div>
                <p className="text-slate-400 text-sm">People you've invited</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 backdrop-blur-md border-green-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-green-400">
                  <Gift className="w-5 h-5 mr-2" />
                  Referral Rewards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">
                  {stats.totalReferralRewards.toFixed(1)}
                </div>
                <p className="text-slate-400 text-sm">PALL tokens earned</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 backdrop-blur-md border-yellow-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-yellow-400">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Total Commissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">
                  ${(stats.totalCommissions / 100).toFixed(2)}
                </div>
                <p className="text-slate-400 text-sm">USDT from purchases</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Referrals */}
          <Card className="bg-slate-800/30 backdrop-blur-md border-slate-700/30">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <UserPlus className="w-5 h-5 mr-2" />
                Recent Referrals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.referrals.length > 0 ? (
                  stats.referrals.slice(0, 10).map((referral) => (
                    <div key={referral.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center">
                        <UserPlus className="w-4 h-4 text-blue-400 mr-3" />
                        <div>
                          <div className="font-medium text-white">@{referral.referredUsername}</div>
                          <div className="text-sm text-slate-400">
                            {new Date(referral.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center text-green-400">
                        {referral.signupRewardGiven && (
                          <>
                            <Coins className="w-4 h-4 mr-1" />
                            <span className="text-sm font-medium">+0.1 PALL</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-slate-400">
                    <UserPlus className="w-12 h-12 mx-auto mb-4 text-slate-500" />
                    <p>No referrals yet</p>
                    <p className="text-sm">Share your invitation code to start earning!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Commission History */}
          {stats.commissions.length > 0 && (
            <Card className="bg-slate-800/30 backdrop-blur-md border-slate-700/30">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Commission History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats.commissions.slice(0, 10).map((commission) => (
                    <div key={commission.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 text-yellow-400 mr-3" />
                        <div>
                          <div className="font-medium text-white capitalize">
                            {commission.packageType} Package
                          </div>
                          <div className="text-sm text-slate-400">
                            {new Date(commission.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-yellow-400">
                          ${(commission.amountUsdt / 100).toFixed(2)}
                        </div>
                        <div className="text-xs text-slate-400">
                          5% of ${commission.packageValue}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}