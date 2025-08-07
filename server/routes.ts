import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication sync endpoint
  app.post("/api/auth/sync", async (req, res) => {
    try {
      const { uid, email, displayName, profilePicture, provider } = req.body;

      if (!uid || !email || !displayName) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Check if user exists
      let user = await storage.getUser(uid);
      
      if (!user) {
        // Create new user
        user = await storage.createUser({
          id: uid,
          email,
          displayName,
          profilePicture,
          provider,
        });

        // Create initial mining data
        await storage.createMiningData({
          userId: uid,
          totalCoins: 0,
          miningStreak: 0,
          speedMultiplier: 1,
          isActive: true,
        });
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

  const httpServer = createServer(app);
  return httpServer;
}
