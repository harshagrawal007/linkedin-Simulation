const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const app = express();
const jwt = require('jsonwebtoken');
const passport = require("passport");
const { Job } = require("../models/job");
const { SavedJob } = require("../models/savedJobs");
const { ProfileView } = require("../models/ProfileViews")
const { FirstTen, CityChart, LessChart } = require('../models/recuiterDashboard');
const { ConnectionRequest } = require("../models/connectionRequests");
const { Connection } = require("../models/connections")
const { AdminJobClicksLog } = require("../models/adminJobClicks")
const { AdminJobSavesLog } = require("../models/adminJobSaves")
const { AdminJobTrace } = require("../models/adminJobTrace")
const { Application } = require("../models/application")
const { User } = require('../models/applicant');
var kafka = require("../kafka/client");

////redis

// let redis = require("redis"),
//   client = redis.createClient({
//     port: 10720, // replace with your port
//     host: "redis-10720.c8.us-east-1-3.ec2.cloud.redislabs.com", // replace with your hostanme or IP address
//     password: "bFCZ23Yhem2TjtTRyP2YLWIUtyEXVg6E" // replace with your password
//   });


//////

const AWS = require('aws-sdk');

const multer = require('multer');

var storage = multer.memoryStorage()
var upload = multer({ storage: storage });

//configuring the AWS environment
AWS.config.update({
  accessKeyId: "AKIAJLECI642PZ47CABA",
  secretAccessKey: "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"
});

var s3 = new AWS.S3();


router.post("/profileimage", passport.authenticate('jwt', { session: false }), upload.single("file"), function (req, res) {
  console.log("Request ---", req.body);
  console.log("Request ---", req.files);
  console.log("Request ---", req.file);
  console.log("Request file ---", req.file);//Here you get file.

  //configuring parameters
  var params = {
    Bucket: 'user-images-linkedin2',
    Key: req.file.originalname,
    Body: req.file.buffer,
  };

  s3.upload(params, async (err, data) => {

    if (data) {
      console.log("Uploaded in:", data.Location);
      try {
        console.log("inside try profile update")
        console.log(typeof (req.user.id));
        // const photo = {data.Location};
        console.log(typeof (data.Location));
        const photo = {
          "photo": data.Location
        }
        console.log(photo.photo);
        console.log("TEST")
        console.log(photo.photo)
        var pic = photo.photo
        const result = await User.updateOne(
          { _id: req.user.id },
          {
            $set: photo
          }
        )
        const result1 = await ConnectionRequest.updateMany(
          { senderID: req.user.id },
          { $set: { "senderPhoto": pic } }
        )
        const result2 = await ConnectionRequest.updateMany(
          { recieverID: req.user.id },
          { $set: { "recieverPhoto": pic } }
        )
        const result3 = await Connection.updateMany(
          { connectionID: req.user.id },
          { $set: { "connectionPhoto": pic } }
        )

        console.log(result);
        console.log(result1)

        // User.findOne({
        //   email: req.user.email,

        // }, function (err, user) {
        //   console.log("inside prifle get");

        //   if (user) {
        //     console.log(user);
        //   }});
        res.sendStatus(200).end();

      }
      catch (err) {
        console.log(err);
        next(err);

      }
    }
    if (err) {
      console.log("Error", err);
    }
  });


});

router.post("/logoimage", passport.authenticate('jwt', { session: false }), upload.single("file"), function (req, res) {
  console.log("Request ---", req.body);
  console.log("Request ---", req.files);
  console.log("Request ---", req.file);
  console.log("Request file ---", req.file);//Here you get file.

  //configuring parameters
  var params = {
    Bucket: 'user-images-linkedin2',
    Key: req.file.originalname,
    Body: req.file.buffer,
  };

  s3.upload(params, async (err, data) => {

    if (data) {
      console.log("Uploaded in:", data.Location);
      try {
        console.log("inside try profile update")
        console.log(typeof (req.user.id));
        // const photo = {data.Location};
        console.log(typeof (data.Location));
        const photo = {
          "photo": data.Location
        }
        console.log(photo.photo);
        console.log("TEST")
        console.log(photo.photo)
        var pic = photo.photo



        res.end(JSON.stringify(pic))

      }
      catch (err) {
        console.log(err);
        next(err);

      }
    }
    if (err) {
      console.log("Error", err);
    }
  });


});

router.post("/resume", passport.authenticate('jwt', { session: false }), upload.single("file"), function (req, res, cb) {
  console.log("Request ---", req.body);
  console.log("Request ---", req.files);
  console.log("Request ---", req.file);
  console.log("Request file ---", req.file);//Here you get file.

  //configuring parameters
  //const newFilename = new Date().toISOString() + '-'+ req.file.originalname;
  //const timestamp = Date.now().toString();
  //var path = require('path');
  //const name = path.basename(file)+ timestamp;
  var params = {
    Bucket: 'user-images-linkedin2',
    Key: req.file.originalname,
    Body: req.file.buffer,
  };

  s3.upload(params, async (err, data) => {

    if (data) {
      console.log("Uploaded in:", data.Location);
      try {
        console.log("inside try profile update")
        console.log(typeof (req.user.id));
        // const photo = {data.Location};
        console.log(typeof (data.Location));
        const resume = {
          "resume": data.Location
        }
        console.log(resume.resume);
        const result = await User.updateOne(
          { _id: req.user.id },
          {
            $set: resume
          }
        )
        console.log(result);

        res.sendStatus(200).end();
        //console.log(result)
      }
      catch (err) {
        console.log(err);
        next(err);
        //res.sendStatus(400).end(); 
      }
    }
    if (err) {
      console.log("Error", err);
    }
  });


});


router.post("/resumeApplication", passport.authenticate('jwt', { session: false }), upload.single("file"), function (req, res, cb) {
  console.log("Request ---", req.body);
  console.log("Request ---", req.files);
  console.log("Request ---", req.file);
  console.log("Request file ---", req.file);//Here you get file.

  //configuring parameters
  //const newFilename = new Date().toISOString() + '-'+ req.file.originalname;
  //const timestamp = Date.now().toString();
  //var path = require('path');
  //const name = path.basename(file)+ timestamp;
  var params = {
    Bucket: 'user-images-linkedin2',
    Key: req.file.originalname,
    Body: req.file.buffer,
  };

  s3.upload(params, async (err, data) => {

    if (data) {
      console.log("Uploaded in:", data.Location);
      try {
        console.log("inside try profile update")
        console.log(typeof (req.user.id));
        // const photo = {data.Location};
        console.log(typeof (data.Location));
        const resume = {
          "resume": data.Location
        }
        console.log(resume.resume);
        res.end(JSON.stringify(resume.resume))
        // const result = await User.updateOne(
        //   { _id: req.user.id },
        //   {
        //     $set: resume
        //   }
        // )
        // console.log(result);

        // res.sendStatus(200).end();

      }
      catch (err) {
        console.log(err);
        next(err);

      }
    }
    if (err) {
      console.log("Error", err);
    }
  });


});


// SignUp Applicant
router.post("/signup", function (req, res) {
  res.sendStatus(200).end(); //user already exists

  res.sendStatus(201).end(); //success
});

//Applicant profile
//router.get("/profile",passport.authenticate("jwt", { session: false }),function(req, res) {
router.get("/profile", passport.authenticate('jwt', { session: false }), (req, res) => {
  //email:req.user.id
  User.findOne({
    email: req.user.email,
    type: req.user.type
  }, function (err, user) {
    console.log("inside prifle get");

    if (user) {
      console.log(user);
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })
      res.end(JSON.stringify(user)); //success

    } else {
      res.status(400).json("User does not exist");
    }
  }
  );
});


router.put("/profile", passport.authenticate('jwt', { session: false }), async (req, res) => {
  console.log("inside user profile update ")
  console.log(req.body.profile)
  try {
    const result = await User.updateOne(
      { _id: req.user.id },
      { $set: req.body.profile }
    )
    //   res.writeHead(200, {
    //     'Content-Type': 'text/plain'
    // })
    // res.end("success"); 
    res.sendStatus(200).end();
    console.log(result)
  }
  catch (err) {
    next(err);
    res.sendStatus(400).end();
  }
});


//Job Search Board for Applicant
// //Job Search Board for Applicant

router.get("/searchjob", async (req, res, next) => {
  console.log("in search job")
  console.log(req.query);
  
  kafka.make_request('searchjob', req.query, function (err, results) {
    if (err) {
      res.code = "400";
      res.value = "Coudnt search job ";
    } else {
      res.code = "200";
      res.value = results;
      res.writeHead(200, {
        "Content-Type": "text/plain"
      });
      res.end(JSON.stringify(results));
    }

  });

  // try {
  //   const job = req.query.job.toLowerCase()
  //   const location = req.query.location.toLowerCase()
  //   const key = job + "," + location
  //   console.log(req.query)
  //   console.log(job)
  //   console.log(location)

///redis part
    // client.get(key, async(err, value) => {
    //  if (err) {
    //    throw err;
    //  } else {
    //    console.log(value);
    //    if(value === null){
/// redis part
    // const id = req.query.id
    // const jobid = await Application.find({ applicantId: id }, { jobId: 1 })
    // var jobsArray = []
    // for (let i = 0; i < jobid.length; i++) {
    //   // console.log(connectionsRequests[i].senderID)
    //   jobsArray.push(jobid[i].jobId)
    // }
    // console.log("jobsarray" + jobsArray)

    // const jobs = await Job.find({
    //   $and: [
    //     {
    //       $or: [
    //         { jobTitle: new RegExp(job, 'i') },
    //         { skills: new RegExp(job, 'i') },
    //         { company: new RegExp(job, 'i') }
    //       ]
    //     },
    //     {
    //       $or: [
    //         { jobCity: { $regex: new RegExp("^" + location.toLowerCase(), "i") } },
    //         { jobState: { $regex: new RegExp("^" + location.toLowerCase(), "i") } }
    //       ]
    //     },
    //     { _id: { $nin: jobsArray } }
    //   ]
    // })
///redis part   
    // client.set(key, JSON.stringify(jobs), "EX", 60,function(err) {
    //  if (err) {
    //    throw err;
    //   } else {
    //    console.log("value added in Redis!");
    //  }
    // });
///redis part
   
    //console.log(jobs)
    //res.end(JSON.stringify(jobs))

///redis part    
    //  }
    //  else{
    //    console.log("in else")
    //    res.end(value)
    //   }
    // }
   // });
///redis part
  //}
  //catch (err) {
    //next(err);
    //console.log("Error Creating new Job");
   // res.sendStatus(400).end();
  //}

});

//Job Detail Page for Applicant
router.get("/requestedjob", function (req, res) {
  res.sendStatus(200).end(); //success
});

//Applicant Job Save
router.post("/savejob", async (req, res, next) => {
  console.log("in save job")
  var d = new Date();
  const newSavedJob = new SavedJob({
    applicantId: req.body.applicantId,
    jobId: req.body.jobId,
    company: req.body.company,
    jobTitle: req.body.jobTitle,
    jobCity: req.body.jobCity,
    jobState: req.body.jobState,
    jobFunction: req.body.jobFunction,
    employmentType: req.body.employmentType,
    companyIndustry: req.body.companyIndustry,
    seniorityLevel: req.body.seniorityLevel,
    jobDescription: req.body.jobDescription,
    skills: req.body.skills,
    relevantExperience: req.body.relevantExperience,
    educationLevel: req.body.educationLevel,
    dateSaved: d

  })
  //console.log(newSavedJob)
  try {
    const job = await SavedJob.findOne({
      applicantId: req.body.applicantId,
      jobId: req.body.jobId
    })
    if (job) {
      var value = "This job has aready been saved";
      console.log(value)
      res.code = "201";
      res.sendStatus(201).end();
    }
    else {
      try {
        var value = "Job Saved"
        const job = await newSavedJob.save();
        console.log("New Job saved : ", job);
        res.sendStatus(200).end();
      }
      catch (err) {
        next(err);
        var value = "Sorry, there was some error in saving job. Please Try Again"
        console.log("Error Creating new User");
        res.sendStatus(400).end();
      }
    }

  }
  catch (err) {
    next(err);
    var value = "Sorry, there was some error in saving job. Please Try Again"
    console.log("Error Creating new User");
    res.sendStatus(400).end();
  }
});

router.get("/savejob/:id", async (req, res, next) => {
  console.log("in save job get")
  const id = req.params.id
  console.log(id)
  // client.get(key, async(err, value) => {
  //   if (err) {
  //     throw err;
  //   } else {
  //     console.log(value);
  //     if(value === null){
  const jobs = await SavedJob.find({ applicantId: id })
  // client.set(key, JSON.stringify(jobs), function(err) {
  //   if (err) {
  //     throw err;
  //   } else {
  //     console.log("value added in Redis!");
  //   }
  // });
  console.log(jobs)
  res.end(JSON.stringify(jobs))
  // }
  // else{
  //   console.log("in else")
  //   res.end(value)
  // }
  //}

  //  })

})

router.delete("/savejob", async (req, res, next) => {
  console.log("in delete")
  const jobId = req.query.jobId
  const applicantId = req.query.applicantId
  try {
    const del = await SavedJob.findOneAndDelete(
      { jobId: jobId },
      { applicantId: applicantId },

    )
    res.sendStatus(200).end();

  }
  catch (err) {
    console.log(err)
    next(err);
    var value = "Sorry, there was some error in unsaving job. Please Try Again"
    res.sendStatus(400).end();
  }

})

//Applicant Job Save
//Application Save
router.post("/saveEasyApply", async (req, res, next) => {
  console.log("in saveEasyApply route")
  var todayDate = new Date();
  const newEasyApplyApplication = new Application({
    applicantId: req.body.applicantId,
    jobId: req.body.jobId,
    company: req.body.company,
    jobTitle: req.body.jobTitle,
    seniorityLevel: req.body.seniorityLevel,
    dateApplied: todayDate,
    applicantFirstName: req.body.applicantFirstName,
    applicantLastName: req.body.applicantLastName,
    applicantMostRecentJobTitle: req.body.applicantMostRecentJobTitle,
    applicationType: req.body.applicationType,
    resume: req.body.resume,
    jobCity: req.body.jobCity

  });
  var month = todayDate.getUTCMonth();
  console.log(month);
  var arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  arr[month] += 1;
  const newChartData = new FirstTen({
    jobId: req.body.jobId,
    jobTitle: req.body.jobTitle,
    dateApplied: todayDate,
    jobCity: req.body.jobCity,
    month: month,
    appArray: arr
  });
  //newChartData.save();
  FirstTen.findOne({ jobId: req.body.jobId }, function (err, chartRow) {
    console.log(err);
    if (chartRow) {
      let arr = chartRow.appArray;
      arr[month] = arr[month] + 1;
      const updatedArray = {
        appArray: arr
      };
      console.log(updatedArray);
      FirstTen.updateOne(
        { jobId: req.body.jobId },
        {
          $set: updatedArray
        },
        { upsert: true, new: true }
        , function (err, res) {
          console.log(err);
        })
    }
    else {
      newChartData.save();
    }
  });

  //newChartData.save();
  var cityArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  cityArr[month] += 1;
  const newCityData = new CityChart({
    dateApplied: todayDate,
    jobId : req.body.jobId,
    applicantCity: req.body.applicantCity,
    jobTitle : req.body.jobTitle,
    month: month,
    appArray: cityArr
  });

  CityChart.findOne({ applicantCity: req.body.applicantCity ,jobId: req.body.jobId}, function (err, chartRow) {
    console.log(err);
    if (chartRow) {
      let arr = chartRow.appArray;
      arr[month] = arr[month] + 1;
      const updatedArray = {
        appArray: arr
      };
      console.log(updatedArray);
      CityChart.updateOne(
        { applicantCity: req.body.applicantCity, jobId: req.body.jobId },
        {
          $set: updatedArray
        },
        { upsert: true, new: true }
        , function (err, res) {
          console.log(err);
        })
    }
    else {
      newCityData.save();
    }
  });

  try {
    var value = "Application Saved"
    const job = await newEasyApplyApplication.save();
    console.log("New Job saved : ", job);
    res.sendStatus(200).end();
  }
  catch (err) {
    next(err);
    var value = "Sorry, there was some error in saving job application. Please Try Again"
    console.log("Error Creating new application");
    res.sendStatus(400).end();
  }

});


router.post("/application", async (req, res, next) => {
  console.log("in application route")
  var todayDate = new Date();
  const ApplyApplication = new Application({
    applicantId: req.body.applicantId,
    jobId: req.body.jobId,
    gender: req.body.gender,
    address: req.body.address,
    howDidYouHearAboutUs: req.body.howDidYouHearAboutUs,
    dateApplied: todayDate,
    resume: req.body.resume,
    applicantFirstName: req.body.applicantFirstName,
    applicantLastName: req.body.applicantLastName,
    disablityStatus: req.body.disablityStatus,
    applicationType: req.body.applicationType,
    sponsorship: req.body.sponsorship,
    diversity: req.body.diversity,


  })
  console.log(ApplyApplication)

  try {
    var value = "Application Saved"
    const job = await ApplyApplication.save();
    console.log("New Job saved : ", job);
    res.sendStatus(200).end();
  }
  catch (err) {
    next(err);
    var value = "Sorry, there was some error in saving job application. Please Try Again"
    console.log("Error Creating new application");
    res.sendStatus(400).end();
  }

});



//Get my Network for Applicant
// router.get("/people", function (req, res) {
//   //Need to change according to connections for the applicant
//   User.find({}, { firstName: 1, lastName: 1, email: 1, country: 1, _id: 1 },
//     function (err, results) {
//       if (err) {
//         res.code = "400";
//         res.value = "There has been some error, Please try again";
//         console.log(res.value);
//         res.sendStatus(400).end();
//       }
//       else {
//         console.log("people" + results)
//         res.writeHead(200, {
//           'Content-Type': 'text/plain'
//         })
//         res.value = results;
//         res.end(JSON.stringify(results))
//       }
//     }
//   )
// });

//Get my Saved Job Details
router.get("/numberofsavedjobs", function (req, res) {
  //Need to change according to connections for the applicant
  AdminJobSavesLog.find({}, { companyTitle: 1, saves: 1 },
    function (err, results) {
      if (err) {
        res.code = "400";
        res.value = "There has been some error, Please try again";
        console.log(res.value);
        res.sendStatus(400).end();
      }
      else {
        console.log("people" + results)
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        })
        res.value = results;
        res.end(JSON.stringify(results))
      }
    }
  )
});

//Get my Clicks Per Jobs
router.get("/clicksperjob", function (req, res) {
  //Need to change according to connections for the applicant
  AdminJobClicksLog.find({}, { company: 1, clicks: 1 },
    function (err, results) {
      if (err) {
        res.code = "400";
        res.value = "There has been some error, Please try again";
        console.log(res.value);
        res.sendStatus(400).end();
      }
      else {
        console.log("people" + results)
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        })
        res.value = results;
        res.end(JSON.stringify(results))
      }
    }
  )
});


//Get my User Trace
router.get("/usertrace", function (req, res) {
  //Need to change according to connections for the applicant
  AdminJobTrace.find({}, { companyTitle: 1, view: 1, half: 1, full: 1 },
    function (err, results) {
      if (err) {
        res.code = "400";
        res.value = "There has been some error, Please try again";
        console.log(res.value);
        res.sendStatus(400).end();
      }
      else {
        console.log("people" + results)
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        })
        res.value = results;
        res.end(JSON.stringify(results))
      }
    }
  )
});

//Get my Profile Views
router.get("/profileview/:id", function (req, res) {
  //Need to change according to connections for the applicant
  ProfileView.find({ applicantId: req.params.id }, { array: 1, viewsToday: 1 },
    function (err, results) {
      if (err) {
        res.code = "400";
        res.value = "There has been some error, Please try again";
        console.log(res.value);
        res.sendStatus(400).end();
      }
      else if(results!=null && results!= '' && results[0]!=undefined){
        console.log("results" + results)
        var arr = results[0].array;
        console.log('arr' + arr)


        console.log("result[0].viewsToday" + results[0].viewsToday)
        arr.push(results[0].viewsToday);
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        })
        res.value = arr;
        res.end(JSON.stringify(arr))
      }
      else{
        console.log("No Data");
      }
    }
  )
});
router.post("/logDataAdminJobClicks", async (req, res) => {
  console.log("in job clicks")
  console.log(req.body)
  const company = req.body.company

  const ifCompanyExists = await AdminJobClicksLog.findOne({ company: new RegExp(company, 'i') })
  console.log(ifCompanyExists)
  if (ifCompanyExists) {
    console.log("exists")
    const update = await AdminJobClicksLog.findOneAndUpdate(
      {
        company: new RegExp(company, 'i')
      },
      { $inc: { clicks: 1 } },
    )
  }
  else {
    console.log("does not exits")
    const newlogDataAdminJobClicks = new AdminJobClicksLog({
      company: req.body.company,
      clicks: 1
    })
    const res1 = await newlogDataAdminJobClicks.save();
    res.sendStatus(200).end();
  }
})

router.post("/logDataAdminSaveJobs", async (req, res) => {
  console.log("admin save jobs")
  const companyTitle = req.body.logData

  const ifCompanyExists = await AdminJobSavesLog.findOne({ companyTitle: new RegExp(companyTitle, 'i') })
  console.log(ifCompanyExists)
  if (ifCompanyExists) {
    console.log("exists")
    const update = await AdminJobSavesLog.findOneAndUpdate(
      {
        companyTitle: new RegExp(companyTitle, 'i')
      },
      { $inc: { saves: 1 } },
    )
  }
  else {
    console.log("does not exits")
    const newlogDataAdminSavesLog = new AdminJobSavesLog({
      companyTitle: companyTitle,
      saves: 1
    })
    const res1 = await newlogDataAdminSavesLog.save();
  }
  res.sendStatus(200).end();
})
router.get("/staticprofile/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
  //email:req.user.id
  const id = req.params.id
  console.log("param id " + req.params.id);
  ProfileView.findOneAndUpdate(
    { applicantId: id },
    {
      $setOnInsert: { inserted: true, viewsToday: 1 }
    },
    { setDefaultsOnInsert: true, upsert: true },
    (err, doc) => {
      //console.log(doc);
      if (doc) {
        ProfileView.findOneAndUpdate(
          { applicantId: id, inserted: true },
          {
            $inc: {
              viewsToday: 1
            }
          },
          { new: true },
          (err, doc) => {
          console.log(err)
          }
        );

        //inserted: true, viewsToday: 0

        //ProfileView.ProfileView;
      }
    }
  );
  console.log("param id " + req.params.id);
  User.findOne({
    _id: req.params.id

  }, function (err, user) {
    console.log("inside static prifle get");

    if (user) {
      console.log(user);
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })
      res.end(JSON.stringify(user)); //success

    } else {
      res.status(400).json("User does not exist");
    }
  }
  );
});
router.post("/logDataAdminJobTrace", async (req, res) => {
  console.log("admin log trace")
  console.log(req.body)
  const companyTitle = req.body.logData;
  const type = req.body.type
  console.log(type)
  if (type === "view") {
    const ifCompanyExists = await AdminJobTrace.findOne({ companyTitle: new RegExp(companyTitle, 'i') })
    console.log(ifCompanyExists)
    if (ifCompanyExists) {
      console.log("exists")
      const update = await AdminJobTrace.findOneAndUpdate(
        {
          companyTitle: new RegExp(companyTitle, 'i')
        },
        { $inc: { view: 1 } },
      )
    }
    else {
      console.log("does not exits")
      const newAdminJobTrace = new AdminJobTrace({
        companyTitle: companyTitle,
        view: 1,
        half: 0,
        full: 0
      })
      const res1 = await newAdminJobTrace.save();
    }
    // res.sendStatus(200).end();
  }
  else if (type === "half") {
    console.log("in half")
    const update = await AdminJobTrace.findOneAndUpdate(
      {
        companyTitle: new RegExp(companyTitle, 'i')
      },
      { $inc: { half: 1 } },
    )

  }
  else if (type === "full") {
    console.log("in full")
    const update = await AdminJobTrace.findOneAndUpdate(
      {
        companyTitle: new RegExp(companyTitle, 'i')
      },
      {
        $inc: { full: 1 },
        $inc: { view: -1 },
        $inc: { half: -1 }
      },
      { upsert: true }
    )

  }
  res.sendStatus(200).end();
})





module.exports = router;