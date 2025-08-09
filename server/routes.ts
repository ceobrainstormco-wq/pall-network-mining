import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { nanoid } from "nanoid";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get user data by ID
  app.get("/api/user/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Calculate total PALL balance including referral rewards
      const wallet = await storage.getWallet(userId);
      const miningData = await storage.getMiningData(userId);
      
      const responseData = {
        ...user,
        pallBalance: wallet?.pallBalance || 0,
        miningBalance: miningData?.totalCoins || 0,
        totalReferralRewards: user.totalReferralRewards || 0,
        totalReferrals: user.totalReferrals || 0,
      };

      res.json(responseData);
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Update user data
  app.patch("/api/user/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const updates = req.body;
      
      // Check if username is being updated and if it's unique
      if (updates.username) {
        const existingUser = await storage.getUserByUsername(updates.username);
        if (existingUser && existingUser.id !== userId) {
          return res.status(400).json({ error: "Username already taken" });
        }
      }
      
      const user = await storage.updateUser(userId, updates);
      res.json({ success: true, user });
    } catch (error) {
      console.error('Update user error:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Authentication sync endpoint
  app.post("/api/auth/sync", async (req, res) => {
    try {
      const { uid, email, displayName, profilePicture, provider, referralCode } = req.body;

      if (!uid || !email || !displayName) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Check if user exists
      let user = await storage.getUser(uid);
      
      if (!user) {
        // Handle referral for new users
        let referredByUserId = null;
        if (referralCode) {
          const referrer = await storage.getUserByUsername(referralCode);
          if (referrer) {
            referredByUserId = referrer.id;
            console.log('🎯 New user referred by:', referrer.username);
          }
        }
        
        // Create new user
        user = await storage.createUser({
          id: uid,
          email,
          displayName,
          profilePicture,
          provider,
          referredBy: referredByUserId,
        });

        // Create initial mining data
        await storage.createMiningData({
          id: nanoid(),
          userId: uid,
          totalCoins: 0,
          miningStreak: 0,
          speedMultiplier: 1,
          isActive: true,
        });

        // Create initial wallet
        await storage.createWallet({
          id: nanoid(),
          userId: uid,
          pallBalance: 0,
          usdtCommissions: 0,
        });
        
        // Award referral bonus to referrer
        if (referredByUserId) {
          await storage.addReferralReward(referredByUserId, 0.1);
          console.log('💰 Awarded 0.1 PALL referral bonus to referrer');
        }
      } else {
        // Update existing user
        user = await storage.updateUser(uid, {
          displayName,
          profilePicture,
        });
      }

      res.json({ success: true, user });
    } catch (error) {
      console.error('Auth sync error:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get user mining data
  app.get("/api/mining/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const miningData = await storage.getMiningData(userId);
      
      if (!miningData) {
        return res.status(404).json({ error: "Mining data not found" });
      }

      res.json(miningData);
    } catch (error) {
      console.error('Get mining data error:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Update mining data (perform mining action)
  app.post("/api/mining/:userId/mine", async (req, res) => {
    try {
      const { userId } = req.params;
      
      // Get current mining data
      const currentData = await storage.getMiningData(userId);
      if (!currentData) {
        return res.status(404).json({ error: "Mining data not found" });
      }

      // Check if 24 hours have passed since last mine
      const now = new Date();
      const lastMineTime = currentData.lastMineTime;
      const cooldownPeriod = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

      if (lastMineTime && (now.getTime() - lastMineTime.getTime()) < cooldownPeriod) {
        const remainingTime = cooldownPeriod - (now.getTime() - lastMineTime.getTime());
        return res.status(400).json({ 
          error: "Mining cooldown active",
          remainingTime: remainingTime
        });
      }

      // Calculate coins to add (base amount * speed multiplier)
      const baseCoins = 1;
      const coinsToAdd = baseCoins * currentData.speedMultiplier;
      
      // Update mining data
      const updatedData = await storage.updateMiningData(userId, {
        totalCoins: currentData.totalCoins + coinsToAdd,
        lastMineTime: now,
        miningStreak: currentData.miningStreak + 1,
      });

      // Sync wallet PALL balance with mining data total coins
      const wallet = await storage.getWallet(userId);
      if (wallet) {
        await storage.updateWallet(userId, {
          pallBalance: updatedData.totalCoins,
        });
      }

      res.json({
        success: true,
        miningData: updatedData,
        coinsEarned: coinsToAdd,
      });
    } catch (error) {
      console.error('Mining action error:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get user profile with mining data
  app.get("/api/profile/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      
      const user = await storage.getUser(userId);
      const miningData = await storage.getMiningData(userId);
      const activeUpgrade = await storage.getActiveUpgrade(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        user,
        miningData,
        activeUpgrade,
      });
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get user wallet data
  app.get("/api/wallet/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      
      const wallet = await storage.getWallet(userId);
      const miningData = await storage.getMiningData(userId);
      
      if (!wallet) {
        return res.status(404).json({ error: "Wallet not found" });
      }

      // Ensure wallet PALL balance is synced with mining total coins
      let syncedWallet = wallet;
      if (miningData && wallet.pallBalance !== miningData.totalCoins) {
        syncedWallet = await storage.updateWallet(userId, {
          pallBalance: miningData.totalCoins,
        });
      }

      res.json({
        wallet: syncedWallet,
        miningData,
      });
    } catch (error) {
      console.error('Get wallet error:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get user data
  app.get("/api/user/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(user);
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Update user data (including username)
  app.patch("/api/user/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const updates = req.body;
      
      // Check if username is unique (if being updated)
      if (updates.username) {
        const existingUser = await storage.getUserByUsername(updates.username);
        if (existingUser && existingUser.id !== userId) {
          return res.status(400).json({ error: "Username already taken" });
        }
      }

      const updatedUser = await storage.updateUser(userId, updates);
      res.json(updatedUser);
    } catch (error) {
      console.error('Update user error:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get team stats
  app.get("/api/team/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      
      // Get user referrals
      const referrals = await storage.getReferralsByReferrer(userId);
      
      // Get user commissions
      const commissions = await storage.getCommissionsByUser(userId);
      
      // Get user data for total referral rewards
      const user = await storage.getUser(userId);
      
      // Calculate totals
      const totalMembers = referrals.length;
      const totalReferralRewards = user?.totalReferralRewards || 0;
      const totalCommissions = commissions.reduce((sum, comm) => sum + comm.amountUsdt, 0);
      
      res.json({
        totalMembers,
        totalReferralRewards,
        totalCommissions,
        referrals: referrals.map(r => ({
          id: r.id,
          referredUsername: r.referredUsername,
          createdAt: r.createdAt,
          signupRewardGiven: r.signupRewardGiven,
        })),
        commissions: commissions.map(c => ({
          id: c.id,
          packageType: c.packageType,
          packageValue: c.packageValue,
          amountUsdt: c.amountUsdt,
          createdAt: c.createdAt,
        })),
      });
    } catch (error) {
      console.error('Get team error:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Process referral signup
  app.post("/api/referral/signup", async (req, res) => {
    try {
      const { referrerUsername, newUserId, newUsername } = req.body;
      
      if (!referrerUsername || !newUserId || !newUsername) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      
      // Find referrer by username
      const referrer = await storage.getUserByUsername(referrerUsername);
      if (!referrer) {
        return res.status(404).json({ error: "Referrer not found" });
      }
      
      // Create referral record
      await storage.createReferral({
        referrerId: referrer.id,
        referrerUsername: referrerUsername,
        referredUserId: newUserId,
        referredUsername: newUsername,
        signupRewardGiven: true,
        level: 1, // F1 referral
      });
      
      // Update referred user with referrer info
      await storage.updateUser(newUserId, {
        referredBy: referrerUsername,
      });
      
      // Add 0.1 PALL token reward to referrer
      await storage.updateUser(referrer.id, {
        totalReferralRewards: (referrer.totalReferralRewards || 0) + 0.1,
      });
      
      // Update referrer's mining data with bonus tokens
      const referrerMiningData = await storage.getMiningData(referrer.id);
      if (referrerMiningData) {
        await storage.updateMiningData(referrer.id, {
          totalCoins: referrerMiningData.totalCoins + 0.1,
        });
        
        // Sync wallet
        const referrerWallet = await storage.getWallet(referrer.id);
        if (referrerWallet) {
          await storage.updateWallet(referrer.id, {
            pallBalance: referrerMiningData.totalCoins + 0.1,
          });
        }
      }
      
      res.json({ success: true, message: "Referral processed successfully" });
    } catch (error) {
      console.error('Process referral error:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Process package purchase commission
  app.post("/api/commission/package", async (req, res) => {
    try {
      const { buyerUserId, packageType, packageValue } = req.body;
      
      if (!buyerUserId || !packageType || !packageValue) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      
      // Get buyer info
      const buyer = await storage.getUser(buyerUserId);
      if (!buyer || !buyer.referredBy) {
        return res.json({ success: true, message: "No referrer found" });
      }
      
      // Find referrer
      const referrer = await storage.getUserByUsername(buyer.referredBy);
      if (!referrer) {
        return res.json({ success: true, message: "Referrer not found" });
      }
      
      // Calculate 5% commission (in cents)
      const commissionAmount = Math.round(packageValue * 5); // 5% of package value in cents
      
      // Create commission record
      await storage.createCommission({
        userId: referrer.id,
        fromUserId: buyerUserId,
        upgradeId: nanoid(), // This should be the actual upgrade ID from purchase
        packageType,
        packageValue,
        amountUsdt: commissionAmount,
        commissionType: 'f1',
        isProcessed: true,
      });
      
      // Add commission to referrer's wallet
      const referrerWallet = await storage.getWallet(referrer.id);
      if (referrerWallet) {
        await storage.updateWallet(referrer.id, {
          usdtCommissions: referrerWallet.usdtCommissions + commissionAmount,
        });
      }
      
      res.json({ success: true, message: "Commission processed successfully" });
    } catch (error) {
      console.error('Process commission error:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
