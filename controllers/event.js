const moment = require('moment');
require('moment/locale/ru');
moment.locale('ru');

const Event = require('../models/Event');

module.exports.getAllEvents = async (req, res, next) => {
  try {
    let events = await Event.find({
      date: { $gte: moment().startOf('day').toDate() },
      archive: false
    }).select('title date').lean();

    events = events.map(event => {
      event.date = moment(event.date).format('D MMMM');
      return event;
    });

    res.status(200).json(events);

  } catch (error) {
    next(error);
  }
};

module.exports.getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.eventId)
      .select('title date html link images')
      .exec();
    res.status(200).json(event);
  } catch (error) {
    res.status(200).json({message: 'Такого ивента не существует'});
    next(error);
  }
};

module.exports.checkEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.eventId).exec();
    res.status(200).json(true);
  } catch (error) {
    res.status(200).json(false);
    next(error);
  }
};

module.exports.createEvent = async (req, res, next) => {
  try {
    const event = await Event.create({
      date: req.body.date,
      title: req.body.title,
      images: req.body.images,
      html: req.body.html,
      link: req.body.link
    });

    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

module.exports.archiveEventById = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.eventId,
    {archive: true}, {new: true}).exec();

    res.status(200).json({message: 'Ивент успешно был архивирован'});
  } catch (error) {
    next(error);
  }
};

module.exports.editEventById = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.eventId,
      {$set: req.body},
      {new: true}
    ).exec();

    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

// https://mongoosejs.com/docs/populate.html
// Populating Queries with Mongoose | Creating a REST API with Node.js
// https://www.youtube.com/watch?v=3p0wmR973Fw

// module.exports.getMyData = async (req, res) => {
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
