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
      // console.log('in strategy');
      const issuer = 'https://accounts.google.com';
      db.query('SELECT * FROM federated_credentials WHERE provider = $1 AND subject = $2', [issuer, profile.id])
        .then((fedSearch) => {
          // console.log('fedSearch', fedSearch);
          if (!fedSearch.rows.length) {
            db.query('INSERT INTO account (display_name, email) VALUES ($1, $2) RETURNING *', [profile.displayName, profile.emails[0].value])
              .then((addAccount) => {
                // console.log('addAccount', addAccount);
                const id = addAccount.rows[0]._id;
                db.query('INSERT INTO federated_credentials (user_id, provider, subject) VALUES ($1, $2, $3) RETURNING *', [id, issuer, profile.id])
                  .then((addFed) => {
                    // console.log('addFed', addFed);
                    const { userId, userDisplayName } = addFed.rows[0];
                    const user = {
                      id: userId,
                      displayName: userDisplayName,
                      email: profile.emails[0].value
                    };
                    // res.locals.user = user;
                    console.log('success!', user);
                    return cb(null, user);
                  })
                  .catch((err) => {
                    // console.log('federated credentials insert', err.message);
                    return cb(err);
                    // return next({
                    //   log: `Error in passport strategy federated credentials insert: ${err.message}`,
                    //   status: 500,
                    //   message: { err: 'An unknown error occurred - please try again' },
                    // });
                  })
              })
              .catch((err) => {
                // console.log('account insert', err.message);
                return cb(err);
                // return next({
                //   log: `Error in passport strategy account insert: ${err.message}`,
                //   status: 500,
                //   message: { err: 'An unknown error occurred - please try again' },
                // });
              })
          }
          else {
            db.query('SELECT * FROM account WHERE _id = $1', [fedSearch.rows[0].user_id])
              .then((accSearch) => {
                //console.log('accSearch', accSearch);
                if (!accSearch.rows.length) {
                  //console.log('account query unsuccesful');
                  return cb(null, false);
                } 
                else {
                  const { _id, display_name, email } = accSearch.rows[0];
                  const user = {
                    id: _id,
                    displayName: display_name,
                    email: email
                  };
                  // res.locals.user = user;
                  //console.log('success!', user);
                  return cb(null, user);
                } 
              })
              .catch((err) => {
                // console.log('account query', err.message);
                return cb(err);
                // return next({
                //   log: `Error in passport strategy account query: ${err.message}`,
                //   status: 500,
                //   message: { err: 'An unknown error occurred - please try again' },
                // });
              })
          }
        })
        .catch((err) => {
          // console.log('federated credentials query', err.message);
          return cb(err);
          // return next({
          //   log: `Error in passport strategy federated credentials query: ${err.message}`,
          //   status: 500,
          //   message: { err: 'An unknown error occurred - please try again' },
          // });
        })
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
    failureRedirect: '/login'
  })
);

router.post('/logout', function (req, res, next) {s
  req.logout();
  res.redirect('/');
});

module.exports = router;
