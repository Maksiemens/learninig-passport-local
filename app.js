const dev = process.env.NODE_ENV === 'dev';
const keys = require('./config/keys');
const cors = require('cors');
const morgan = require('morgan');

const express = require('express');
const app = express();
const expressSession = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(expressSession);
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');

const adminRoutes = require('./routes/admin');
const eventRoutes = require('./routes/event');


if (dev) mongoose.set('debug', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose
  .connect(keys.MONGOURI)
  .then(() => console.log('mongoDB connected...'))
  .catch(error => console.log(error));

if (dev) {
  app.use(morgan('dev'));
  app.use('/uploads', express.static('uploads'));
}

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(expressSession({
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  // store: new MongoStore({ url: keys.MONGOURI  }),
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    maxAge: 60 * 60 * 1000
  }
}));
// app.use(cookieSession({
//   secret: 'DO NOT MAKE THIS PUBLIC!',
//   name: 'session',
//   keys: ['key1']
// }));





























app.use(passport.initialize());
require('./middleware/passport')(passport);
app.use(passport.session());
// app.use(cookieSession({
//   name: 'cookieSession',
//   keys: ['key1', 'key2']
// }))

// app.use(function (req, res, next) {
//   var n = req.session.views || 0;
//   console.log(req.session);
//   req.session.views = n++;
//   res.end(n + ' views');
// })

app.use(flash());

app.use(cors());


app.use('/api/admin', adminRoutes);
app.use('/api/events', eventRoutes);



// // create the homepage route at '/'
// app.get('/', (req, res) => {
//   console.log('Inside the homepage callback')
//   console.log(req.sessionID)
//   res.send(`You got home page!\n`)
// })

// // create the login get and post routes
// app.get('/login', (req, res) => {
//   console.log('Inside GET /login callback')
//   console.log(req.sessionID)
//   res.send(`You got the login page!\n`)
// })

// app.post('/login', (req, res, next) => {
//   console.log('Inside POST /login callback')
//   passport.authenticate('local', (err, user, info) => {
//     console.log('Inside passport.authenticate() callback');
//     console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
//     console.log(`req.user: ${JSON.stringify(req.user)}`)
//     req.login(user, (err) => {
//       console.log('Inside req.login() callback')
//       console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
//       console.log(`req.user: ${JSON.stringify(req.user)}`)
//       return res.send('You were authenticated & logged in!\n');
//     })
//   })(req, res, next);
// })

// app.get('/authrequired', (req, res) => {
//   console.log('Inside GET /authrequired callback')
//   console.log(`User authenticated? ${req.isAuthenticated()}`)
//   if(req.isAuthenticated()) {
//     res.send('you hit the authentication endpoint\n')
//   } else {
//     res.redirect('/')
//   }
// })






app.use((err, req, res, next) => {
  if (dev) {
    console.log('ERROR:', err);
  }

  res.status(500).json({
    error: err
  });
});

module.exports = app;