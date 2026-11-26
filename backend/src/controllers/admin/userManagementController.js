import asyncHandler from '../../utils/asyncHandler.js';
import { validateObjectId } from '../../validators/authValidator.js';
import {
  getCustomerDetails,
  listCustomers,
  toggleCustomerBlockStatus,
} from '../../services/userManagementService.js';

export const getAllUsers = asyncHandler(async (req, res) => {
  const { users, pagination, stats } = await listCustomers({
    page: req.query.page,
    limit: req.query.limit,
    search: req.query.search,
    status: req.query.status,
  });

  res.status(200).json({
    success: true,
    users,
    pagination,
    stats,
  });
});

export const getUserById = asyncHandler(async (req, res) => {
  validateObjectId(req.params.id, 'Customer');
  const { user, addresses } = await getCustomerDetails(req.params.id);

  res.status(200).json({
    success: true,
    user,
    addresses,
  });
});

export const toggleBlockUser = asyncHandler(async (req, res) => {
  validateObjectId(req.params.id, 'Customer');
  const user = await toggleCustomerBlockStatus(req.params.id);

  res.status(200).json({
    success: true,
    message: user.isBlocked
      ? `${user.name} has been blocked`
      : `${user.name} has been unblocked`,
    user,
  });
});
