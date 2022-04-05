const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');
const router = express.Router();

router.get('/login/federated/google', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

router.post('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
