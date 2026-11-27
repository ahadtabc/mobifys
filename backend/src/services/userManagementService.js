import User from '../models/User.js';
import Address from '../models/Address.js';
import ApiError from '../utils/ApiError.js';
import { revokeAllUserTokens } from './tokenService.js';

const USER_SORT_OPTIONS = {
  latest: { createdAt: -1 },
  oldest: { createdAt: 1 },
  name_asc: { name: 1, createdAt: -1 },
  name_desc: { name: -1, createdAt: -1 },
  wallet_desc: { walletBalance: -1, createdAt: -1 },
  wallet_asc: { walletBalance: 1, createdAt: -1 },
};

export const listCustomers = async ({
  page = 1,
  limit = 10,
  search = '',
  status = 'all',
  sort = 'latest',
}) => {
  const parsedPage = Math.max(1, parseInt(page, 10) || 1);
  const parsedLimit = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));
  const cleanSearch = search.trim();
  const cleanStatus = status.toLowerCase();
  const cleanSort = typeof sort === 'string' ? sort.toLowerCase() : 'latest';
  const sortOrder = USER_SORT_OPTIONS[cleanSort] || USER_SORT_OPTIONS.latest;

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
  const usersQuery = User.find(query)
    .select('-passwordHash')
    .sort(sortOrder)
    .skip(skip)
    .limit(parsedLimit)
    .lean();

  if (cleanSort === 'name_asc' || cleanSort === 'name_desc') {
    usersQuery.collation({ locale: 'en', strength: 2 });
  }

  const [totalUsers, users, totalCustomers, activeCustomers, blockedCustomers] = await Promise.all([
    User.countDocuments(query),
    usersQuery,
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
