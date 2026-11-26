import mongoose from 'mongoose';
import ApiError from '../utils/ApiError.js';

export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 50;
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 64;

const NAME_REGEX = /^[A-Za-z]+(?:[ .'-][A-Za-z]+)*$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const INDIAN_PHONE_REGEX = /^(?:\+91|91|0)?([6-9]\d{9})$/;

export const normalizeEmail = (email) =>
  typeof email === 'string' ? email.toLowerCase().trim() : '';

export const normalizeName = (name) =>
  typeof name === 'string' ? name.trim().replace(/\s+/g, ' ') : '';

export const requireFields = (fields, message = 'All required fields must be filled') => {
  const missing = fields.some((value) =>
    typeof value === 'string' ? !value.trim() : value === undefined || value === null || value === ''
  );
  if (missing) {
    throw new ApiError(400, message);
  }
};

export const validateFullName = (name) => {
  const cleanName = normalizeName(name);
  if (!cleanName) {
    throw new ApiError(400, 'Full name is required');
  }
  if (cleanName.length < NAME_MIN_LENGTH) {
    throw new ApiError(400, `Full name must be at least ${NAME_MIN_LENGTH} characters`);
  }
  if (cleanName.length > NAME_MAX_LENGTH) {
    throw new ApiError(400, `Full name must not exceed ${NAME_MAX_LENGTH} characters`);
  }
  if (!NAME_REGEX.test(cleanName)) {
    throw new ApiError(
      400,
      'Full name may only contain letters, spaces, dots, hyphens, or apostrophes'
    );
  }
  return cleanName;
};

export const validateEmailAddress = (email) => {
  const cleanEmail = normalizeEmail(email);
  if (!cleanEmail) {
    throw new ApiError(400, 'Email address is required');
  }
  if (cleanEmail.length > 100 || !EMAIL_REGEX.test(cleanEmail)) {
    throw new ApiError(400, 'Please enter a valid email address');
  }
  return cleanEmail;
};

export const validateIndianPhone = (phone) => {
  if (typeof phone !== 'string' || !phone.trim()) {
    throw new ApiError(400, 'Mobile number is required');
  }
  const compact = phone.replace(/[\s()-]/g, '');
  const match = compact.match(INDIAN_PHONE_REGEX);
  if (!match) {
    throw new ApiError(
      400,
      'Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9'
    );
  }
  return `+91 ${match[1]}`;
};

export const validatePasswordPair = (password, confirmPassword, minLength = PASSWORD_MIN_LENGTH) => {
  if (password !== confirmPassword) {
    throw new ApiError(400, 'Passwords do not match');
  }
  if (typeof password !== 'string' || password.length < minLength) {
    throw new ApiError(400, `Password must be at least ${minLength} characters`);
  }
  if (password.length > PASSWORD_MAX_LENGTH) {
    throw new ApiError(400, `Password must not exceed ${PASSWORD_MAX_LENGTH} characters`);
  }
};

export const validateStrongPassword = (password, confirmPassword) => {
  validatePasswordPair(password, confirmPassword, PASSWORD_MIN_LENGTH);

  if (/\s/.test(password)) {
    throw new ApiError(400, 'Password cannot contain spaces');
  }
  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    throw new ApiError(400, 'Password must include both uppercase and lowercase letters');
  }
  if (!/[0-9]/.test(password)) {
    throw new ApiError(400, 'Password must include at least one number');
  }
  if (!/[^A-Za-z0-9\s]/.test(password)) {
    throw new ApiError(400, 'Password must include at least one special character');
  }
};

export const validateObjectId = (id, label = 'Resource') => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, `Invalid ${label} ID`);
  }
};
