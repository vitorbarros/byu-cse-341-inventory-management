import express from 'express';
import passport from 'passport';

const oauth2 = express.Router();

oauth2.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }, null),
);
oauth2.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }, null),
  (req, res) => {
    res.redirect('/dashboard');
  },
);

export default oauth2;
