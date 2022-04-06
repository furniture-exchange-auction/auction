const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');
const db = require('../db');

passport.use(
  new LocalStrategy(function verify(email, password, cb) {
    db.query('SELECT * FROM account WHERE email = $1', [email])
      .then((accSearch) => {
        if (!accSearch.rows.length) {
          return cb(null, false, { message: 'Incorrect username or password' });
        } else {
          crypto.pbkdf2(
            password,
            10,
            310000,
            32,
            'sha256',
            function (err, hashedPassword) {
              if (err) return cb(err);
              if (
                !crypto.timingSafeEqual(
                  accSearch.rows[0].password,
                  hashedPassword
                )
              ) {
                return cb(null, false, {
                  message: 'Incorrect username or password',
                });
              } else {
                const { _id, display_name } = accSearch.rows[0];
                const user = {
                  id: _id,
                  displayName: display_name,
                };
                return cb(null, user);
              }
            }
          );
        }
      })
      .catch((err) => {
        return cb({
          log: `Error in passport local strategy accoutn query: ${err.message}`,
          status: 500,
          message: { err: 'An unknown error occurred - please try again' },
        });
      });
  })
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  cb(null, user);
});

const router = express.Router();

router.post(
  '/login',
  passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true,
  })
);

router.post('/signup', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const display_name = req.body.display_name;

  db.query('SELECT * FROM account WHERE email = $1', [email])
    .then((accSearch) => {
      if (accSearch.rows.length) {
        return cb(null, false, {
          message: 'Account already exists, try logging in.',
        });
      } else {
        crypto.pbkdf2(
          password,
          10,
          310000,
          32,
          'sha256',
          function (err, hashedPassword) {
            if (err) {
              return next(err);
            }
            db.query(
              'INSERT INTO account (display_name, email, password) VALUES ($1, $2, $3) RETURNING *',
              [display_name, email, hashedPassword]
            )
              .then((addAcc) => {
                const { userId, userDisplayName } = addAcc.rows[0];
                const user = {
                  id: userId,
                  displayName: userDisplayName,
                };
                return cb(null, user);
              })
              .catch((err) => {
                return cb({
                  log: `Error in insert in local signup route: ${err.message}`,
                  status: 500,
                  message: {
                    err: 'An unknown error occurred - please try again',
                  },
                });
              });
          }
        );
      }
    })
    .catch((err) => {
      return cb({
        log: `Error in query in local signup route: ${err.message}`,
        status: 500,
        message: { err: 'An unknown error occurred - please try again' },
      });
    });
});
