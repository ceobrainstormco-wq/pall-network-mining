import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface ContinuousMiningState {
  totalCoins: number;
  miningStartTime: number | null;
  isMining: boolean;
  lastCompletedMine: number | null;
}

interface MiningProgress {
  isActive: boolean;
  timeRemaining: number;
  progressPercentage: number;
  canStartMining: boolean;
  totalCoins: number;
}

const MINING_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const COINS_PER_MINE = 1; // Exactly 1 PALL coin per 24h session
const STORAGE_KEY_PREFIX = 'pall_mining_continuous';

export function useContinuousMining(): MiningProgress & {
  startMining: () => void;
  formatTime: (ms: number) => string;
} {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [miningState, setMiningState] = useState<ContinuousMiningState>({
    totalCoins: 0,
    miningStartTime: null,
    isMining: false,
    lastCompletedMine: null,
  });

  const [currentTime, setCurrentTime] = useState(Date.now());

  // Generate user-specific storage key
  const getStorageKey = useCallback(() => {
    if (!user?.uid) return `${STORAGE_KEY_PREFIX}_anonymous`;
    return `${STORAGE_KEY_PREFIX}_${user.uid}`;
  }, [user?.uid]);

  // Load mining state from localStorage
  const loadMiningState = useCallback(() => {
    try {
      const storageKey = getStorageKey();
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsedState = JSON.parse(saved);
        setMiningState(parsedState);
      }
    } catch (error) {
      console.error('Failed to load mining state:', error);
    }
  }, [getStorageKey]);

  // Save mining state to localStorage
  const saveMiningState = useCallback((state: ContinuousMiningState) => {
    try {
      const storageKey = getStorageKey();
      localStorage.setItem(storageKey, JSON.stringify(state));
      setMiningState(state);
    } catch (error) {
      console.error('Failed to save mining state:', error);
    }
  }, [getStorageKey]);

  // Format time for display (HH:MM:SS)
  const formatTime = useCallback((milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  // Check if mining session is complete and handle rewards
  const checkMiningCompletion = useCallback(() => {
    if (!miningState.isMining || !miningState.miningStartTime) return;

    const elapsedTime = currentTime - miningState.miningStartTime;
    
    if (elapsedTime >= MINING_DURATION) {
      // Mining session complete! Award coins
      const newState: ContinuousMiningState = {
        ...miningState,
        totalCoins: miningState.totalCoins + COINS_PER_MINE,
        isMining: false,
        miningStartTime: null,
        lastCompletedMine: currentTime,
      };
      
      saveMiningState(newState);
      
      // Show success notification
      toast({
        title: "Mining Complete! 🎉",
        description: `You earned ${COINS_PER_MINE} PALL token! You can start mining again.`,
      });

      // Animate coin counter
      const coinCounter = document.getElementById('coinCounter');
      if (coinCounter) {
        coinCounter.classList.add('success-bounce');
        setTimeout(() => {
          coinCounter.classList.remove('success-bounce');
        }, 600);
      }
    }
  }, [miningState, currentTime, saveMiningState, toast]);

  // Start mining session
  const startMining = useCallback(() => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to start mining",
        variant: "destructive",
      });
      return;
    }

    if (miningState.isMining) return;

    const newState: ContinuousMiningState = {
      ...miningState,
      miningStartTime: currentTime,
      isMining: true,
    };

    saveMiningState(newState);
    
    toast({
      title: "Mining Started! ⛏️",
      description: "Your 24-hour mining session has begun. Come back anytime to check progress!",
    });
  }, [user, miningState, currentTime, saveMiningState, toast]);

  // Calculate current mining progress
  const getMiningProgress = useCallback((): MiningProgress => {
    if (!miningState.isMining || !miningState.miningStartTime) {
      return {
        isActive: false,
        timeRemaining: 0,
        progressPercentage: 0,
        canStartMining: true,
        totalCoins: miningState.totalCoins,
      };
    }

    const elapsedTime = currentTime - miningState.miningStartTime;
    const timeRemaining = Math.max(0, MINING_DURATION - elapsedTime);
    const progressPercentage = Math.min(100, (elapsedTime / MINING_DURATION) * 100);

    return {
      isActive: true,
      timeRemaining,
      progressPercentage,
      canStartMining: false,
      totalCoins: miningState.totalCoins,
    };
  }, [miningState, currentTime]);

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Check for mining completion every second
  useEffect(() => {
    checkMiningCompletion();
  }, [checkMiningCompletion]);

  // Load initial state when user changes
  useEffect(() => {
    if (user) {
      loadMiningState();
    }
  }, [user, loadMiningState]);

  const progress = getMiningProgress();

  return {
    ...progress,
    startMining,
    formatTime,
  };
}