import ApiError from '../utils/ApiError.js';
import { normalizeName, validateIndianPhone } from './authValidator.js';

export const ADDRESS_LABELS = ['Home', 'Work', 'Other'];
export const INDIAN_STATES = [
  'Andaman and Nicobar Islands',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Puducherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];
export const ADDRESS_MIN_LENGTH = 3;
export const ADDRESS_MAX_LENGTH = 120;
export const STREET_MIN_LENGTH = 3;
export const STREET_MAX_LENGTH = 100;
export const CITY_MIN_LENGTH = 2;
export const CITY_MAX_LENGTH = 50;

const ADDRESS_LINE_REGEX = /^[A-Za-z0-9\s,./#&()-]+$/;
const CITY_REGEX = /^[A-Za-z]+(?:[ .'-][A-Za-z]+)*$/;
const INDIAN_PIN_REGEX = /^[1-9]\d{5}$/;

export const validateAddressLine = (value, label = 'Address', min = ADDRESS_MIN_LENGTH, max = ADDRESS_MAX_LENGTH) => {
  const clean = normalizeName(value);
  if (!clean) {
    throw new ApiError(400, `${label} is required`);
  }
  if (clean.length < min) {
    throw new ApiError(400, `${label} must be at least ${min} characters`);
  }
  if (clean.length > max) {
    throw new ApiError(400, `${label} must not exceed ${max} characters`);
  }
  if (!/[A-Za-z0-9]/.test(clean) || !ADDRESS_LINE_REGEX.test(clean)) {
    throw new ApiError(400, `${label} contains invalid characters`);
  }
  return clean;
};

export const validateCityName = (city) => {
  const clean = normalizeName(city);
  if (!clean) {
    throw new ApiError(400, 'Town / City is required');
  }
  if (clean.length < CITY_MIN_LENGTH) {
    throw new ApiError(400, `Town / City must be at least ${CITY_MIN_LENGTH} characters`);
  }
  if (clean.length > CITY_MAX_LENGTH) {
    throw new ApiError(400, `Town / City must not exceed ${CITY_MAX_LENGTH} characters`);
  }
  if (!CITY_REGEX.test(clean)) {
    throw new ApiError(400, 'Town / City may only contain letters, spaces, dots, hyphens, or apostrophes');
  }
  return clean;
};

export const validateStateName = (state) => {
  const clean = normalizeName(state);
  if (!clean) {
    throw new ApiError(400, 'State is required');
  }
  const matched = INDIAN_STATES.find((item) => item.toLowerCase() === clean.toLowerCase());
  if (!matched) {
    throw new ApiError(400, 'Please select a valid Indian state or union territory');
  }
  return matched;
};

export const validateIndianPin = (pin) => {
  const clean = typeof pin === 'string' ? pin.trim() : '';
  if (!clean) {
    throw new ApiError(400, 'PIN code is required');
  }
  if (!INDIAN_PIN_REGEX.test(clean)) {
    throw new ApiError(400, 'Enter a valid 6-digit Indian PIN code (cannot start with 0)');
  }
  return clean;
};

export const validateAddressLabel = (label) => {
  if (label === undefined) return 'Home';
  if (!ADDRESS_LABELS.includes(label)) {
    throw new ApiError(400, 'Address label must be Home, Work, or Other');
  }
  return label;
};

export const validateAddressPayload = (payload, { partial = false } = {}) => {
  const cleaned = {};

  if (!partial || payload.label !== undefined) {
    cleaned.label = validateAddressLabel(payload.label);
  }
  if (!partial || payload.address !== undefined) {
    cleaned.address = validateAddressLine(
      payload.address,
      'Flat / House / Building',
      ADDRESS_MIN_LENGTH,
      ADDRESS_MAX_LENGTH
    );
  }
  if (!partial || payload.street !== undefined) {
    cleaned.street = validateAddressLine(
      payload.street,
      'Street address',
      STREET_MIN_LENGTH,
      STREET_MAX_LENGTH
    );
  }
  if (!partial || payload.city !== undefined) {
    cleaned.city = validateCityName(payload.city);
  }
  if (!partial || payload.state !== undefined) {
    cleaned.state = validateStateName(payload.state);
  }
  if (!partial || payload.pin !== undefined) {
    cleaned.pin = validateIndianPin(payload.pin);
  }
  if (!partial || payload.phone !== undefined) {
    cleaned.phone = validateIndianPhone(payload.phone);
  }
  if (payload.isDefault !== undefined) {
    cleaned.isDefault = Boolean(payload.isDefault);
  }

  return cleaned;
};
