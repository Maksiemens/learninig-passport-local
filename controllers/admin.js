const User = require('../models/User');
const passport = require('passport');

module.exports.login = async (req, res, next) => {
  try {
    const candidate = await User.findById(req.user._id);
    if (candidate) {
      // req.session.user = candidate._id;
      res.status(200).json(candidate._id);
    }
    else {
      res.status(404).json({
        message: 'Пользователь с таким email не найден'
      });
    }
  }
   catch (error) {
    next(error);
  }
};


// app.get("/logout", (req, res, next) => {
//   // send the authenticated user
//   req.logout();
//   res.redirect("/");
// });







// module.exports.login = async (req, res, next) => {
//   // console.log('req.body', req.user._id);
//   console.log(req.session);

//   try {
//     // const user = await User.findOne({ email: req.body.email });
//     const user = await User.findOne({_id: req.user._id});

//     // res.cookie('cookieName', req.user._id, { maxAge: 1000 * 60 * 15 } );
//     // req.session.user = email;

//     // Cookies that have not been signed
//     console.log('Cookies: ', req.cookies);

//     // Cookies that have been signed
//     console.log('Signed Cookies: ', req.signedCookies);

//     console.log(req.session);
//     console.log(req.user);

//     res.status(200).json({
//       success: true
//     });
//   } catch (error) {
//     next(error);
//   }
// };


module.exports.checkAdminSuccess = async (req, res, next) => {
  console.log(req.passport);
  console.log(req.session);

  try {
    const candidate = await User.findById(req.session.user);
    res.status(200).json(candidate);
  }
  catch (error) {
    next(error);
  }
};



// Через постман регался
module.exports.register = async (req, res, next) => {
  try {
    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
    });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};


// module.exports.login = async (req, res, next) => {

//   // passport.authenticate('local', (err, user) => {
//   //   if (err) {
//   //     return next(err);
//   //   }
//   //   if (!user) {
//   //     return res.redirect('/login');
//   //   }
//   //   req.logIn(user, function(err) {
//   //     if (err) {
//   //       return next(err);
//   //     }
//   //     return res.status(200).json(user);
//   //   });
//   // }),

//   console.log(req.session);
//   console.log(req.user);
//   try {
//     const user = await User.findById(req.user._id).select('email id').exec();

//     res.status(200).json(true);
//   } catch (error) {
//     next(error);
//   }
// };






// app.post('/login',
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
//   })
// );


// https://mongoosejs.com/docs/populate.html
// Populating Queries with Mongoose | Creating a REST API with Node.js
// https://www.youtube.com/watch?v=3p0wmR973Fw
// module.exports.login = async (req, res, next) => {
//   const candidate = await
//   try {
//     const user = await User.findOne({
//       _id: req.user._id
//     })
//       .select('email')
//       .exec();
//     if (!user) {
//       throw new Error('User Not Found');
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     next(error);
//   }
// };
