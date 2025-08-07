export interface UpgradePackage {
  id: string;
  name: string;
  duration: number; // in months, 0 for unlimited
  speedMultiplier: number;
  priceUSDT: number;
  description: string;
  popular?: boolean;
}

export interface UserUpgrade {
  packageId: string;
  packageName: string;
  speedMultiplier: number;
  activatedAt: number; // timestamp
  expiresAt: number | null; // timestamp or null for unlimited
  transactionHash: string;
}

export const UPGRADE_PACKAGES: UpgradePackage[] = [
  {
    id: '6month',
    name: '6 Months Package',
    duration: 6,
    speedMultiplier: 2,
    priceUSDT: 5,
    description: 'Double your mining speed for 6 months',
  },
  {
    id: '1year',
    name: '1 Year Package',
    duration: 12,
    speedMultiplier: 3,
    priceUSDT: 8,
    description: 'Triple your mining speed for 1 year',
    popular: true,
  },
  {
    id: 'unlimited',
    name: 'Unlimited Package',
    duration: 0,
    speedMultiplier: 3,
    priceUSDT: 18,
    description: 'Lifetime triple mining speed',
  },
];

export const getActiveUpgrade = (userId: string): UserUpgrade | null => {
  try {
    const storageKey = `pallNetworkUpgrade_${userId}`;
    const saved = localStorage.getItem(storageKey);
    if (!saved) return null;

    const upgrade: UserUpgrade = JSON.parse(saved);
    
    // Check if upgrade has expired
    if (upgrade.expiresAt && Date.now() > upgrade.expiresAt) {
      localStorage.removeItem(storageKey);
      return null;
    }

    return upgrade;
  } catch (error) {
    console.error('Error loading upgrade:', error);
    return null;
  }
};

export const saveUpgrade = (userId: string, upgrade: UserUpgrade): void => {
  try {
    const storageKey = `pallNetworkUpgrade_${userId}`;
    localStorage.setItem(storageKey, JSON.stringify(upgrade));
  } catch (error) {
    console.error('Error saving upgrade:', error);
  }
};

export const getCurrentSpeedMultiplier = (userId: string): number => {
  const activeUpgrade = getActiveUpgrade(userId);
  return activeUpgrade ? activeUpgrade.speedMultiplier : 1;
};