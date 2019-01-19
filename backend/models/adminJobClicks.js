var mongoose = require("mongoose");
const AdminJobClicksLogSchema = new mongoose.Schema({
   
    company: {
        type: String
    },
    clicks: {
        type: Number
    },
    
});



var AdminJobClicksLog = mongoose.model("adminJobClicksLog", AdminJobClicksLogSchema);
module.exports = { AdminJobClicksLog };