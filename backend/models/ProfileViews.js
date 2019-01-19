var mongoose = require("mongoose");

const ProfileViewSchema = new mongoose.Schema({
  applicantId: {
    type: String
  },
  inserted: {
    type: Boolean
  },
  myDay: {
    type: String
  },
  array: {
    type: [Number],
    default: [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ]
  },
  viewsToday: {
    type: Number
  }
});

var ProfileView = mongoose.model("ProfileView", ProfileViewSchema);

module.exports = { ProfileView };
