var mongoose = require("mongoose");
const SavedJobsSchema = new mongoose.Schema({
    applicantId:{
        type: String
    },
    jobId:{
        type: String
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
 
    skills: {
        type: String
    },
    relevantExperience: {
        type: String
    },
    educationLevel: {
        type: String
    },
    dateSaved :{
        type: Date
    }
});
var SavedJob = mongoose.model("savedjob", SavedJobsSchema);
module.exports = { SavedJob };
