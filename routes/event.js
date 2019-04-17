const express = require('express');
const passport = require('passport');
// const upload = require('../middleware/upload');
const controller = require('../controllers/event');
const router = express.Router();

router.get('/', controller.getAllEvents);
router.get('/:eventId', controller.getEventById);
router.get('/:eventId/check', controller.checkEventById);

router.post('/', controller.createEvent);

router.patch('/:eventId/archive', controller.archiveEventById);
router.patch('/:eventId/edit', controller.editEventById);

module.exports = router;
