const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');
const db = require('../models/auction');

passport.use(
  new LocalStrategy(function verify(email, password, cb) {
    db.query('SELECT * FROM account WHERE email = $1', [email])
      .then((accSearch) => {
        if (!accSearch.rows.length) {
          console.log('wrong');
          return cb(null, false, { message: 'Incorrect email or password' });
        } else {
          const salt = accSearch.rows[0].salt;
          crypto.pbkdf2(
            password,
            salt,
            310000,
            32,
            'sha256',
            function (err, hashedPassword) {
              if (err) return cb(err);
              if (
                accSearch.rows[0].password != hashedPassword.toString('hex')
              ) {
                return cb(null, false, {
                  message: 'Incorrect username or password',
                });
              } else {
                const { _id, display_name, email } = accSearch.rows[0];
                const user = {
                  id: _id,
                  displayName: display_name,
                  email: email,
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
    failureRedirect: '/login',
    failureMessage: true,
  }),
  function (req, res) {
    res.redirect('/home');
  }
);

router.post('/signup', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const display_name = req.body.display_name;

  db.query('SELECT * FROM account WHERE email = $1', [email])
    .then((accSearch) => {
      console.log('there')
      if (accSearch.rows.length) {
        res.locals.message = 'Email already registered. Try logging in.';
      } else {
        console.log('here')
        const salt = crypto.randomBytes(16).toString('hex');
        crypto.pbkdf2(
          password,
          salt,
          310000,
          32,
          'sha256',
          function (err, hashedPassword) {
            if (err) {
              return next(err);
            }
            db.query(
              'INSERT INTO account (display_name, email, password, salt) VALUES ($1, $2, $3, $4) RETURNING *',
              [display_name, email, hashedPassword.toString('hex'), salt]
            )
              .then((addAcc) => {
                const { userId, userDisplayName, email } = addAcc.rows[0];
                const user = {
                  id: userId,
                  displayName: userDisplayName,
                  email: email,
                  username: email,
                  password: password,
                };
                req.login(user, function (err) {
                  if (err) {
                    return next(err);
                  }
                  res.redirect('/');
                });
              })
              .catch((err) => {
                return next({
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
      return next({
        log: `Error in query in local signup route: ${err.message}`,
        status: 500,
        message: { err: 'An unknown error occurred - please try again' },
      });
    });
});

module.exports = router;
