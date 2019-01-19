var mongoose = require("mongoose");

const chart1 = new mongoose.Schema({
  job: {
    type: String
  },
  application: {
    type: String
  }
  
});
var chart = mongoose.model("chart", JobSchema);

module.exports = { chart };