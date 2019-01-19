const port = process.env.PORT || 3001;
var express = require("express");
var app = express();
const passport = require("passport");
var mysql = require('mysql');
//var pool = require('./config/pool');
const bodyParser = require("body-parser");
const cors = require("cors");

//mongoose
const { mongoose } = require("./db/mongoose");
const { User } = require("./models/applicant");
const { Job } = require("./models/applicant");

app.use(passport.initialize());
require("./config/passport")(passport);

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

//Allow Access Control
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(function(req, res, next) {
  var token = req.headers["authorization"];
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Authorization, Origin,Accept, X-Requested-With, Content-Type,Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});



const applicant = require("./routes/applicant");
const recruiter = require("./routes/recruiter");
const user = require("./routes/user");
const message = require("./routes/message");
const connections = require("./routes/connections");

//use routes

app.use("/applicant", applicant);
app.use("/recruiter", recruiter);
app.use("/user", user);
app.use("/message", message);
app.use("/connections", connections);

// var con = mysql.createConnection({
//   //connectionLimit: 100,
//   port: '3306',
//   host: 'linkedin.cdlsepyst744.us-east-2.rds.amazonaws.com',
//   user: 'root',
//   password: 'password',
//   database: 'linkedin'
// });

//  con.connect(function(error){
//    if(!!error){
//      console.log("error")
//    }
//    else{
//      console.log("mysql connected")
//    }
//  })




//start your server on port
app.listen(port);
console.log("Server Listening on port " + port);
