const express = require('express');
const passport = require('passport');

// const upload = require('../middleware/upload');
const controller = require('../controllers/admin');
const router = express.Router();

router.post('/login',
  passport.authenticate('local', {
    successFlash: "Logged In!",
    failureFlash: "Invalid username or password."
  }),
  controller.login
);

router.get('/logout', function(req, res){
  console.log('logging out');
  req.logout();
  res.redirect('/');
});

router.get('/dashboard',
  passport.authenticate('local', {
    successFlash: "Logged In!",
    failureFlash: "Invalid username or password."
  }),
  controller.checkAdminSuccess
);

router.post('/register', controller.register);

module.exports = router;


