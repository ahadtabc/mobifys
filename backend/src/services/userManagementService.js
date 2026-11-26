import User from '../models/User.js';
import Address from '../models/Address.js';
import ApiError from '../utils/ApiError.js';
import { revokeAllUserTokens } from './tokenService.js';

export const listCustomers = async ({ page = 1, limit = 10, search = '', status = 'all' }) => {
  const parsedPage = Math.max(1, parseInt(page, 10) || 1);
  const parsedLimit = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));
  const cleanSearch = search.trim();
  const cleanStatus = status.toLowerCase();

  const query = { role: 'user' };

  if (cleanSearch) {
    const escapedSearch = cleanSearch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    query.$or = [
      { name: { $regex: escapedSearch, $options: 'i' } },
      { email: { $regex: escapedSearch, $options: 'i' } },
      { phone: { $regex: escapedSearch, $options: 'i' } },
    ];
  }

  if (cleanStatus === 'active') {
    query.isBlocked = false;
  } else if (cleanStatus === 'blocked') {
    query.isBlocked = true;
  }

  const skip = (parsedPage - 1) * parsedLimit;
  const [totalUsers, users, totalCustomers, activeCustomers, blockedCustomers] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
      .select('-passwordHash')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parsedLimit)
      .lean(),
    User.countDocuments({ role: 'user' }),
    User.countDocuments({ role: 'user', isBlocked: false }),
    User.countDocuments({ role: 'user', isBlocked: true }),
  ]);

  const totalPages = Math.ceil(totalUsers / parsedLimit) || 1;

  return {
    users,
    pagination: {
      currentPage: parsedPage,
      totalPages,
      totalUsers,
      limit: parsedLimit,
      showingFrom: totalUsers === 0 ? 0 : skip + 1,
      showingTo: Math.min(skip + parsedLimit, totalUsers),
    },
    stats: {
      total: totalCustomers,
      active: activeCustomers,
      blocked: blockedCustomers,
    },
  };
};

export const getCustomerDetails = async (userId) => {
  const [user, addresses] = await Promise.all([
    User.findOne({ _id: userId, role: 'user' }).select('-passwordHash').lean(),
    Address.find({ userId, status: 'active' })
      .sort({ isDefault: -1, createdAt: -1 })
      .lean(),
  ]);

  if (!user) {
    throw new ApiError(404, 'Customer not found');
  }

  return { user, addresses };
};

export const toggleCustomerBlockStatus = async (userId) => {
  const user = await User.findOne({ _id: userId, role: 'user' });
  if (!user) {
    throw new ApiError(404, 'Customer not found');
  }

  user.isBlocked = !user.isBlocked;
  user.status = user.isBlocked ? 'blocked' : 'active';
  await user.save();

  if (user.isBlocked) {
    await revokeAllUserTokens(user._id, 'user');
  }

  return {
    _id: user._id,
    name: user.name,
    isBlocked: user.isBlocked,
    status: user.status,
  };
};
