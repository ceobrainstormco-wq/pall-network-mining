import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface MiningState {
  totalCoins: number;
  lastMineTime: number;
}

const MINE_COOLDOWN = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const COINS_PER_MINE = 1;
const STORAGE_KEY_PREFIX = 'pallNetworkGame';

export function useMining() {
  const { user } = useAuth();
  const [gameState, setGameState] = useState<MiningState>({
    totalCoins: 0,
    lastMineTime: 0,
  });
  const [remainingTime, setRemainingTime] = useState(0);

  // Generate user-specific storage key
  const getStorageKey = useCallback(() => {
    if (!user?.uid) return `${STORAGE_KEY_PREFIX}_anonymous`;
    return `${STORAGE_KEY_PREFIX}_${user.uid}`;
  }, [user?.uid]);

  // Load game state from localStorage
  const loadGameState = useCallback(() => {
    try {
      const storageKey = getStorageKey();
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsedState = JSON.parse(saved);
        setGameState(parsedState);
      }
    } catch (error) {
      console.error('Failed to load game state:', error);
    }
  }, [getStorageKey]);

  // Save game state to localStorage
  const saveGameState = useCallback((state: MiningState) => {
    try {
      const storageKey = getStorageKey();
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save game state:', error);
    }
  }, [getStorageKey]);

  // Check if mining is allowed
  const canMine = useCallback(() => {
    const now = Date.now();
    const timeSinceLastMine = now - gameState.lastMineTime;
    return timeSinceLastMine >= MINE_COOLDOWN || gameState.lastMineTime === 0;
  }, [gameState.lastMineTime]);

  // Get remaining cooldown time
  const getRemainingTime = useCallback(() => {
    if (canMine()) return 0;
    const now = Date.now();
    const timeSinceLastMine = now - gameState.lastMineTime;
    return Math.max(0, MINE_COOLDOWN - timeSinceLastMine);
  }, [gameState.lastMineTime, canMine]);

  // Format time for display
  const formatTime = useCallback((milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  // Handle mining action
  const handleMining = useCallback(() => {
    if (!canMine()) return;

    const newState: MiningState = {
      totalCoins: gameState.totalCoins + COINS_PER_MINE,
      lastMineTime: Date.now(),
    };

    setGameState(newState);
    saveGameState(newState);

    // Animate coin counter
    const coinCounter = document.getElementById('coinCounter');
    if (coinCounter) {
      coinCounter.style.transform = 'scale(1.1)';
      setTimeout(() => {
        coinCounter.style.transform = 'scale(1)';
      }, 300);
    }
  }, [gameState, canMine, saveGameState]);

  // Update remaining time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(getRemainingTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [getRemainingTime]);

  // Load initial state when user changes
  useEffect(() => {
    if (user) {
      loadGameState();
    }
  }, [user, loadGameState]);

  return {
    totalCoins: gameState.totalCoins,
    canMine: canMine(),
    remainingTime,
    handleMining,
    formatTime,
  };
}
