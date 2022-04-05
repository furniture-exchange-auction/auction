const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const db = require('../models/auction');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env['GOOGLE_CLIENT_ID'],
      clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
      callbackURL: '/api/oauth2/redirect/google',
      scope: ['profile', 'email'],
      state: true,
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log('in strategy');
      db.get(
        'SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?',
        ['https://accounts.google.com', profile.id],
        function (err, row) {
          if (err) {
            return cb(err);
          }
          if (!row) {
            db.run(
              'INSERT INTO accounts (display_name) VALUES (?)',
              [profile.displayName],
              function (err) {
                if (err) {
                  return cb(err);
                }

                var id = this.lastID;
                db.run(
                  'INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)',
                  [id, 'https://accounts.google.com', profile.id],
                  function (err) {
                    if (err) {
                      return cb(err);
                    }
                    var user = {
                      id: id,
                      name: profile.displayName,
                    };
                    return cb(null, user);
                  }
                );
              }
            );
          } else {
            db.get(
              'SELECT rowid AS id, * FROM accounts WHERE rowid = ?',
              [row.account_id],
              function (err, row) {
                if (err) {
                  return cb(err);
                }
                if (!row) {
                  return cb(null, false);
                }
                return cb(null, row);
              }
            );
          }
        }
      );
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  cb(null, user);
});

const router = express.Router();

router.get(
  '/federated/google',
  passport.authenticate('google')
);

router.get(
  '/oauth2/redirect/google',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);

router.post('/logout', function (req, res, next) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
