const mongoose = require('mongoose');
const User = mongoose.model('users');
const LocalStrategy = require('passport-local').Strategy;


module.exports = (passport) => {

  passport.use(
    new LocalStrategy(
      {
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
      },
      (req, email, password, done) => {
        process.nextTick(() => {

          User.findOne({email : email}, (err, user) => {

            if (err) {
              return done(err);
            }

            if (!user) {
              return done(null, false, { message: 'Incorrect email.' });
            }

            if (user.password !== password) {
              return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);
          });
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    console.log('serializeUser', user);
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    console.log('deserializeUser', id);
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });


  // function authenticationMiddleware () {
  //   return function (req, res, next) {
  //     if (req.isAuthenticated()) {
  //       return next()
  //     }
  //     res.send("Welcome");
  //   }
  // }
}







/*

module.exports = (passport) => {

  passport.use(
    new LocalStrategy(
      {
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
      },
      (req, username, password, done) => {
        User.findOne({username : username}, (err, user) => {

          if (err) {
            return done(err);
          }

          if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
          }

          if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
          }

          return done(null, user);
        });

    }
  ));

  passport.serializeUser((user, done) => {
    console.log('serializeUser', user);
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    console.log('deserializeUser', id);
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}*/