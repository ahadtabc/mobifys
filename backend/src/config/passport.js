import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';

const configurePassport = () => {
  // Google SSO Strategy
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: '/api/user/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            const email = profile.emails?.[0]?.value?.toLowerCase();
            if (!email) return done(new Error('Google account has no public email'), null);

            let user = await User.findOne({ email });

            if (user) {
              if (user.isBlocked) {
                return done(null, false, { message: 'Your account has been blocked' });
              }
              if (!user.googleId) {
                user.googleId = profile.id;
                if (!user.profileImage && profile.photos?.[0]?.value) {
                  user.profileImage = profile.photos[0].value;
                }
                await user.save();
              }
              return done(null, user);
            }

            user = await User.create({
              name: profile.displayName || 'Mobifys User',
              email,
              googleId: profile.id,
              profileImage: profile.photos?.[0]?.value || '',
              role: 'user',
              status: 'active',
              isBlocked: false,
            });

            return done(null, user);
          } catch (error) {
            return done(error, null);
          }
        }
      )
    );
  }
};

export default configurePassport;