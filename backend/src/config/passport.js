import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';

const configurePassport = () => {
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL:
            process.env.GOOGLE_CALLBACK_URL ||
            `http://localhost:${process.env.PORT || 3001}/api/user/auth/google/callback`,
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            const email = profile.emails?.[0]?.value?.toLowerCase().trim();
            if (!email) {
              return done(new Error('No email returned from Google account'), null);
            }

            let user = await User.findOne({ email });

            if (user) {
              if (user.isBlocked) {
                return done(null, false, { message: 'blocked' });
              }
              if (!user.googleId) {
                user.googleId = profile.id;
              }
              if (!user.profileImage && profile.photos?.[0]?.value) {
                user.profileImage = profile.photos[0].value;
              }
              if (user.status === 'unverified') {
                user.status = 'active';
              }
              await user.save();
              return done(null, user);
            }

            // First-time Google Sign-Up: create verified active user
            user = await User.create({
              name: profile.displayName || email.split('@')[0],
              email,
              googleId: profile.id,
              profileImage: profile.photos?.[0]?.value || '',
              role: 'user',
              status: 'active',
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