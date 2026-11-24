const mongoose = require('mongoose');

    // TODO: Add title field with String type, required validation, trim, and minlength
    // TODO: Add content field with String type, required validation, trim, and minlength
    // TODO: Add author field with String type, required validation, and trim
    // TODO: Enable timestamps to track creation and update times
const postSchema = new mongoose.Schema(
    {
    title: {
      type: String,
      required: true,
      trim: true,
      minlenght: 3
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minlenght: 10
    },
    author: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Post', postSchema);