import User from '../../models/User.js';
import Address from '../../models/Address.js';

export const getAllUsers = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.max(1, parseInt(req.query.limit, 10) || 10);
    const search = (req.query.search || '').trim();
    const status = (req.query.status || 'all').toLowerCase();

    const query = { role: 'user' };

    if (search) {
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      query.$or = [
        { name: { $regex: escapedSearch, $options: 'i' } },
        { email: { $regex: escapedSearch, $options: 'i' } },
        { phone: { $regex: escapedSearch, $options: 'i' } },
      ];
    }

    if (status === 'active') {
      query.isBlocked = false;
    } else if (status === 'blocked') {
      query.isBlocked = true;
    }

    const totalUsers = await User.countDocuments(query);
    const totalPages = Math.ceil(totalUsers / limit) || 1;
    const skip = (page - 1) * limit;

    const users = await User.find(query)
      .select('-passwordHash')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      users,
      pagination: {
        currentPage: page,
        totalPages,
        totalUsers,
        limit,
        showingFrom: totalUsers === 0 ? 0 : skip + 1,
        showingTo: Math.min(skip + limit, totalUsers),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id, role: 'user' }).select('-passwordHash');

    if (!user) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    const addresses = await Address.find({ userId: user._id, status: 'active' }).sort({
      isDefault: -1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      user,
      addresses,
    });
  } catch (error) {
    next(error);
  }
};

export const toggleBlockUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id, role: 'user' });

    if (!user) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    user.isBlocked = !user.isBlocked;
    user.status = user.isBlocked ? 'blocked' : 'active';
    await user.save();

    res.status(200).json({
      success: true,
      message: user.isBlocked
        ? `${user.name} has been blocked`
        : `${user.name} has been unblocked`,
      user: {
        _id: user._id,
        name: user.name,
        isBlocked: user.isBlocked,
        status: user.status,
      },
    });
  } catch (error) {
    next(error);
  }
};