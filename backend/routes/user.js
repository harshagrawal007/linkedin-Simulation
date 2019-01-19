
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const passport = require('passport');
var bodyParser = require('body-parser');
var mysql = require('mysql');
//var kafka = require('../../kafka/client');
const { User } = require("../models/applicant")
const { ConnectionRequest } = require("../models/connectionRequests");
const { Connection } = require("../models/connections");
const JWT_SECRET = 'linkedInAuth';


////redis

// let redis = require("redis"),
//   client = redis.createClient({
//     port: 10720, // replace with your port
//     host: "redis-10720.c8.us-east-1-3.ec2.cloud.redislabs.com", // replace with your hostanme or IP address
//     password: "bFCZ23Yhem2TjtTRyP2YLWIUtyEXVg6E" // replace with your password
//   });


//////

signToken = user => {
  return JWT.sign({
    iss: 'linkedIn',
    sub: user,
    iat: new Date().getTime(), //current time
    exp: new Date().setDate(new Date().getDate + 1) //current time + one day ahead
  }, 'linkednInAuth')

}
// var con = mysql.createConnection({
//   //connectionLimit: 100,
//   port: '3306',
//   host: 'linkedin.cdlsepyst744.us-east-2.rds.amazonaws.com',
//   user: 'root',
//   password: 'password',
//   database: 'linkedin'
// });

// con.connect(function (error) {
//   if (!!error) {
//     console.log("error")
//   }
//   else {
//     console.log("mysql connected")
//   }
// })


// @route   POST /user/signup
// @desc    Register new user
// @access  Public
router.post('/signup', async (req, res, next) => {
  console.log("in sign up")
  var salt = bcrypt.genSaltSync(10);
  //var encryptedpassword = mysql.escape(bcrypt.hashSync(req.body.signUpPass, salt));
  var encryptedpassword = bcrypt.hashSync(req.body.signUpPass, salt);
  var email = mysql.escape(req.body.signUpEmail);
  var type = mysql.escape(req.body.type)
  const newUser = new User({
    firstName: req.body.fname,
    lastName: req.body.lname,
    email: req.body.signUpEmail,
    country: req.body.country,
    postalCode: req.body.postalCode,
    city : req.body.city,
    password : encryptedpassword,
    mostRecentJobTitle: req.body.mostRecentJobTitle,
    mostRecentCompany: req.body.mostRecentCompany,
    type: req.body.type,
   // photo: "https://s3.us-east-2.amazonaws.com/user-images-linkedin2/default+profile.jpeg"
   photo:""

  })
  console.log(newUser)
  try {
    const user = await User.findOne({
      email: req.body.signUpEmail,
      type: req.body.type
    })
    if (user) {
      var value = "This EmailID is already used, Please use an alternate email address";
      res.code = "201";
      res.sendStatus(201).end();
    }
    else {
      try {
        //var sql = "hello"
        //console.log(sql)
       // var sql = "insert into login (email, password, type) VALUES(" + email + "," + encryptedpassword + "," + type + ")";
        //console.log(sql)
        // con.query(sql, function (err, result) {
        //   if (err) {
        //     console.log("Error during  signup")
        //     console.log(err)
        //   }
        //   else {
        //     console.log(" sign up Successfull! You can now Log In to your account")
        //   }
        // })
        const user = await newUser.save();
        console.log("New User created : ", user);
        res.sendStatus(200).end();
      }
      catch (err) {
        next(err);
        var value = "Sorry, there was some error in Sign Up. Please Try Again"
        console.log("Error Creating new User");
        res.sendStatus(400).end();
      }
    }
  }
  catch (err) {
    next(err);
    res.code = "400";
    console.log(res.value);
    res.value = "Sorry, there was some error in Sign Up. Please Try Again";
    res.sendStatus(400).end();
  }
});




router.post('/login', async (req, res) => {
  console.log("Inside Login Post Request");
  console.log(req.body)
 // var email = mysql.escape(req.body.email);
  //var password = mysql.escape(req.body.password);
  //var type = mysql.escape(req.body.type);
  //var check_sql = "select count(1) from login where email=" + email + " and type = " + type + ""
  //console.log(check_sql)
  //con.query(check_sql, function (err, result) {
    //if (err) {
    //  console.log(err)
   // }

    //else
      //var check_result = JSON.stringify(result)
    //console.log(check_result.charAt(13))
    // var count = parseInt(check_result.charAt(13))
    // if (count == 0) {
    //   console.log("nothing");
    //   res.value = "You are not registered. Please log in with registered EmailID";
    //   console.log(res.value)
    //   res.code = "203";
    //   res.sendStatus(203).end();
    //   console.log(res.value)
    // }
    // else {
      // var sql = "select * from login where email=" + email + " and type = " + type + ""
      // con.query(sql, function (err, result) {
      //   if (err) {
      //     console.log(err)
      //   }
      //   else {
          try {
            const user = await User.findOne({
              email: req.body.email,
              type: req.body.type
            })
            if (user) {
              console.log("user found");
         // console.log(result)
          //console.log(result[0].password)
          bcrypt.compare(req.body.password, user.password, function (err, results) {
            //console.log('Entered password ', password)
            //console.log('Password in db ', result[0].password)
            //console.log(results)
            if (results) {
              User.findOne({ email: req.body.email, type: req.body.type },
                function (err, result) {
                  if (err) {
                    console.log(err)
                  }
                  else {
                    const payload = { id: result.id, email: result.email, firstName: result.firstName, lastName: result.lastName, type: result.type, city:result.city }; // Create JWT Payload
                    console.log(payload);
                    res.code = "200";
                    res.value = "Login Successful";
                    console.log(res.value)
                    JWT.sign(
                      payload,
                      JWT_SECRET,
                      { expiresIn: 3600 },
                      (err, token) => {
                        res.status(200).json({
                          success: true,
                          token: 'bearer ' + token
                        });
                      }
                    );
                  }
                })

              }
            
            else {
              res.value = "Invalid Credentials. Please Enter correct password";
              console.log(res.value)
              res.code = "201";
              res.sendStatus(201).end();
            }

          })

        }
      }
     // })

   // }


  //})
  catch (err) {
    next(err);
    res.code = "400";
    console.log(res.value);
    res.value = "Sorry, there was some error in Login. Please Try Again";
    res.sendStatus(400).end();
  }

})




router.get('/search', async (req, res, next) => {
  console.log("in search")
  //try{
  const userName = req.query.userName
  const id = req.query.id
  console.log(id)
  // console.log(id)
  // var key = userName + "," + id;
  // client.get(key, async(err, value) => {
  //   if (err) {
  //     throw err;
  //   } else {
  // console.log(value);
  // if(value === null){
  const connections = await Connection.find({
    userId: id
  }, { connectionID: 1 }
  )
  console.log(connections)

  var connectionArray = []
  for (let i = 0; i < connections.length; i++) {
    //console.log(connections[i].connectionID)
    connectionArray.push(connections[i].connectionID)
  }
  console.log(connectionArray)
  const connectionsRequests = await ConnectionRequest.find({
    recieverID: id
  }, { senderID: 1 }
  )
  console.log(connectionsRequests)
  var connectionReqArray = []
  for (let i = 0; i < connectionsRequests.length; i++) {
    // console.log(connectionsRequests[i].senderID)
    connectionReqArray.push(connectionsRequests[i].senderID)
  }
  console.log(connectionReqArray)
  const connectionsRequests2 = await ConnectionRequest.find({
    senderID: id
  }, { recieverID: 1 }
  )
  console.log(connectionsRequests2)
  var connectionReqArray2 = []
  for (let i = 0; i < connectionsRequests2.length; i++) {
    // console.log(connectionsRequests[i].senderID)
    connectionReqArray.push(connectionsRequests2[i].recieverID)
  }
  console.log(connectionReqArray2)

  const user = await User.find({
    $and: [
      {
        $or: [
          { firstName: new RegExp(userName, 'i') },
          { lastName: new RegExp(userName, 'i') }
        ]
      },
      {
        _id: { $nin: id }
      },
      {
        _id: { $nin: connectionArray }
      },
      {
        _id: { $nin: connectionReqArray }
      },
      {
        _id: { $nin: connectionReqArray2 }
      }

    ]
  })

  // client.set(key, JSON.stringify(user), function(err) {
  //   if (err) {
  //     throw err;
  //   } else {
  //     console.log("value added in Redis!");
  //   }
  // });

  console.log(user)
  res.end(JSON.stringify(user))

  //    }
  // else{
  //   console.log("in else")
  //   res.end(value)
  // }

  //}
  //  })


  // }
  // catch(err){
  //   next(err);
  //    console.log("Error is search user");
  //    res.sendStatus(400).end();
  // }
})


router.get('/searchConnection', async (req, res, next) => {
  console.log("in user search connection")
  const userName = req.query.userName
  const id = req.query.id
  try {
    const connections = await Connection.find({
      $and: [
        {
          $or: [
            { connectionFname: new RegExp(userName, 'i') },
            { connectionLname: new RegExp(userName, 'i') }
          ]
        },
        {
          userId: id
        }

      ]
    })
    console.log(connections)
    res.end(JSON.stringify(connections))

  }
  catch (err) {
    res.sendStatus(400).end();
  }

})

router.get('/searchConnectionRequest', async (req, res, next) => {
  console.log("in user search connection request")
  const userName = req.query.userName
  const id = req.query.id
  console.log(id)
  try {
    const connections = await ConnectionRequest.find({

      $and: [
        {
          $or: [
            { senderFname: new RegExp(userName, 'i') },
            { senderLname: new RegExp(userName, 'i') }
          ]
        },
        {
          recieverID: id
        }

      ]




    })
    console.log(connections)
    res.end(JSON.stringify(connections))

  }
  catch (err) {
    res.sendStatus(400).end();
  }

})

router.get('/searchConnectionRequestRec', async (req, res, next) => {
  console.log("in user search connection request rec")
  const userName = req.query.userName
  const id = req.query.id
  console.log(id)
  try {
    const connections = await ConnectionRequest.find({

      $and: [
        {
          $or: [
            { recieverFname: new RegExp(userName, 'i') },
            { recieverLname: new RegExp(userName, 'i') }
          ]
        },
        {
          senderID: id
        }

      ]

    })
    console.log(connections)
    res.end(JSON.stringify(connections))

  }
  catch (err) {
    res.sendStatus(400).end();
  }

})

router.get('/details/:id', async (req, res, next) => {
  const id = req.params.id
  console.log("in user details fetch")
  const user = await User.find({ _id: id }, { firstName: 1, lastName: 1, country: 1, mostRecentJobTitle: 1, mostRecentCompany: 1, photo: 1 })
  res.end(JSON.stringify(user))

})


//Delete an existing Account
router.delete('/deleteAccount', function (req, res) {
  console.log("res.body" + JSON.stringify(req.query.email))
  console.log("res.body" + JSON.stringify(req.query.id))
  console.log("res.body" + JSON.stringify(req.query.type))

  User.deleteOne({ _id: req.query.id },function (err, data) {
      console.log("in func")
      if (err) {
        res.code = "400";
        res.value = "There has been some error, Please try again";
        console.log(res.value);
        res.sendStatus(400).end();
      }
      // else {
      //   console.log("data" + data)
      //   var sql = "delete from login where email=" + mysql.escape(req.query.email) + "and type=" + mysql.escape(req.query.type)
      //   console.log(sql)
      //   con.query(sql, function (err, result) {
      //     if (err) {
      //       console.log("Error during  Delete")
      //       console.log(err)
      //     }
          else {
            console.log(" Delete Successfull! You can now Log In to your account")
            res.code = "200";
            res.value = "User Deleted Successfully";
            console.log(res.value);
            res.sendStatus(200).end();
          }
        })
     // }
   // });
});



module.exports = router;
