import mongoose, { Document, Types } from 'mongoose';

export type PremiumTier = 'basic' | 'plus' | 'gold';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  emailVerified: Boolean,
  college?: string;
  userDataId?: Types.ObjectId;
  createdAt: Date;
  refreshTokens: string[];
  dailySkips: Number,
  lastSkipTimestamp: Number,
  isPremium: Boolean,
  premiumExpiry: Date;
  premiumTier: PremiumTier;
  activeSession: string | null;
  updatedAt: Date;
}
