import { users, miningData, upgrades, wallets, type User, type InsertUser, type MiningData, type InsertMiningData, type Upgrade, type InsertUpgrade, type Wallet, type InsertWallet } from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";
import { nanoid } from "nanoid";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(insertUser: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<InsertUser>): Promise<User>;
  
  // Mining data methods
  getMiningData(userId: string): Promise<MiningData | undefined>;
  createMiningData(insertMiningData: InsertMiningData): Promise<MiningData>;
  updateMiningData(userId: string, updates: Partial<InsertMiningData>): Promise<MiningData>;
  
  // Upgrade methods
  getUserUpgrades(userId: string): Promise<Upgrade[]>;
  getActiveUpgrade(userId: string): Promise<Upgrade | undefined>;
  createUpgrade(insertUpgrade: InsertUpgrade): Promise<Upgrade>;
  deactivateUpgrade(upgradeId: string): Promise<void>;
  
  // Wallet methods
  getWallet(userId: string): Promise<Wallet | undefined>;
  createWallet(insertWallet: InsertWallet): Promise<Wallet>;
  updateWallet(userId: string, updates: Partial<InsertWallet>): Promise<Wallet>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        ...insertUser,
        updatedAt: new Date(),
      })
      .returning();
    return user;
  }

  async updateUser(id: string, updates: Partial<InsertUser>): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // Mining data methods
  async getMiningData(userId: string): Promise<MiningData | undefined> {
    const [mining] = await db.select().from(miningData).where(eq(miningData.userId, userId));
    return mining || undefined;
  }

  async createMiningData(insertMiningData: InsertMiningData): Promise<MiningData> {
    const [mining] = await db
      .insert(miningData)
      .values({
        ...insertMiningData,
        id: nanoid(),
        updatedAt: new Date(),
      })
      .returning();
    return mining;
  }

  async updateMiningData(userId: string, updates: Partial<InsertMiningData>): Promise<MiningData> {
    const [mining] = await db
      .update(miningData)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(miningData.userId, userId))
      .returning();
    return mining;
  }

  // Upgrade methods
  async getUserUpgrades(userId: string): Promise<Upgrade[]> {
    return await db.select().from(upgrades).where(eq(upgrades.userId, userId));
  }

  async getActiveUpgrade(userId: string): Promise<Upgrade | undefined> {
    const [upgrade] = await db
      .select()
      .from(upgrades)
      .where(and(
        eq(upgrades.userId, userId),
        eq(upgrades.isActive, true)
      ));
    return upgrade || undefined;
  }

  async createUpgrade(insertUpgrade: InsertUpgrade): Promise<Upgrade> {
    const [upgrade] = await db
      .insert(upgrades)
      .values({
        ...insertUpgrade,
        id: nanoid(),
      })
      .returning();
    return upgrade;
  }

  async deactivateUpgrade(upgradeId: string): Promise<void> {
    await db
      .update(upgrades)
      .set({ isActive: false })
      .where(eq(upgrades.id, upgradeId));
  }

  // Wallet methods
  async getWallet(userId: string): Promise<Wallet | undefined> {
    const [wallet] = await db.select().from(wallets).where(eq(wallets.userId, userId));
    return wallet || undefined;
  }

  async createWallet(insertWallet: InsertWallet): Promise<Wallet> {
    const [wallet] = await db
      .insert(wallets)
      .values({
        ...insertWallet,
        id: nanoid(),
        updatedAt: new Date(),
      })
      .returning();
    return wallet;
  }

  async updateWallet(userId: string, updates: Partial<InsertWallet>): Promise<Wallet> {
    const [wallet] = await db
      .update(wallets)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(wallets.userId, userId))
      .returning();
    return wallet;
  }
}

export const storage = new DatabaseStorage();
