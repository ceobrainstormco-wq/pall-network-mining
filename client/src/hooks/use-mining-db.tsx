import { useAuth } from '@/contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import type { MiningData } from '@shared/schema';

interface MiningHookData {
  coins: number;
  lastMineTime: Date | null;
  miningStreak: number;
  speedMultiplier: number;
  canMine: boolean;
  timeUntilNextMine: number;
  isLoading: boolean;
  error: string | null;
  mine: () => void;
  isMining: boolean;
}

const COOLDOWN_PERIOD = 24 * 60 * 60 * 1000; // 24 hours

export function useMiningDb(): MiningHookData {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Query to get mining data
  const { data: miningData, isLoading, error } = useQuery({
    queryKey: ['/api/mining', user?.uid],
    enabled: !!user?.uid,
  });

  // Mutation to perform mining
  const mineMutation = useMutation({
    mutationFn: async () => {
      if (!user?.uid) throw new Error('User not authenticated');
      
      const response = await fetch(`/api/mining/${user.uid}/mine`, {
        method: 'POST',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Mining failed');
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['/api/mining', user?.uid] });
      toast({
        title: "Mining Successful!",
        description: `You earned ${data.coinsEarned} PALL tokens!`,
      });
    },
    onError: (error: Error) => {
      if (error.message.includes('cooldown')) {
        toast({
          title: "Mining Cooldown Active",
          description: "You can mine again in 24 hours",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Mining Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    },
  });

  // Type-safe data access with defaults
  const safeData = (miningData as any) || {
    totalCoins: 0,
    lastMineTime: null,
    miningStreak: 0,
    speedMultiplier: 1,
  };

  // Calculate if mining is available
  const canMine = () => {
    if (!safeData.lastMineTime) return true;
    
    const now = new Date().getTime();
    const lastMine = new Date(safeData.lastMineTime).getTime();
    return (now - lastMine) >= COOLDOWN_PERIOD;
  };

  // Calculate time until next mine
  const getTimeUntilNextMine = () => {
    if (!safeData.lastMineTime || canMine()) return 0;
    
    const now = new Date().getTime();
    const lastMine = new Date(safeData.lastMineTime).getTime();
    return Math.max(0, COOLDOWN_PERIOD - (now - lastMine));
  };

  return {
    coins: safeData.totalCoins,
    lastMineTime: safeData.lastMineTime ? new Date(safeData.lastMineTime) : null,
    miningStreak: safeData.miningStreak,
    speedMultiplier: safeData.speedMultiplier,
    canMine: canMine(),
    timeUntilNextMine: getTimeUntilNextMine(),
    isLoading,
    error: error?.message || null,
    mine: () => mineMutation.mutate(),
    isMining: mineMutation.isPending,
  };
}