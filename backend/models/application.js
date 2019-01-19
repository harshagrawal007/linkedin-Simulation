var mongoose = require("mongoose");
const ApplicationSchema = new mongoose.Schema({
    applicantId: {
        type: String
    },
    address: {
        type: String
    },
    jobId: {
        type: String
    },
    gender: {
        type: String
    },
    applicantFirstName: {
        type: String
    },
    applicantLastName: {
        type: String
    },
    howDidYouHearAboutUs: {
        type: String
    },
    applicationType: {
        type: String
    },
    dateApplied: {
        type: Date
    },
    disabilityStatus: {
        type: String
    },
    sponsorShip: {
        type: String
    },
    diversity: {
        type: String
    },
    resume: {
        type: String
    },
    coverLetter: {
        type: String
    }
});


var Application = mongoose.model("application", ApplicationSchema);

module.exports = { Application };
