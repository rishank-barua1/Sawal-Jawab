const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Users = require('../models/Users');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      Users.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'No account with this email exists' });
        }

        bcrypt.compare(password, user.password, (err, match) => {
          if (err) 
            console.log(err);
          if (match) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    return done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    Users.findById(id, function(err, user) {
      return done(err, user);
    });
  });
};