const express = require("express");
const router = express.Router();
const passport = require("passport");
var bodyParser = require("body-parser");
var app = express();
const { Job } = require("../models/job");
const { User } = require("../models/applicant");
const { FirstTen, CityChart } = require("../models/recuiterDashboard");
const { Application } = require("../models/application");

var key = null;
var key2 = null;

// redis

// let redis = require("redis"),
//   client = redis.createClient({
//     port: 10720, // replace with your port
//     host: "redis-10720.c8.us-east-1-3.ec2.cloud.redislabs.com", // replace with your hostanme or IP address
//     password: "bFCZ23Yhem2TjtTRyP2YLWIUtyEXVg6E" // replace with your password
//   });

// @route   POST /recruiter/postJob
// @desc    Login User / Returning JWT Token
// @access  Public
router.post(
  "/postJob",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    console.log("in POST job route");
    try {
      console.log(req.user.id);
      console.log(req.body.company);
      key = req.user.id + "," +  req.body.jobTitle.toLowerCase() + "," + req.body.jobCity.toLowerCase();
      key2 =  req.body.jobTitle.toLowerCase() + "," + req.body.jobCity.toLowerCase();
      const jobFields = {};
      jobFields.email = req.user.email;
      jobFields.user = req.user.id;
      if (req.body.company) jobFields.company = req.body.company;
      if (req.body.companyIndustry)
        jobFields.companyIndustry = req.body.companyIndustry;
      if (req.body.educationLevel)
        jobFields.educationLevel = req.body.educationLevel;
      if (req.body.emailNotify) jobFields.emailNotify = req.body.emailNotify;
      if (req.body.employmentType)
        jobFields.employmentType = req.body.employmentType;
      if (req.body.externalSite) jobFields.externalSite = req.body.externalSite;
      if (req.body.hearAboutUs) jobFields.hearAboutUs = req.body.hearAboutUs;
      if (req.body.jobCity) jobFields.jobCity = req.body.jobCity;
      if (req.body.jobState) jobFields.jobState = req.body.jobState;
      if (req.body.jobDescription)
        jobFields.jobDescription = req.body.jobDescription;
      if (req.body.jobFunction) jobFields.jobFunction = req.body.jobFunction;
      if (req.body.jobTitle) jobFields.jobTitle = req.body.jobTitle;
      if (req.body.relevantExperience)
        jobFields.relevantExperience = req.body.relevantExperience;
      if (req.body.selectedOption)
        jobFields.selectedOption = req.body.selectedOption;
      if (req.body.seniorityLevel)
        jobFields.seniorityLevel = req.body.seniorityLevel;
      if (req.body.skills) jobFields.skills = req.body.skills;
      jobFields.datePosted = new Date();
      if (req.body.logo) jobFields.logo = req.body.logo;
      if (req.body.easyApply) jobFields.easyApply = req.body.easyApply;

      // TODO: Skills - Split into array
      console.log(jobFields);
      const newJob = new Job(jobFields);
      // User.findOne({ id: req.user.id }).then(user => {
      //     if (user) {
      //         // Update
      //         User.findOneAndUpdate(
      //             { id: req.user.id },
      //             { $set: jobFields },
      //             { new: true }
      //         ).then(job => res.status(200).end());
      //     } else {
      //         res.status(201).json("User does not exist");
      //     }
      // });
      newJob.save().then(job => {
        
       // client.del(key);
        //client.del(key2);
        res.status(200).end()
      }
       );
    } catch (err) {
      next(err);
      res.code = "400";
      res.value = "There has been some error, Please try again";
      console.log(res.value);
      res.sendStatus(400).end();
    }
  }
);

router.get("/firstTen", async (req, res, next) => {
  console.log("in recruiter chart1");

  //console.log(id);
  const jobs = await FirstTen.find({}, "appArray jobTitle")
    .sort("dateApplied")
    .limit(10);
  console.log(jobs);
  res.end(JSON.stringify(jobs));
});

//Search for job postings
router.get("/searchJobPosting", async (req, res, next) => {
  console.log("in search job");
  try {
    const recruiterID = req.query.id;
    const job = req.query.job;
    const location = req.query.location;
    key = recruiterID + "," + job.toLowerCase() + "," + location.toLowerCase();
    key2 = job.toLowerCase() + "," + location.toLowerCase();
    console.log(req.query);
    console.log(job);
    console.log(location);
    // client.get(key, async (err, value) => {
    //   if (err) {
    //     throw err;
    //   } else {
    //     //console.log(value);
    //     if (value === null) {
          const jobs = await Job.find({
            $and: [
              { user: recruiterID },
              {
                $or: [
                  { jobTitle: new RegExp(job, "i") },
                  { skills: new RegExp(job, "i") }
                ]
              },
              {
                $or: [
                  {
                    jobCity: {
                      $regex: new RegExp("^" + location.toLowerCase(), "i")
                    }
                  },
                  {
                    jobState: {
                      $regex: new RegExp("^" + location.toLowerCase(), "i")
                    }
                  }
                ]
              }
            ]
          });

          // client.set(key, JSON.stringify(jobs), "EX", 60, function(err) {
          //   if (err) {
          //     throw err;
          //   } else {
          //     console.log("value added in Redis!");
          //   }
          // });

          console.log("job:" + jobs);
          res.end(JSON.stringify(jobs));
    //     } else {
    //       console.log("in else");
    //       res.end(value);
    //     }
    //   }
    // });
  } catch (err) {
    next(err);
    console.log(err);
    console.log("Error Creating new Job");
    res.sendStatus(400).end();
  }
});

//Update Posted Jobs
router.put("/searchJobPosting", function(req, res) {
  console.log("in recruited update jobs");

  Job.findOneAndUpdate(
    { _id: req.body.jobId },
    {
      $set: {
        jobId: req.body.jobId,
        company: req.body.company,
        jobTitle: req.body.jobTitle,
        jobFunction: req.body.jobFunction,
        employmentType: req.body.employmentType,
        companyIndustry: req.body.companyIndustry,
        seniorityLevel: req.body.seniorityLevel,
        jobDescription: req.body.jobDescription,
        skills: req.body.skills,
        relevantExperience: req.body.relevantExperience,
        educationLevel: req.body.educationLevel
      }
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
        res.sendStatus(400).end(); //success
      } else {
       // client.del(key);
       // client.del(key2);

        console.log("update doc in db: " + doc);
        res.sendStatus(200).end(); //success
      }
    }
  );
});

//View Posted Applications
router.get("/applicationList/:jobid", async (req, res) => {
  //console.log(req.params.jobid.substring(1));

  const jobid = req.params.jobid.substring(1);

  const applications = await Application.find({
    jobId: jobid
  });
  console.log(applications);
  res.end(JSON.stringify(applications));
  //success
});
router.get("/firstTen", async (req, res, next) => {
  console.log("in recruiter chart1");

  //console.log(id);
  const jobs = await FirstTen.find({}, "appArray jobTitle")
    .sort("dateApplied")
    .limit(10);
  console.log("jobs" + jobs);
  res.end(JSON.stringify(jobs));
});


router.get("/getAllJobs", async (req, res, next) => {
  try {
    const jobs = await CityChart.find({},{'_id': 0,'jobTitle':1}).sort('jobTitle');
    console.log(JSON.stringify(jobs));
    res.end(JSON.stringify(jobs));

  }
  catch (err) {
    console.log(err)
    next(err);
    var value = "Sorry, there was some error in unsaving job. Please Try Again"
    res.sendStatus(400).end();
  }

});
module.exports = router;
