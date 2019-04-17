const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    images: {
      type: [String],
      default: []
    },
    title: {
      type: String,
      required: [true]
    },
    date: {
      type: Date,
      required: [true]
    },
    html: {
      type: String,
      required: [true]
    },
    link: {
      type: String,
      required: [true]
    },
    archive: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    collection: 'events'
  }
);

module.exports = mongoose.model('events', eventSchema);
