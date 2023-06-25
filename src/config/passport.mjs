import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import envs from './envs.mjs';
import UserService from '../service/userService.mjs';

export default (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: envs.GOOGLE_CLIENT_ID,
        clientSecret: envs.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, cb) => {
        const userService = new UserService();
        const user = await userService.findOrCreate(profile);
        cb(null, user);
      },
    ),
  );
  passport.deserializeUser((userData, done) => {
    done(null, userData);
  });
  passport.serializeUser((user, done) => {
    if (user.insertedId) {
      return done(null, user.insertedId.toString());
    }

    return done(null, user._id.toString());
  });
};
