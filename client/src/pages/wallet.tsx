import { useState } from 'react';
import { HamburgerMenu } from '@/components/navigation/HamburgerMenu';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'wouter';
import { ArrowLeft, Download, Upload, Eye, Clock, CheckCircle, XCircle, Coins, DollarSign, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useWallet } from '@/hooks/use-wallet';

interface Transaction {
  id: string;
  type: 'mining' | 'commission' | 'withdrawal' | 'deposit';
  amount: number;
  currency: 'PALL' | 'USDT';
  status: 'pending' | 'completed' | 'failed';
  timestamp: Date;
  hash?: string;
}

export default function Wallet() {
  const { user } = useAuth();
  const { pallBalance, usdtCommissions, isLoading, error } = useWallet();
  const [showComingSoon, setShowComingSoon] = useState(false);

  // Mock transactions - in real implementation, this would come from your backend
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'mining',
      amount: 1.0,
      currency: 'PALL',
      status: 'completed',
      timestamp: new Date('2024-08-09T10:30:00'),
    },
    {
      id: '2',
      type: 'commission',
      amount: 1.25,
      currency: 'USDT',
      status: 'completed',
      timestamp: new Date('2024-08-08T15:45:00'),
      hash: '0x1234...abcd'
    }
  ];

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
            <span className="text-lg text-slate-300">Loading wallet data...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative min-h-screen bg-slate-900 text-slate-50 font-sans">
        <div className="fixed inset-0 pointer-events-none">
          <img 
            src="/crypto-background.svg" 
            alt="" 
            className="w-full h-full object-cover opacity-60"
            style={{ minWidth: '100vw', minHeight: '100vh' }}
          />
        </div>
        
        <HamburgerMenu />
        
        <div className="relative min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-400 text-lg mb-4">Error loading wallet data</p>
            <p className="text-slate-400">{error?.message || 'Unknown error'}</p>
          </div>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return null;
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'mining':
        return <Coins className="w-4 h-4 text-cyan-400" />;
      case 'commission':
        return <DollarSign className="w-4 h-4 text-green-400" />;
      case 'withdrawal':
        return <Upload className="w-4 h-4 text-red-400" />;
      case 'deposit':
        return <Download className="w-4 h-4 text-blue-400" />;
      default:
        return null;
    }
  };

  const handleComingSoon = () => {
    setShowComingSoon(true);
    setTimeout(() => setShowComingSoon(false), 2000);
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
            Wallet
          </h1>
          <p className="text-slate-400">Your PALL tokens and USDT commissions</p>
        </div>

        <div className="w-full max-w-4xl mx-auto space-y-6">
          {/* Action Buttons */}
          <div className="flex gap-4 mb-6">
            <Button 
              onClick={handleComingSoon}
              className="flex-1 bg-green-600 hover:bg-green-500 text-white"
              data-testid="withdraw-button"
            >
              <Upload className="w-4 h-4 mr-2" />
              Withdraw
            </Button>
            <Button 
              onClick={handleComingSoon}
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white"
              data-testid="deposit-button"
            >
              <Download className="w-4 h-4 mr-2" />
              Deposit
            </Button>
          </div>

          {/* Coming Soon Message */}
          {showComingSoon && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 text-center">
              <h3 className="text-yellow-400 font-semibold">Coming Soon!</h3>
              <p className="text-yellow-300 text-sm">This feature will be available in the next update.</p>
            </div>
          )}

          {/* Balance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PALL Balance */}
            <Card className="bg-slate-800/30 backdrop-blur-md border-cyan-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-cyan-400">
                  <Coins className="w-5 h-5 mr-2" />
                  PALL Tokens
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">
                  {pallBalance.toFixed(2)}
                </div>
                <p className="text-slate-400 text-sm">Mined tokens balance</p>
              </CardContent>
            </Card>

            {/* USDT Commissions */}
            <Card className="bg-slate-800/30 backdrop-blur-md border-green-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-green-400">
                  <DollarSign className="w-5 h-5 mr-2" />
                  USDT Commissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">
                  ${usdtCommissions.toFixed(2)}
                </div>
                <p className="text-slate-400 text-sm">Referral earnings</p>
              </CardContent>
            </Card>
          </div>

          {/* Transaction History */}
          <Card className="bg-slate-800/30 backdrop-blur-md border-slate-700/30">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Eye className="w-5 h-5 mr-2" />
                Transaction History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center">
                      {getTransactionIcon(tx.type)}
                      <div className="ml-3">
                        <div className="font-medium text-white capitalize">{tx.type}</div>
                        <div className="text-sm text-slate-400">
                          {tx.timestamp.toLocaleDateString()} {tx.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="text-right mr-3">
                        <div className="font-medium text-white">
                          {tx.amount.toFixed(2)} {tx.currency}
                        </div>
                        {tx.hash && (
                          <div className="text-xs text-slate-400 font-mono">
                            {tx.hash}
                          </div>
                        )}
                      </div>
                      {getStatusIcon(tx.status)}
                    </div>
                  </div>
                ))}
                
                {transactions.length === 0 && (
                  <div className="text-center py-8 text-slate-400">
                    No transactions yet
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}