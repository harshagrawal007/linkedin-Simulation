var mongoose = require("mongoose");
const { User } = require("../models/applicant");
var Schema = mongoose.Schema;

const MessageSchema = new mongoose.Schema({
    senderid: { type: Schema.Types.ObjectId, ref: 'user' },
    receiverid: { type: Schema.Types.ObjectId, ref: 'user' },
    message: {
        type: Array
    }
});

var Messages = mongoose.model("messages", MessageSchema);

module.exports = { Messages };