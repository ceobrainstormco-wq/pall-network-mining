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

  return {
    wallet,
    miningData,
    pallBalance: wallet.pallBalance || miningData.totalCoins || 0,
    usdtCommissions: wallet.usdtCommissions || 0,
    isLoading,
    error,
    refetch: () => queryClient.invalidateQueries({ queryKey: ['/api/wallet', user?.uid] }),
  };
}