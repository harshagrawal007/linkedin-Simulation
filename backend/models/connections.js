var mongoose = require("mongoose");
const ConnectionSchema= new mongoose.Schema({
    userId:{
        type: String
    },
    connectionID:{
        type: String
    },
    connectionFname: {
        type: String
    },
    connectionLname: {
        type: String
    },
    connectionCountry: {
        type: String
    },
    connectionJobTitle: {
        type: String
    },
    connectionCompany: {
        type: String
    },
    connectionPhoto: {
        type: String
    }
});

var Connection = mongoose.model("connection", ConnectionSchema);
module.exports = { Connection };
