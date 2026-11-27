import mongoose from 'mongoose';
import crypto from 'crypto';

const userOnlyDefault = (factory) =>
  function () {
    if (this.role !== 'user') return undefined;
    return typeof factory === 'function' ? factory() : factory;
  };

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    passwordHash: {
      type: String,
      default: null,
    },
    profileImage: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    status: {
      type: String,
      enum: ['active', 'blocked', 'unverified'],
      default: 'unverified',
    },
    isBlocked: {
      type: Boolean,
      default: userOnlyDefault(false),
    },
    mustChangePassword: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: {
      type: Date,
      default: null,
    },
    walletBalance: {
      type: Number,
      default: userOnlyDefault(0),
    },
    wishlist: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
      ],
      default: userOnlyDefault(() => []),
    },
    referralCode: {
      type: String,
      unique: true,
      sparse: true,
    },
    referredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: userOnlyDefault(null),
    },
    googleId: {
      type: String,
      default: userOnlyDefault(null),
    },
  },
  { timestamps: true }
);

userSchema.index({ role: 1, isBlocked: 1, createdAt: -1 });
userSchema.index({ googleId: 1 }, { sparse: true });

userSchema.pre('save', async function () {
  if (this.role === 'user') {
    if (!this.referralCode) {
      this.referralCode = 'MOB-' + crypto.randomBytes(3).toString('hex').toUpperCase();
    }
    return;
  }

  // Admins do not store user-only referral, wallet, wishlist, block, or SSO fields
  this.referralCode = undefined;
  this.referredBy = undefined;
  this.isBlocked = undefined;
  this.walletBalance = undefined;
  this.wishlist = undefined;
  this.googleId = undefined;
});

const User = mongoose.model('User', userSchema);
export default User;
