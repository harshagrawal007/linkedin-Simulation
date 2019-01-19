var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect(
   "mongodb://linkedin_db1:linkedin_db1@ds141613.mlab.com:41613/linkedin_db",{ 
    //"mongodb://abcd:abcd@ec2-18-224-8-66.us-east-2.compute.amazonaws.com:27017/linkedin_db",{
    poolSize: 10
    // other options can go here
  },
  () => {
    console.log("connected to mongoDB");
  }
);

module.exports = { mongoose };
