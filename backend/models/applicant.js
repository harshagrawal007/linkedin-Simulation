var mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  school: {
    type: String
  },
  degree: {
    type: String
  },
  fieldOfStudy: {
    type: String
  },
  grade: {
    type: String
  },
  activity: {
    type: String
  },
  dateTo: {
    type: Date
  },
  dateFrom: {
    type: Date
  },
  description: {
    type: String
  }
});



const experienceSchema = new mongoose.Schema({
  title: {
    type: String
  },
  company: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  dateFrom: {
    type: Date
  },
  dateTo: {
    type: Date
  },
  headline: {
    type: String
  },
  description: {
    type: String
  }
});

const UserSchema = new mongoose.Schema({
  photo:{
    type:String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  password:{
    type:String
  },
  country : {
    type : String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  postalCode: {
    type: String
  },
  mostRecentJobTitle: {
    type: String
  },
  mostRecentCompany: {
    type: String
  },
  type: {
    type: String
  },
  skill: {
    type: Array
  },
  headline: {
    type: String
  },
  profileSummary: {
    type: String
  },
  resume:{
    type:String
  },
  education: [educationSchema],

  experience: [experienceSchema]
});

var User = mongoose.model("user", UserSchema);

module.exports = { User };
