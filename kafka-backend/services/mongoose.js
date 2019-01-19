var mongoose = require('mongoose');
const Schema = mongoose.Schema
// const db = require('../config/keys').mongoURI;
//connect to mongo
mongoose.Promise = global.Promise;

//mongoose.connect('mongodb://localhost:27017/homeaway')
mongoose.connect('mongodb://linkedin_db1:linkedin_db1@ds141613.mlab.com:41613/linkedin_db', { useNewUrlParser: true })
    .then(
        () => { console.log("Mongoose is Connected") },
        err => { console.log("Mongoose is Not Connected" + err) }
    );
mongoose.set('useCreateIndex', true);

module.exports.Job = mongoose.model('Job',
    {
        user: {
            type: String,
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

