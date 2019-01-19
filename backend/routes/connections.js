const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
var app = express();
const { ConnectionRequest } = require("../models/connectionRequests");
const { Connection } = require("../models/connections");


//Make/Accept Connections
router.post("/makeConnectionRequest", async(req, res,next) => {
  console.log("in make request")
  console.log(req.body)
  const newConnectionRequest = new ConnectionRequest ({
    senderID : req.body.senderID,
    recieverID : req.body.recieverID,
    senderFname : req.body.senderFname,
    senderLname : req.body.senderLname,
    senderCountry : req.body.senderCountry,
    senderJobTitle : req.body.senderJobTitle,
    senderCompany : req.body.senderCompany,
    senderPhoto : req.body.senderPhoto,
    recieverFname : req.body.recieverFname,
    recieverLname : req.body.recieverLname,
    recieverCountry : req.body.recieverCountry,
    recieverTitle : req.body.recieverTitle,
    recieverCompany : req.body.recieverCompany,
    recieverPhoto : req.body.recieverPhoto,
    flag : req.body.flag

})
//console.log(newConnectionRequest)
try{
  const connectionRequest = await newConnectionRequest.save();
console.log("New Connection Request created : ",connectionRequest);
res.sendStatus(200).end(); //success
}
catch(err){
  res.sendStatus(400).end();
}

});

// Accept Connection
router.put("/makeConnectionRequest", async(req, res,next) => {
  console.log("in accept connection")
  const senderid = req.body.senderId
  const recid = req.body.recieverID
  console.log(senderid)
  try{
    const update = await ConnectionRequest.updateOne(
      {
        senderID : senderid,
        recieverID : recid
      },
      {$set : {"flag" : "accept" }}
  )
  res.sendStatus(200).end();
  }
  catch(err){
    res.sendStatus(400).end();
  }
})

//Fetch the connection requests
router.get("/getConnectionRequest/:id", async(req, res,next) => {
  console.log("in get connection request")
  const userid = req.params.id;
  console.log(userid)
  try{
    const connectionRequest = await ConnectionRequest.find( {
      recieverID : userid,
      flag: "pending"
    })
    //.populate('senderID').populate('recieverID')
    console.log(connectionRequest)
    res.end(JSON.stringify(connectionRequest)); //success
  }
  catch(err){
    res.sendStatus(400).end();
  }

});

//Accept Connection request
router.post("/addConnection", async(req, res,next) => {
  console.log("In accept connection")
  console.log(req.body)
  const newConnection1 = new Connection ({
    userId: req.body.userId,
    connectionID: req.body.connectionID,
    connectionFname: req.body.connectionFname,
    connectionLname: req.body.connectionLname,
    connectionCountry: req.body.connectionCountry,
    connectionJobTitle: req.body.connectionJobTitle,
    connectionCompany: req.body.connectionCompany,
    connectionPhoto: req.body.connectionPhoto    
   
})
const newConnection2 = new Connection ({
  userId: req.body.connectionID,
  connectionID: req.body.userId,
  connectionFname: req.body.userFname,
  connectionLname: req.body.userLname,
  connectionCountry: req.body.userCountry,
  connectionJobTitle: req.body.userJobTitle,
  connectionCompany: req.body.userCompany ,
  connectionPhoto: req.body.userPhoto    
   
})

 console.log(newConnection1)
 console.log(newConnection2)

try{
const connection1 = await newConnection1.save();
const connection2 = await newConnection2.save();

console.log("New Connection  created : ",connection1);
console.log("New Connection  created : ",connection2);

res.sendStatus(200).end(); //success
}
catch(err){
  res.sendStatus(400).end();
}

})

//Decline Connection request
router.delete("/makeConnectionRequest", async(req, res,next) => {
  console.log("in delete request")
  const senderID =  req.query.senderID
  const recieverID = req.query.recieverID
  console.log(senderID)
  console.log(recieverID)
  const del = await ConnectionRequest.findOneAndDelete(
    {senderID: senderID},
    {recieverID: recieverID}
   
  )
   res.sendStatus(200).end();

})

//Get Connection  List
router.get("/getConnectionList/:id", async(req, res,next) => {
  console.log("in connection list")
  const userID = req.params.id
  console.log(userID)
  try{
    const connections = await Connection.find( {
      userId : userID
    })
    console.log(connections)
    res.end(JSON.stringify(connections))

  }
  catch(err){
    res.sendStatus(400).end();
  }
})
module.exports = router;
