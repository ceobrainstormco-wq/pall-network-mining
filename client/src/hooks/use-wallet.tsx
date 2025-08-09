import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';

export function useWallet() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/wallet', user?.uid],
    enabled: !!user?.uid,
  });

  const wallet = (data as any)?.wallet || { pallBalance: 0, usdtCommissions: 0 };
  const miningData = (data as any)?.miningData || { totalCoins: 0 };

  // Get user data for referral rewards
  const { data: userData } = useQuery({
    queryKey: ['/api/user', user?.uid],
    enabled: !!user?.uid,
  });

  const referralRewards = (userData as any)?.totalReferralRewards || 0;
  const totalPallBalance = (wallet.pallBalance || miningData.totalCoins || 0) + referralRewards;

  return {
    wallet,
    miningData,
    userData,
    pallBalance: totalPallBalance,
    miningBalance: wallet.pallBalance || miningData.totalCoins || 0,
    referralRewards,
    usdtCommissions: wallet.usdtCommissions || 0,
    isLoading,
    error,
    refetch: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/wallet', user?.uid] });
      queryClient.invalidateQueries({ queryKey: ['/api/user', user?.uid] });
    },
  };
}