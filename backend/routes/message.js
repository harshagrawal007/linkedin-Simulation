const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
var app = express();
const { Messages } = require('../models/messages')
const { User } = require("../models/applicant");


////redis

// let redis = require("redis"),
//   client = redis.createClient({
//     port: 10720, // replace with your port
//     host: "redis-10720.c8.us-east-1-3.ec2.cloud.redislabs.com", // replace with your hostanme or IP address
//     password: "bFCZ23Yhem2TjtTRyP2YLWIUtyEXVg6E" // replace with your password
//   });


//////

//Send/Receive messages
router.post("/sendMessage", function (req, res) {
  console.log("req.body.senderid" + req.body.senderid)
  console.log("req.body.receiverid" + req.body.receiverid)

  Messages.findOne({
    senderid: req.body.senderid,
    receiverid: req.body.receiverid,
  }, { _id: 1 },
    function (err, results) {
      if (err) {
        res.code = "400";
        res.value = "There has been some error, Please try again";
        console.log(res.value);
        res.sendStatus(400).end();
      }
      else if (results) {
        console.log("sendMessage 1" + results)
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        })
        res.value = results;
        res.end(JSON.stringify(results))

      }
      else {
        Messages.findOne({
          receiverid: req.body.senderid,
          senderid: req.body.receiverid,
        }, {},
          function (err, results) {
            if (err) {
              res.code = "400";
              res.value = "There has been some error, Please try again";
              console.log(res.value);
              res.sendStatus(400).end();
            }
            else if (results) {
              console.log("sendMessage 2" + results)
              res.writeHead(200, {
                'Content-Type': 'text/plain'
              })
              res.value = results;
              res.end(JSON.stringify(results))

            }
            else {
              var message = new Messages({
                senderid: req.body.senderid,
                receiverid: req.body.receiverid
              })

              message.save().then((message) => {
                console.log("message created : ", message);
                //res.sendStatus(200)
                res.value = message;
                console.log("JSON.stringify(message) sendMessage 3" + JSON.stringify(message))
                res.writeHead(200, {
                  'Content-Type': 'text/plain'
                })
                res.end(JSON.stringify(message))
              }, (err) => {

                res.sendStatus(400);
                res.end(err)
                console.log("Error Creating message" + message);

              })
            }
          })
      }
    })
});
// //Send/Receive messages
// router.post("/sendMessage", function (req, res) {
//   console.log("req.body.senderemail"+req.body.senderemail)
//   Users.findOneAndUpdate(
//     { _id: req.params._id },
//     { $set: { profile_photo: photo_array } },
//     function (err, data) {
//       console.log("in func")
//       if (err) {
//         res.code = "400";
//         res.value = "Could Not Update";
//         console.log(res.value);
//         res.sendStatus(400).end();
//       }
//       else {
//         console.log("Upload Profile Picture" + data)
//         //res.sendStatus(400)
//         res.value = data;
//         res.end(photo_array);
//         photo_array = ""
//       }
//     }
//   )
// });

//Get Messages
router.get("/getInbox/:id", function (req, res) {
  console.log("req,email" + req.params.id)
  //var key = "getInbox" + req.params.id
  // client.get(key, async (err, value) => {
  //   if (err) {
  //     throw err;
  //   }
  //   else {
  //     console.log(value);
  //     if (value === null) {
  Messages.find({ $or: [{ senderid: req.params.id }, { receiverid: req.params.id }] }).
    populate('senderid').
    populate('receiverid').
    // populate('senderid', 'photo', 'firstName', 'lastName').
    // populate('receiverid', 'photo', 'firstName', 'lastName').
    exec(function (err, results) {
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
        // client.set(key, JSON.stringify(results), function (err) {
        //   if (err) {
        //     throw err;
        //   } else {
        //     console.log("value added in Redis!");
        //   }
        // });
        console.log("Messages.Sender  " + JSON.stringify(results))

        res.end(JSON.stringify(results))
      }

    });

  //)
  // else {
  //   console.log("in else")
  //   res.end(value)
  // }
  //}
  // })

});


//Get Chat History
router.get("/getChatHistory/:id", function (req, res) {
  console.log("req.params.id" + req.params.id)
  Messages.find({ _id: req.params.id }, { message: 1, _id: 0 },
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


router.post('/addmessage', function (req, res) {
  console.log('req.params.message' + req.body.message)
  console.log("req.body.messageID" + req.body.messageid)
  Messages.findOneAndUpdate(
    {
      _id: req.body.messageid
    },
    { $push: { message: req.body.message } },
    { new: true, upsert: true },
    function (err, data) {
      if (err) {
        res.value = "in Err " + err;
        console.log(res.value);
        console.log("in func Message")
      }
      else {
        console.log("data1" + data)
        console.log("data2" + data)
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        })
        //res.value = data;
        res.end(JSON.stringify(data));
      }
    })
});
module.exports = router;
