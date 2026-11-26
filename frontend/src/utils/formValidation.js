import toast from 'react-hot-toast';

export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 50;
export const EMAIL_MAX_LENGTH = 100;
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 64;

export const ADDRESS_MIN_LENGTH = 3;
export const ADDRESS_MAX_LENGTH = 120;
export const STREET_MIN_LENGTH = 3;
export const STREET_MAX_LENGTH = 100;
export const CITY_MIN_LENGTH = 2;
export const CITY_MAX_LENGTH = 50;

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

const NAME_REGEX = /^[A-Za-z]+(?:[ .'-][A-Za-z]+)*$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const INDIAN_PHONE_REGEX = /^[6-9]\d{9}$/;
const FLEXIBLE_INDIAN_PHONE_REGEX = /^(?:\+91|91|0)?([6-9]\d{9})$/;
const ADDRESS_LINE_REGEX = /^[A-Za-z0-9\s,./#&()-]+$/;
const CITY_REGEX = /^[A-Za-z]+(?:[ .'-][A-Za-z]+)*$/;
const INDIAN_PIN_REGEX = /^[1-9]\d{5}$/;

export function normalizeText(value) {
  return typeof value === 'string' ? value.trim().replace(/\s+/g, ' ') : '';
}

export function extractIndianDigits(rawValue = '') {
  const digitsOnly = String(rawValue).replace(/\D/g, '');
  if (digitsOnly.length > 10 && digitsOnly.startsWith('91')) {
    return digitsOnly.slice(2, 12);
  }
  if (digitsOnly.length > 10 && digitsOnly.startsWith('0')) {
    return digitsOnly.slice(1, 11);
  }
  return digitsOnly.slice(0, 10);
}

export function extractPinDigits(rawValue = '') {
  return String(rawValue).replace(/\D/g, '').slice(0, 6);
}

export function extractOtpDigits(rawValue = '') {
  return String(rawValue).replace(/\D/g, '').slice(0, 6);
}

export function getPasswordChecks(password = '') {
  return {
    hasMinMaxLen:
      password.length >= PASSWORD_MIN_LENGTH && password.length <= PASSWORD_MAX_LENGTH,
    hasUpperLower: /[a-z]/.test(password) && /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSymbol: /[^A-Za-z0-9\s]/.test(password),
  };
}

function findFirstErrorMessage(errorNode) {
  if (!errorNode || typeof errorNode !== 'object') return null;
  if (typeof errorNode.message === 'string' && errorNode.message) {
    return errorNode.message;
  }
  for (const nested of Object.values(errorNode)) {
    const found = findFirstErrorMessage(nested);
    if (found) return found;
  }
  return null;
}

export function toastFirstFormError(errors) {
  const firstMessage = findFirstErrorMessage(errors);
  if (firstMessage) {
    toast.error(firstMessage);
  }
}

export const nameRules = (requiredMessage = 'Full name is required') => ({
  validate: (value) => {
    const clean = normalizeText(value);
    if (!clean) return requiredMessage;
    if (clean.length < NAME_MIN_LENGTH) {
      return `Full name must be at least ${NAME_MIN_LENGTH} characters`;
    }
    if (clean.length > NAME_MAX_LENGTH) {
      return `Full name must not exceed ${NAME_MAX_LENGTH} characters`;
    }
    if (!NAME_REGEX.test(clean)) {
      return 'Use letters only (spaces, dots, hyphens, or apostrophes allowed)';
    }
    return true;
  },
});

export const emailRules = (requiredMessage = 'Email address is required') => ({
  validate: (value) => {
    const clean = typeof value === 'string' ? value.trim().toLowerCase() : '';
    if (!clean) return requiredMessage;
    if (clean.length > EMAIL_MAX_LENGTH || !EMAIL_REGEX.test(clean)) {
      return 'Enter a valid email address';
    }
    return true;
  },
});

export const indianPhoneRules = ({
  required = true,
  requiredMessage = 'Indian mobile number is required',
} = {}) => ({
  validate: (value) => {
    const clean = typeof value === 'string' ? value.trim() : '';
    if (!clean) {
      return required ? requiredMessage : true;
    }
    if (!INDIAN_PHONE_REGEX.test(clean)) {
      return 'Enter a valid 10-digit Indian mobile number (starts with 6–9)';
    }
    return true;
  },
});

export const optionalProfilePhoneRules = () => ({
  validate: (value) => {
    const clean = typeof value === 'string' ? value.trim() : '';
    if (!clean) return true;
    const compact = clean.replace(/[\s()-]/g, '');
    if (!FLEXIBLE_INDIAN_PHONE_REGEX.test(compact)) {
      return 'Enter a valid 10-digit Indian mobile number (e.g. +91 98470 12345)';
    }
    return true;
  },
});

export const strongPasswordRules = (requiredMessage = 'Password is required') => ({
  validate: (value) => {
    const password = typeof value === 'string' ? value : '';
    if (!password) return requiredMessage;
    if (/\s/.test(password)) return 'Password cannot contain spaces';
    if (password.length < PASSWORD_MIN_LENGTH) {
      return `Password must be at least ${PASSWORD_MIN_LENGTH} characters`;
    }
    if (password.length > PASSWORD_MAX_LENGTH) {
      return `Password must not exceed ${PASSWORD_MAX_LENGTH} characters`;
    }
    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
      return 'Include both uppercase and lowercase letters';
    }
    if (!/[0-9]/.test(password)) return 'Include at least one number';
    if (!/[^A-Za-z0-9\s]/.test(password)) return 'Include at least one special character';
    return true;
  },
});

export const minLengthPasswordRules = (
  requiredMessage = 'Password is required',
  minLength = PASSWORD_MIN_LENGTH
) => ({
  validate: (value) => {
    const password = typeof value === 'string' ? value : '';
    if (!password) return requiredMessage;
    if (password.length < minLength) {
      return `Password must be at least ${minLength} characters`;
    }
    if (password.length > PASSWORD_MAX_LENGTH) {
      return `Password must not exceed ${PASSWORD_MAX_LENGTH} characters`;
    }
    return true;
  },
});

export const confirmPasswordRules = (
  getPasswordValue,
  requiredMessage = 'Please re-enter your password'
) => ({
  validate: (value) => {
    if (!value) return requiredMessage;
    if (value !== getPasswordValue()) return 'Passwords do not match';
    return true;
  },
});

export const otpRules = (requiredMessage = 'Enter the 6-digit verification code') => ({
  validate: (value) => {
    const clean = extractOtpDigits(value);
    if (clean.length !== 6) return requiredMessage;
    return true;
  },
});

export const addressLineRules = () => ({
  validate: (value) => {
    const clean = normalizeText(value);
    if (!clean) return 'Flat / House No. / Building is required';
    if (clean.length < ADDRESS_MIN_LENGTH) {
      return `Must be at least ${ADDRESS_MIN_LENGTH} characters`;
    }
    if (clean.length > ADDRESS_MAX_LENGTH) {
      return `Must not exceed ${ADDRESS_MAX_LENGTH} characters`;
    }
    if (!/[A-Za-z0-9]/.test(clean) || !ADDRESS_LINE_REGEX.test(clean)) {
      return 'Contains invalid characters';
    }
    return true;
  },
});

export const streetRules = () => ({
  validate: (value) => {
    const clean = normalizeText(value);
    if (!clean) return 'Street address is required';
    if (clean.length < STREET_MIN_LENGTH) {
      return `Street address must be at least ${STREET_MIN_LENGTH} characters`;
    }
    if (clean.length > STREET_MAX_LENGTH) {
      return `Street address must not exceed ${STREET_MAX_LENGTH} characters`;
    }
    if (!/[A-Za-z0-9]/.test(clean) || !ADDRESS_LINE_REGEX.test(clean)) {
      return 'Street address contains invalid characters';
    }
    return true;
  },
});

export const cityRules = () => ({
  validate: (value) => {
    const clean = normalizeText(value);
    if (!clean) return 'Town / City is required';
    if (clean.length < CITY_MIN_LENGTH) {
      return `Town / City must be at least ${CITY_MIN_LENGTH} characters`;
    }
    if (clean.length > CITY_MAX_LENGTH) {
      return `Town / City must not exceed ${CITY_MAX_LENGTH} characters`;
    }
    if (!CITY_REGEX.test(clean)) {
      return 'Use letters only (spaces, dots, hyphens, or apostrophes allowed)';
    }
    return true;
  },
});

export const stateRules = () => ({
  validate: (value) => {
    if (!value || !INDIAN_STATES.includes(value)) {
      return 'Please select a state / union territory';
    }
    return true;
  },
});

export const pinRules = () => ({
  validate: (value) => {
    const clean = typeof value === 'string' ? value.trim() : '';
    if (!clean) return 'PIN code is required';
    if (!INDIAN_PIN_REGEX.test(clean)) {
      return 'Enter a valid 6-digit Indian PIN code (cannot start with 0)';
    }
    return true;
  },
});
