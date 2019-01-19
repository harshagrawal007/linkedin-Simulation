var mongoose = require("mongoose");
const AdminJobSavesLogSchema = new mongoose.Schema({
   
    companyTitle: {
        type: String
    },
    saves: {
        type: Number
    },
    
});



var AdminJobSavesLog = mongoose.model("adminJobSavesLog", AdminJobSavesLogSchema);
module.exports = { AdminJobSavesLog };