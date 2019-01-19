var mongoose = require("mongoose");
const AdminJobTraceSchema = new mongoose.Schema({
   
    companyTitle: {
        type: String
    },
    full: {
        type: Number
    },
    half: {
        type: Number
    },
    view : {
        type: Number
    }
    
});



var AdminJobTrace = mongoose.model("adminJobTrace", AdminJobTraceSchema);
module.exports = { AdminJobTrace };