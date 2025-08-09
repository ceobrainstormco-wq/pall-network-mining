export interface UpgradePackage {
  id: string;
  name: string;
  type: 'bronze' | 'silver' | 'golden' | 'diamond';
  price: number;
  speedBoost: number; // Percentage increase (200% = 3x speed)
  color: {
    primary: string;
    secondary: string;
    accent: string;
  };
  features: string[];
  badge: string;
}

export const NEW_UPGRADE_PACKAGES: UpgradePackage[] = [
  {
    id: 'bronze',
    name: 'Bronze',
    type: 'bronze',
    price: 3,
    speedBoost: 200, // 200% faster = 3x speed
    color: {
      primary: '#CD7F32',
      secondary: '#B8860B',
      accent: '#DAA520'
    },
    features: [
      '200% faster token mining',
      'Increase booster buy %',
      'Monthly profit-sharing in PALL',
      '5% F1 referral commission',
      '2.5% F2 referral commission',
      'No KYC required'
    ],
    badge: 'STARTER'
  },
  {
    id: 'silver',
    name: 'Silver',
    type: 'silver',
    price: 14,
    speedBoost: 600, // 600% faster = 7x speed
    color: {
      primary: '#C0C0C0',
      secondary: '#A8A8A8',
      accent: '#E5E5E5'
    },
    features: [
      '600% faster token mining',
      'Increase booster buy %',
      'Monthly profit-sharing in PALL',
      '5% F1 referral commission',
      '2.5% F2 referral commission',
      'No KYC required',
      'Priority support'
    ],
    badge: 'POPULAR'
  },
  {
    id: 'golden',
    name: 'Golden',
    type: 'golden',
    price: 55,
    speedBoost: 3000, // 3000% faster = 31x speed
    color: {
      primary: '#FFD700',
      secondary: '#FFA500',
      accent: '#FFFF00'
    },
    features: [
      '3000% faster token mining',
      'Increase booster buy %',
      'Monthly profit-sharing in PALL',
      '5% F1 referral commission',
      '2.5% F2 referral commission',
      'No KYC required',
      'Priority support',
      'Exclusive rewards'
    ],
    badge: 'PREMIUM'
  },
  {
    id: 'diamond',
    name: 'Diamond',
    type: 'diamond',
    price: 100,
    speedBoost: 6000, // 6000% faster = 61x speed
    color: {
      primary: '#B9F2FF',
      secondary: '#4FC3F7',
      accent: '#E1F5FE'
    },
    features: [
      '6000% faster token mining',
      'Increase booster buy %',
      'Monthly profit-sharing in PALL',
      '5% F1 referral commission',
      '2.5% F2 referral commission',
      'No KYC required',
      'Premium support',
      'Exclusive rewards',
      'VIP access'
    ],
    badge: 'ELITE'
  }
];

export interface ReferralCommission {
  level: 'f1' | 'f2';
  percentage: number;
}

export const REFERRAL_COMMISSIONS: ReferralCommission[] = [
  { level: 'f1', percentage: 5 },
  { level: 'f2', percentage: 2.5 }
];

export interface WalletData {
  pallBalance: number;
  usdtCommissions: number;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  type: 'mining' | 'commission' | 'withdrawal' | 'deposit';
  amount: number;
  currency: 'PALL' | 'USDT';
  status: 'pending' | 'completed' | 'failed';
  timestamp: Date;
  hash?: string;
}