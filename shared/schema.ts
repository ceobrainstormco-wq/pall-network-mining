import { pgTable, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { z } from "zod";

export const users = pgTable("users", {
  id: text("id").primaryKey(), // Firebase UID
  email: text("email").notNull().unique(),
  displayName: text("display_name").notNull(),
  username: text("username").unique(), // User's chosen username (invitation code)
  profilePicture: text("profile_picture"),
  provider: text("provider").notNull(), // 'google', 'facebook', 'twitter'
  referralCode: text("referral_code").unique(),
  referredBy: text("referred_by"), // Username of who referred this user
  totalReferralRewards: integer("total_referral_rewards").default(0).notNull(), // PALL tokens from referrals
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const miningData = pgTable("mining_data", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  totalCoins: integer("total_coins").default(0).notNull(),
  lastMineTime: timestamp("last_mine_time"),
  miningStreak: integer("mining_streak").default(0).notNull(),
  speedMultiplier: integer("speed_multiplier").default(1).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const upgrades = pgTable("upgrades", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  packageType: text("package_type").notNull(), // 'bronze', 'silver', 'golden', 'diamond'
  speedMultiplier: integer("speed_multiplier").notNull(), // 200, 600, 3000, 6000
  priceUsd: integer("price_usd").notNull(), // $3, $14, $55, $100
  isActive: boolean("is_active").default(true).notNull(),
  purchaseDate: timestamp("purchase_date").defaultNow().notNull(),
  transactionHash: text("transaction_hash"),
  walletAddress: text("wallet_address").notNull(),
});

export const referrals = pgTable("referrals", {
  id: text("id").primaryKey(),
  referrerId: text("referrer_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  referrerUsername: text("referrer_username").notNull(),
  referredUserId: text("referred_user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  referredUsername: text("referred_username").notNull(),
  signupRewardGiven: boolean("signup_reward_given").default(false).notNull(),
  level: integer("level").notNull(), // 1 = F1, 2 = F2
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const commissions = pgTable("commissions", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  fromUserId: text("from_user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  upgradeId: text("upgrade_id").references(() => upgrades.id, { onDelete: "cascade" }).notNull(),
  packageType: text("package_type").notNull(), // 'bronze', 'silver', 'golden', 'diamond'
  packageValue: integer("package_value").notNull(), // Package price in USD
  amountUsdt: integer("amount_usdt").notNull(), // 5% commission in USDT cents
  commissionType: text("commission_type").notNull(), // 'f1' or 'f2'
  transactionHash: text("transaction_hash"),
  isProcessed: boolean("is_processed").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const wallets = pgTable("wallets", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  pallBalance: integer("pall_balance").default(0).notNull(),
  usdtCommissions: integer("usdt_commissions").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  miningData: one(miningData, {
    fields: [users.id],
    references: [miningData.userId],
  }),
  wallet: one(wallets, {
    fields: [users.id],
    references: [wallets.userId],
  }),
  upgrades: many(upgrades),
  referrals: many(referrals),
  commissions: many(commissions),
}));

export const miningDataRelations = relations(miningData, ({ one }) => ({
  user: one(users, {
    fields: [miningData.userId],
    references: [users.id],
  }),
}));

export const upgradesRelations = relations(upgrades, ({ one }) => ({
  user: one(users, {
    fields: [upgrades.userId],
    references: [users.id],
  }),
}));

export const referralsRelations = relations(referrals, ({ one }) => ({
  referrer: one(users, {
    fields: [referrals.referrerId],
    references: [users.id],
  }),
  referredUser: one(users, {
    fields: [referrals.referredUserId],
    references: [users.id],
  }),
}));

export const commissionsRelations = relations(commissions, ({ one }) => ({
  user: one(users, {
    fields: [commissions.userId],
    references: [users.id],
  }),
  fromUser: one(users, {
    fields: [commissions.fromUserId],
    references: [users.id],
  }),
  upgrade: one(upgrades, {
    fields: [commissions.upgradeId],
    references: [upgrades.id],
  }),
}));

export const walletsRelations = relations(wallets, ({ one }) => ({
  user: one(users, {
    fields: [wallets.userId],
    references: [users.id],
  }),
}));

// Zod schemas
export const insertUserSchema = createInsertSchema(users).omit({
  createdAt: true,
  updatedAt: true,
});

export const selectUserSchema = createSelectSchema(users);

export const insertMiningDataSchema = createInsertSchema(miningData).omit({
  createdAt: true,
  updatedAt: true,
});

export const selectMiningDataSchema = createSelectSchema(miningData);

export const insertUpgradeSchema = createInsertSchema(upgrades).omit({
  purchaseDate: true,
});
export const selectUpgradeSchema = createSelectSchema(upgrades);

export const insertReferralSchema = createInsertSchema(referrals).omit({
  createdAt: true,
});
export const selectReferralSchema = createSelectSchema(referrals);

export const insertCommissionSchema = createInsertSchema(commissions).omit({
  createdAt: true,
});
export const selectCommissionSchema = createSelectSchema(commissions);

export const insertWalletSchema = createInsertSchema(wallets).omit({
  createdAt: true,
  updatedAt: true,
});
export const selectWalletSchema = createSelectSchema(wallets);

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type MiningData = typeof miningData.$inferSelect;
export type InsertMiningData = z.infer<typeof insertMiningDataSchema>;
export type Upgrade = typeof upgrades.$inferSelect;
export type InsertUpgrade = z.infer<typeof insertUpgradeSchema>;
export type Referral = typeof referrals.$inferSelect;
export type InsertReferral = z.infer<typeof insertReferralSchema>;
export type Commission = typeof commissions.$inferSelect;
export type InsertCommission = z.infer<typeof insertCommissionSchema>;
export type Wallet = typeof wallets.$inferSelect;
export type InsertWallet = z.infer<typeof insertWalletSchema>;