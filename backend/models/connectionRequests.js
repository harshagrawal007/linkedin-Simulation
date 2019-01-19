var mongoose = require("mongoose");
const ConnectionRequestSchema = new mongoose.Schema({
    senderID:{
        type: String
    },
    recieverID:{
        type: String
    },
    senderFname: {
        type: String
    },
    senderLname: {
        type: String
    },
    senderCountry: {
        type: String
    },
    senderJobTitle: {
        type: String
    },
    senderCompany: {
        type: String
    },
    senderPhoto : {
        type: String
    },
    recieverFname: {
        type: String
    },
    recieverLname: {
        type: String
    },
    recieverCountry: {
        type: String
    },
    recieverTitle: {
        type: String
    },
    recieverCompany :{
        type: String
    },
    recieverPhoto :{
        type: String
    },
    flag :{
        type: String
    }
});
var ConnectionRequest = mongoose.model("connectionRequest", ConnectionRequestSchema);
module.exports = { ConnectionRequest };


// var mongoose = require("mongoose");
// var Schema = mongoose.Schema;

// const ConnectionRequestSchema = new mongoose.Schema({
//     senderID: { type: Schema.Types.ObjectId, ref: 'user' },
//     receiverID: { type: Schema.Types.ObjectId, ref: 'user' },
//     senderFname: {
//         type: String
//     },
//     senderLname: {
//         type: String
//     },
//     senderCountry: {
//         type: String
//     },
//     senderJobTitle: {
//         type: String
//     },
//     senderCompany: {
//         type: String
//     },
  
//     recieverFname: {
//         type: String
//     },
//     recieverLname: {
//         type: String
//     },
//     recieverCountry: {
//         type: String
//     },
//     recieverTitle: {
//         type: String
//     },
//     recieverCompany :{
//         type: String
//     },
  
//     flag :{
//         type: String
//     }
// });
// var ConnectionRequest = mongoose.model("connectionRequest", ConnectionRequestSchema);
// module.exports = { ConnectionRequest };



// var mongoose = require("mongoose");
// const { User } = require("../models/applicant");
// var Schema = mongoose.Schema;

// const MessageSchema = new mongoose.Schema({
//     senderid: { type: Schema.Types.ObjectId, ref: 'user' },
//     receiverid: { type: Schema.Types.ObjectId, ref: 'user' },
//     message: {
//         type: Array
//     },
//     receiverFirstName: {
//         type: String
//     },
//     receiverLastName: {
//         type: String
//     },
//     senderFirstName: {
//         type: String
//     },
//     senderLastName: {
//         type: String
//     }
// });

// var Messages = mongoose.model("messages", MessageSchema);

// module.exports = { Messages };