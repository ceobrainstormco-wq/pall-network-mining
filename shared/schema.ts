import { pgTable, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { z } from "zod";

export const users = pgTable("users", {
  id: text("id").primaryKey(), // Firebase UID
  email: text("email").notNull().unique(),
  displayName: text("display_name").notNull(),
  profilePicture: text("profile_picture"),
  provider: text("provider").notNull(), // 'google', 'facebook', 'twitter'
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
  packageType: text("package_type").notNull(), // '6month', '1year', 'unlimited'
  speedMultiplier: integer("speed_multiplier").notNull(),
  expiryDate: timestamp("expiry_date"),
  isActive: boolean("is_active").default(true).notNull(),
  purchaseDate: timestamp("purchase_date").defaultNow().notNull(),
  transactionHash: text("transaction_hash"),
});

// Relations
export const usersRelations = relations(users, ({ one }) => ({
  miningData: one(miningData, {
    fields: [users.id],
    references: [miningData.userId],
  }),
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

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type MiningData = typeof miningData.$inferSelect;
export type InsertMiningData = z.infer<typeof insertMiningDataSchema>;
export type Upgrade = typeof upgrades.$inferSelect;
export type InsertUpgrade = z.infer<typeof insertUpgradeSchema>;