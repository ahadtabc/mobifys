import jwt from 'jsonwebtoken';

const generateToken = (res, userId, role, keepSignedIn = false) => {
  const maxAgeDays = keepSignedIn ? 30 : 1;

  const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: `${maxAgeDays}d`,
  });

  res.cookie('mobifys_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: maxAgeDays * 24 * 60 * 60 * 1000,
  });

  return token;
};

export default generateToken;