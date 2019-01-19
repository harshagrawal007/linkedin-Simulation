var mongoose = require("mongoose");
const FirstTenSchema = new mongoose.Schema({
    jobId: {
        type: String
    },
    jobCity: {
        type: String
    },
    appArray: {
        type: Array
    },
    jobTitle: {
        type: String
    },
    dateApplied: {
        type: Date
    },
    month: {
        type: String
    }
});

var FirstTen = mongoose.model("first10", FirstTenSchema);



const CityChartSchema = new mongoose.Schema({
    jobId: {
        type: String
    },
    jobTitle:{
        type: String
    },
    applicantCity: {
        type: String
    },
    appArray: {
        type: Array
    },
    dateApplied: {
        type: Date
    },
    month: {
        type: String
    }
});

var CityChart = mongoose.model("cityChart", CityChartSchema);

module.exports = { CityChart };

const LessApplicationSchema = new mongoose.Schema({
    jobId: {
        type: String
    },
    jobTitle: {
        type: String
    },
    appArray: {
        type: Array
    },
    dateApplied: {
        type: Date
    },
    month: {
        type: String
    }
});

var LessChart = mongoose.model("lessChart", LessApplicationSchema);

module.exports = { CityChart, FirstTen, LessChart };

