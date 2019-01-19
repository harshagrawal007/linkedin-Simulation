var mongo = require('./mongoose');
// const { Job } = require("../models/job");
////redis

// let redis = require("redis"),
//     client = redis.createClient({
//         port: 10720, // replace with your port
//         host: "redis-10720.c8.us-east-1-3.ec2.cloud.redislabs.com", // replace with your hostanme or IP address
//         password: "bFCZ23Yhem2TjtTRyP2YLWIUtyEXVg6E" // replace with your password
//     });


//////

async function handle_request(msg, callback) {
    var res = {};
    console.log("Inside Job Search Request");

    //     // Properties.find({
    //     mongo.Messages.update(
    //         {
    //             _id: msg.messageid
    //         },
    //         { $push: { travelermessage: msg.message } },
    //         { new: true, upsert: true },
    //         function (err, res) {
    //             if (err) {
    //                 res.code = "400";
    //                 res.value = "Could Not Get Profile";
    //                 console.log(res.value);
    //                 res.sendStatus(400).end();
    //             }
    //             else {
    //                 console.log("Message " + JSON.stringify(res))
    //                 res.code = 200
    //                 // res.value = res;
    //                 // res.end(JSON.stringify(res))
    //                 callback(null, res);
    //             }
    //         })
    // }
    //Job Search Board for Applicant
    // router.get("/searchjob", async (req, res, next) => {
    console.log("in search job" + JSON.stringify(msg))
    try {
        //const job = msg.query.job
        const job = msg.job
        
        const location = msg.location
       // const location = msg.query.location
        const key = job + "," + location
        console.log("message"+msg)
        console.log("job"+job)
        console.log("location"+location)
        // client.get(key, async (err, value) => {
        //     if (err) {
        //         throw err;
        //     } else {
        //         console.log(value);
        //         if (value === null) {
                    const jobs = await  mongo.Job.find({
                        $and: [
                            {
                                $or: [
                                    { jobTitle: new RegExp(job, 'i') },
                                    { skills: new RegExp(job, 'i') },
                                    { company: new RegExp(job, 'i') }
                                ]
                            },
                            {
                                $or: [
                                    { jobCity: { $regex: new RegExp("^" + location.toLowerCase(), "i") } },
                                    { jobState: { $regex: new RegExp("^" + location.toLowerCase(), "i") } }
                                ]
                            }
                        ]
                    })
                    // client.set(key, JSON.stringify(jobs), function (err) {
                    //     if (err) {
                    //         throw err;
                    //     } else {
                    //         console.log("value added in Redis!");
                    //     }
                    // });
                    console.log(jobs)
                    res = jobs
                    callback(null, res);

                    // res.end(JSON.stringify(jobs))
                //}
                // else {
                //     console.log("in else")
                //     res = value
                //     callback(null, res);

                //     // res.end(value)


                // }
            //}
       // });
    }
    catch (err) {
        callback(err,"Error");
        console.log("Error Creating new Job");
        //res.sendStatus(400).end();
    }

}

exports.handle_request = handle_request;