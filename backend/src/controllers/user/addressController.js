import Address from '../../models/Address.js';

// @desc    Get all active addresses for logged-in user
// @route   GET /api/user/addresses
export const getAddresses = async (req, res, next) => {
  try {
    const addresses = await Address.find({ userId: req.user._id, status: 'active' }).sort({
      isDefault: -1,
      createdAt: -1,
    });
    res.status(200).json({ success: true, addresses });
  } catch (error) {
    next(error);
  }
};

// @desc    Add a new address
// @route   POST /api/user/addresses
export const addAddress = async (req, res, next) => {
  try {
    const { label, address, city, pin, phone, isDefault } = req.body;

    if (!address || !city || !pin || !phone) {
      return res.status(400).json({ success: false, message: 'All address fields are required' });
    }

    const existingCount = await Address.countDocuments({ userId: req.user._id, status: 'active' });
    const shouldBeDefault = existingCount === 0 ? true : Boolean(isDefault);

    if (shouldBeDefault) {
      await Address.updateMany({ userId: req.user._id }, { isDefault: false });
    }

    const newAddress = await Address.create({
      userId: req.user._id,
      label: label || 'Home',
      address: address.trim(),
      city: city.trim(),
      pin: pin.trim(),
      phone: phone.trim(),
      isDefault: shouldBeDefault,
    });

    res.status(201).json({
      success: true,
      message: 'Address added successfully',
      address: newAddress,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Edit an existing address
// @route   PUT /api/user/addresses/:id
export const updateAddress = async (req, res, next) => {
  try {
    const { label, address, city, pin, phone, isDefault } = req.body;
    const addr = await Address.findOne({ _id: req.params.id, userId: req.user._id, status: 'active' });

    if (!addr) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }

    if (isDefault) {
      await Address.updateMany({ userId: req.user._id }, { isDefault: false });
      addr.isDefault = true;
    }

    if (label) addr.label = label;
    if (address) addr.address = address.trim();
    if (city) addr.city = city.trim();
    if (pin) addr.pin = pin.trim();
    if (phone) addr.phone = phone.trim();

    await addr.save();

    res.status(200).json({
      success: true,
      message: 'Address updated successfully',
      address: addr,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an address (soft delete matching your schema's status field)
// @route   DELETE /api/user/addresses/:id
export const deleteAddress = async (req, res, next) => {
  try {
    const addr = await Address.findOne({ _id: req.params.id, userId: req.user._id, status: 'active' });

    if (!addr) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }

    addr.status = 'deleted';
    const wasDefault = addr.isDefault;
    addr.isDefault = false;
    await addr.save();

    // Promote the newest remaining active address to default if needed
    if (wasDefault) {
      const nextAddr = await Address.findOne({ userId: req.user._id, status: 'active' }).sort({
        createdAt: -1,
      });
      if (nextAddr) {
        nextAddr.isDefault = true;
        await nextAddr.save();
      }
    }

    res.status(200).json({
      success: true,
      message: 'Address deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};