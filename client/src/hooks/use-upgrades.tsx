import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { web3Service } from '@/lib/web3';
import { 
  UpgradePackage, 
  UserUpgrade, 
  getActiveUpgrade, 
  saveUpgrade,
  getCurrentSpeedMultiplier 
} from '@/types/upgrades';

export function useUpgrades() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeUpgrade, setActiveUpgrade] = useState<UserUpgrade | null>(null);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Load active upgrade when user changes
  useEffect(() => {
    if (user?.uid) {
      const upgrade = getActiveUpgrade(user.uid);
      setActiveUpgrade(upgrade);
      setSpeedMultiplier(getCurrentSpeedMultiplier(user.uid));
    }
  }, [user?.uid]);

  // Check wallet connection status
  useEffect(() => {
    if (web3Service.isConnected()) {
      setWalletConnected(true);
      setWalletAddress(web3Service.getAccount());
    }
  }, []);

  const connectWallet = useCallback(async (): Promise<boolean> => {
    try {
      setIsProcessing(true);
      const address = await web3Service.connectWallet();
      setWalletConnected(true);
      setWalletAddress(address);
      
      toast({
        title: "Wallet Connected",
        description: `Connected to ${address.slice(0, 6)}...${address.slice(-4)}`,
      });
      
      return true;
    } catch (error: any) {
      console.error('Wallet connection error:', error);
      toast({
        title: "Connection Failed",
        description: error.message,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  }, [toast]);

  const purchaseUpgrade = useCallback(async (packageData: UpgradePackage): Promise<boolean> => {
    if (!user?.uid) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to purchase upgrades",
        variant: "destructive",
      });
      return false;
    }

    if (!walletConnected) {
      const connected = await connectWallet();
      if (!connected) return false;
    }

    try {
      setIsProcessing(true);
      
      // Show processing toast
      toast({
        title: "Processing Payment",
        description: `Sending ${packageData.priceUSDT} USDT...`,
      });

      // Send USDT payment
      const txHash = await web3Service.sendUSDTPayment(packageData.priceUSDT);
      
      // Verify transaction
      const verified = await web3Service.verifyTransaction(txHash, packageData.priceUSDT);
      
      if (verified) {
        // Calculate expiry date
        const now = Date.now();
        const expiresAt = packageData.duration === 0 
          ? null 
          : now + (packageData.duration * 30 * 24 * 60 * 60 * 1000); // months to milliseconds

        // Create upgrade record
        const upgrade: UserUpgrade = {
          packageId: packageData.id,
          packageName: packageData.name,
          speedMultiplier: packageData.speedMultiplier,
          activatedAt: now,
          expiresAt,
          transactionHash: txHash,
        };

        // Save upgrade
        saveUpgrade(user.uid, upgrade);
        setActiveUpgrade(upgrade);
        setSpeedMultiplier(packageData.speedMultiplier);

        toast({
          title: "Upgrade Successful! ✅",
          description: "Your mining speed has been upgraded successfully!",
        });

        return true;
      } else {
        throw new Error('Transaction verification failed');
      }
    } catch (error: any) {
      console.error('Purchase error:', error);
      toast({
        title: "Purchase Failed",
        description: error.message,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  }, [user?.uid, walletConnected, connectWallet, toast]);

  const getUSDTBalance = useCallback(async (): Promise<string | null> => {
    if (!walletConnected) return null;
    
    try {
      return await web3Service.getUSDTBalance();
    } catch (error) {
      console.error('Error getting USDT balance:', error);
      return null;
    }
  }, [walletConnected]);

  const isUpgradeExpired = useCallback((upgrade: UserUpgrade): boolean => {
    if (!upgrade.expiresAt) return false; // Unlimited package
    return Date.now() > upgrade.expiresAt;
  }, []);

  const getTimeUntilExpiry = useCallback((upgrade: UserUpgrade): string | null => {
    if (!upgrade.expiresAt) return null; // Unlimited package
    
    const timeLeft = upgrade.expiresAt - Date.now();
    if (timeLeft <= 0) return 'Expired';
    
    const days = Math.floor(timeLeft / (24 * 60 * 60 * 1000));
    const hours = Math.floor((timeLeft % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    
    if (days > 0) {
      return `${days} days remaining`;
    }
    return `${hours} hours remaining`;
  }, []);

  return {
    activeUpgrade,
    speedMultiplier,
    isProcessing,
    walletConnected,
    walletAddress,
    connectWallet,
    purchaseUpgrade,
    getUSDTBalance,
    isUpgradeExpired,
    getTimeUntilExpiry,
  };
}