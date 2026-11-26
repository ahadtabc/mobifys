import dotenv from 'dotenv';

dotenv.config();

const MIN_SECRET_LENGTH = 32;

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  port: Number(process.env.PORT) || 3001,
  mongoUri: process.env.MONGO_URI || '',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',

  jwt: {
    userAccessSecret: process.env.JWT_USER_ACCESS_SECRET || '',
    userRefreshSecret: process.env.JWT_USER_REFRESH_SECRET || '',
    adminAccessSecret: process.env.JWT_ADMIN_ACCESS_SECRET || '',
    adminRefreshSecret: process.env.JWT_ADMIN_REFRESH_SECRET || '',
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    rememberRefreshExpiresIn: process.env.JWT_REMEMBER_REFRESH_EXPIRES_IN || '30d',
  },

  cookieSecret: process.env.COOKIE_SECRET || '',

  email: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || '',
  },

  aws: {
    region: process.env.AWS_REGION || '',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    bucketName: process.env.AWS_BUCKET_NAME || '',
  },

  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackUrl: process.env.GOOGLE_CALLBACK_URL || '/api/user/auth/google/callback',
  },
};

/**
 * Validate required JWT and cookie secrets on boot so missing or weak
 * configuration fails fast instead of falling back to hardcoded values.
 */
export const assertAuthEnv = () => {
  const requiredSecrets = [
    ['JWT_USER_ACCESS_SECRET', env.jwt.userAccessSecret],
    ['JWT_USER_REFRESH_SECRET', env.jwt.userRefreshSecret],
    ['JWT_ADMIN_ACCESS_SECRET', env.jwt.adminAccessSecret],
    ['JWT_ADMIN_REFRESH_SECRET', env.jwt.adminRefreshSecret],
    ['COOKIE_SECRET', env.cookieSecret],
  ];

  for (const [name, value] of requiredSecrets) {
    if (!value || value.length < MIN_SECRET_LENGTH) {
      throw new Error(`${name} must be set and at least ${MIN_SECRET_LENGTH} characters`);
    }
  }

  const secretValues = requiredSecrets.map(([, value]) => value);
  if (new Set(secretValues).size !== secretValues.length) {
    throw new Error('JWT and cookie secrets must all be distinct cryptographic values');
  }
};
