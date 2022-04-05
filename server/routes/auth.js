const express = require('express');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oidc');
const router = express.Router();
const db = require('../models/auction');

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env['GOOGLE_CLIENT_ID'],
      clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
      callbackURL: 'api/oauth2/redirect/google',
      scope: ['profile'],
    },

    function (issuer, profile, cb) {
      db.get(
        'SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?',
        [issuer, profile.id],
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
                  [id, issuer, profile.id],
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

router.get('/federated/google', passport.authenticate('google'));

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
