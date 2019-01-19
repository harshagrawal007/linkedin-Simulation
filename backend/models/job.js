var mongoose = require("mongoose");
const Schema = mongoose.Schema;
const JobSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    company: {
        type: String
    },
    jobTitle: {
        type: String
    },
    jobCity: {
        type: String
    },
    jobState: {
        type: String
    },
    jobFunction: {
        type: String
    },
    employmentType: {
        type: String
    },
    companyIndustry: {
        type: String
    },
    seniorityLevel: {
        type: String
    },
    jobDescription: {
        type: String
    },
    selectedOption: {
        type: String
    },
    emailNotify: {
        type: String
    },
    externalSite: {
        type: String
    },
    skills: {
        type: String
    },
    hearAboutUs: {
        type: String
    },
    relevantExperience: {
        type: String
    },
    educationLevel: {
        type: String
    },
    datePosted: {
        type: Date
    },
    logo : {
        type: String
    },
    easyApply : {
        type: String
    }
});


var Job = mongoose.model("job", JobSchema);

module.exports = { Job };


