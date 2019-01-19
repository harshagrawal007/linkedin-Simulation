import React, { Component } from "react";
import { connect } from "react-redux";
import NavbarLinkedin from "../Navbar/Navbar";
import "../../css/JobSearch.css";
import "../../css/application.css";
import { submitSearch } from "../../actions/submitSearch";
import Img from './default.jpg';
import axios from 'axios'
import swal from 'sweetalert2'
import { Link } from 'react-router-dom';
import moment from 'moment';
var jwtDecode = require('jwt-decode');
var _ = require('lodash');




class JobSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            job: "",
            location: "",
            searchResults: [],
            selectedSearch: [],
            current: 1,
            itemsPerPage: 5,
            activePage: 1,
            jobid: "",
            company: "",
            jobCity: "",
            jobState: "",
            jobTitle: "",
            jobFunction: "",
            jobDescription: "",
            skills: "",
            seniorityLevel: "",
            companyIndustry: "",
            employmentType: "",
            educationLevel: "",
            relevantExperience: "",
            experienceFilter: "",
            profile: {},
            experience: {},
            education: {},
            skill: {},
            resume: ""
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitSave = this.onSubmitSave.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onChangeExperience = this.onChangeExperience.bind(this);
        this.onChangeJobType = this.onChangeJobType.bind(this)
        this.onChangeDateFilter = this.onChangeDateFilter.bind(this)
        this.clickHandler = this.clickHandler.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onUploadResume = this.onUploadResume.bind(this);
        this.handleEasyApply = this.handleEasyApply.bind(this);


    }
    clickHandler(event) {
        this.setState({
            current: Number(event.target.id)
        });
    }
    onChangeDateFilter(e) {
        console.log(e.target.value)
        if (e.target.value === "week") {

            var results = [];

            for (let i = 0; i < this.props.search.data.length; i++) {
                var now = moment();
                var input = moment(this.props.search.data[i].datePosted);
                var isThisWeek = (now.isoWeek() == input.isoWeek())
                if (isThisWeek)
                    results.push(this.props.search.data[i])

            }
            console.log(results)
            console.log(results[0])

            this.setState({
                searchResults: results[0]
            })

            // let newlyDisplayed = _.filter(this.props.search.data, job => 
            //     moment().isoWeek() == moment(job.datePosted).isoWeek()  )
            //     this.setState({
            //         searchResults: newlyDisplayed
            //     })


            // let newlyDisplayed = _.filter(this.props.search.data, job => 
            //     moment(job.datePosted).isSame(new Date(), 'week')  )
            //     this.setState({
            //         searchResults: newlyDisplayed
            //     })

        }
        if (e.target.value === "month") {

            let newlyDisplayed = _.filter(this.props.search.data, job =>
                moment(job.datePosted).month() === moment().month())
            this.setState({
                searchResults: newlyDisplayed,
                company: "",
                jobCity: "",
                jobState: "",
                jobTitle: "",
                jobFunction: "",
                jobDescription: "",
                skills: "",
                seniorityLevel: "",
                companyIndustry: "",
                employmentType: "",
                educationLevel: "",
                relevantExperience: ""

            })

        }
        else {
            this.setState({
                searchResults: this.props.search.data
            })
        }

    }





    onChangeExperience(e) {
        e.preventDefault();
        console.log("in on change experience")
        console.log(e.target.value)

        console.log("not empty")
        if (e.target.value !== "clear") {
            let newlyDisplayed = _.filter(this.props.search.data, job =>
                job.seniorityLevel.toLowerCase().includes((e.target.value).toLowerCase()))
            this.setState({
                searchResults: newlyDisplayed,
                company: "",
                jobCity: "",
                jobState: "",
                jobTitle: "",
                jobFunction: "",
                jobDescription: "",
                skills: "",
                seniorityLevel: "",
                companyIndustry: "",
                employmentType: "",
                educationLevel: "",
                relevantExperience: ""
            })
        }
        else {
            this.setState({
                searchResults: this.props.search.data,

            })
        }


    }


    onChangeJobType(e) {
        e.preventDefault();
        console.log("in on change job type")
        console.log(e.target.value)

        if (e.target.value !== "clear") {
            let newlyDisplayed = _.filter(this.props.search.data, job =>
                job.employmentType.toLowerCase().includes((e.target.value).toLowerCase()))
            this.setState({
                searchResults: newlyDisplayed,
                company: "",
                jobCity: "",
                jobState: "",
                jobTitle: "",
                jobFunction: "",
                jobDescription: "",
                skills: "",
                seniorityLevel: "",
                companyIndustry: "",
                employmentType: "",
                educationLevel: "",
                relevantExperience: ""

            })
        }
        else {
            this.setState({
                searchResults: this.props.search.data
            })
        }

    }

    onChangeSearch(e) {
        console.log("in on change")

        console.log("not empty")
        console.log("search" + this.state.searchResults)
        this.setState({ [e.target.name]: e.target.value })
        console.log(this.props.search.data)
        if (e.target.value) {
            let newlyDisplayed = _.filter(this.props.search.data, job =>
                job.company.toLowerCase().includes((e.target.value).toLowerCase()))
            this.setState({
                searchResults: newlyDisplayed,
                company: "",
                jobCity: "",
                jobState: "",
                jobTitle: "",
                jobFunction: "",
                jobDescription: "",
                skills: "",
                seniorityLevel: "",
                companyIndustry: "",
                employmentType: "",
                educationLevel: "",
                relevantExperience: ""
            })
        }
        else {
            this.setState({
                searchResults: this.props.search.data
            })
        }



    }

    async onUploadResume(e) {
        e.preventDefault();
        console.log("in upload resume")
        console.log('Selected file:', e.target.files[0]);
        let file = new FormData();
        file.append("file", e.target.files[0]);
        //let file = e.target.files[0];
        console.log("uploading profile resume...");
        //formData.append('profileimage', file);
        const result = await axios.post(`http://localhost:3001/applicant/resumeApplication`, file)
        console.log("RESULT" + result.data)
        this.setState({
            resume: result.data
        })

        // window.location.reload();

    }

    componentDidMount() {
        console.log("in component did mount");
        axios.get(`http://localhost:3001/applicant/profile`).then(response => {
            console.log("response.data" + JSON.stringify(response.data));
            this.setState({
                profile: response.data
                // profile: this.props.getProfile
            });

            console.log("profile [0] " + this.state.profile.firstName);
            this.setState({
                skill: this.state.profile.skill,
                education: this.state.profile.education,
                experience: this.state.profile.experience
            });
        });
    }
    // async onSubmitSave(e) {
    //   e.preventDefault();
    //   console.log("in submit save");
    //   var decoded = jwtDecode(localStorage.getItem("userToken"));
    //   const saveJobData = {
    //     applicantId: decoded.id,
    //     jobId: this.state.jobid,
    //     company: this.state.company,
    //     jobTitle: this.state.jobTitle,
    //     jobCity: this.state.jobCity,
    //     jobState: this.state.jobState,
    //     jobFunction: this.state.jobFunction,
    //     employmentType: this.state.employmentType,
    //     companyIndustry: this.state.companyIndustry,
    //     seniorityLevel: this.state.seniorityLevel,
    //     jobDescription: this.state.jobDescription,
    //     skills: this.state.skills,
    //     relevantExperience: this.state.relevantExperience,
    //     educationLevel: this.state.educationLevel
    //   };
    //   console.log(saveJobData.applicantId);
    //   console.log(saveJobData.jobId);
    //   const response = await axios.post(
    //     "http://localhost:3001/applicant/savejob",
    //     saveJobData
    //   );
    //   if (response.status === 200) {
    //     swal({
    //       title: "Success!",
    //       text: "Job Saved",
    //       type: "success",
    //       confirmButtonText: "OK"
    //     });
    //   } else if (response.status === 201) {
    //     swal({
    //       title: "Error!",
    //       text: "This job is already saved",
    //       type: "error",
    //       confirmButtonText: "OK"
    //     });
    //   } else if (response.status === 400) {
    //     swal({
    //       title: "Error!",
    //       text: "There was some error, Please try again",
    //       type: "error",
    //       confirmButtonText: "OK"
    //     });
    //   }

    async onSubmitSave(e) {
        e.preventDefault();
        console.log("in submit save")
        var decoded = jwtDecode(localStorage.getItem("userToken"));
        const saveJobData = {
            applicantId: decoded.id,
            jobId: this.state.jobid,
            company: this.state.company,
            jobTitle: this.state.jobTitle,
            jobCity: this.state.jobCity,
            jobState: this.state.jobState,
            jobFunction: this.state.jobFunction,
            employmentType: this.state.employmentType,
            companyIndustry: this.state.companyIndustry,
            seniorityLevel: this.state.seniorityLevel,
            jobDescription: this.state.jobDescription,
            skills: this.state.skills,
            relevantExperience: this.state.relevantExperience,
            educationLevel: this.state.educationLevel
        }
        const loggingData = this.state.company + "," + this.state.jobTitle
        const adminLodDataSaveJobData = {
            logData: loggingData
        }
        console.log(saveJobData.applicantId)
        console.log(saveJobData.jobId)
        const response = await axios.post('http://localhost:3001/applicant/savejob', saveJobData)
        if (response.status === 200) {
            const response1 = await axios.post('http://localhost:3001/applicant/logDataAdminSaveJobs', adminLodDataSaveJobData)
            swal({
                title: 'Success!',
                text: 'Job Saved',
                type: 'success',
                confirmButtonText: 'OK'
            })

        }
        else if (response.status === 201) {
            swal({
                title: 'Error!',
                text: 'This job is already saved',
                type: 'error',
                confirmButtonText: 'OK'
            })
        }
        else if (response.status === 400) {
            swal({
                title: 'Error!',
                text: 'There was some error, Please try again',
                type: 'error',
                confirmButtonText: 'OK'
            })
        }

    }
    async handleEasyApply(e) {
        e.preventDefault();
        console.log("in submit easy apply application");
        var decoded = jwtDecode(localStorage.getItem("userToken"));
        let resume = null
        if (this.state.resume === "") {
            resume = this.state.profile.resume

        }
        else {
            console.log('something')
            console.log(this.state.resume)
            resume = this.state.resume
        }
        const applicationData = {
            applicantId: decoded.id,
            jobId: this.state.jobid,
            company: this.state.company,
            jobTitle: this.state.jobTitle,
            jobCity: this.state.jobCity,
            seniorityLevel: this.state.seniorityLevel,
            applicantFirstName: this.state.profile.firstName,
            applicantLastName: this.state.profile.lastName,
            applicantMostRecentJobTitle: this.state.profile.mostRecentJobTitle,
            applicationType: "easyApply",
            resume: resume,
            applicantCity: decoded.city
        };
        console.log(applicationData.applicantId);
        console.log(applicationData.jobId);
        const response = await axios.post(
            "http://localhost:3001/applicant/saveEasyApply",
            applicationData
        );
        if (response.status === 200) {
            swal({
                title: "Success!",
                text: "Job Saved",
                type: "success",
                confirmButtonText: "OK"
            });
        } else if (response.status === 201) {
            swal({
                title: "Error!",
                text: "This job is already saved",
                type: "error",
                confirmButtonText: "OK"
            });
        } else if (response.status === 400) {
            swal({
                title: "Error!",
                text: "There was some error, Please try again",
                type: "error",
                confirmButtonText: "OK"
            });
        }
    }
    onChange(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }
    // async onSubmit(e) {
    //   e.preventDefault();
    //   //console.log(this.state.job)
    //   //console.log(this.state.location)
    //   const searchData = {
    //     job: this.state.job,
    //     location: this.state.location
    //   };
    //   await this.props.submitSearch(searchData);
    // }
    componentWillReceiveProps(nextProps) {
        console.log("in compoenent will recieve props");
        console.log(nextProps.search.data);
        this.setState({
            searchResults: nextProps.search.data
        });
    }
    // settingSearchSelection(id, e) {
    //   console.log("in search selection");
    //   console.log(id);
    //   //console.log(this.state.searchResults.length)
    //   var len = this.state.searchResults.length;
    //   for (let i = 0; i < len; i++) {
    //     //console.log(this.state.searchResults[i]._id)
    //     if (this.state.searchResults[i]._id == id) {
    //       console.log(this.state.searchResults[i].company);
    //       this.setState({
    //         jobid: this.state.searchResults[i]._id,
    //         company: this.state.searchResults[i].company,
    //         jobCity: this.state.searchResults[i].jobCity,
    //         jobState: this.state.searchResults[i].jobState,
    //         jobTitle: this.state.searchResults[i].jobTitle,
    //         jobFunction: this.state.searchResults[i].jobFunction,
    //         jobDescription: this.state.searchResults[i].jobDescription,
    //         skills: this.state.searchResults[i].skills,
    //         seniorityLevel: this.state.searchResults[i].seniorityLevel,
    //         companyIndustry: this.state.searchResults[i].companyIndustry,
    //         employmentType: this.state.searchResults[i].employmentType,
    //         educationLevel: this.state.searchResults[i].educationLevel,
    //         relevantExperience: this.state.searchResults[i].relevantExperience,
    //         image: Img
    //       });
    //     }
    //   }
    //   }
    async onSubmit(e) {
        e.preventDefault();
        var decoded = jwtDecode(localStorage.getItem("userToken"));
        //console.log(this.state.job)
        //console.log(this.state.location)
        console.log('applicnat' + decoded.id)

        const searchData = {
            applicantId: decoded.id,
            job: this.state.job,
            location: this.state.location
        }
        await this.props.submitSearch(searchData)
    }

    async settingSearchSelection(id, e) {
        console.log("in search selection")
        console.log(id)
        //console.log(this.state.searchResults.length)
        var len = this.state.searchResults.length;

        for (let i = 0; i < len; i++) {
            //console.log(this.state.searchResults[i]._id)
            if (this.state.searchResults[i]._id == id) {

                console.log(this.state.searchResults[i].company)
                this.setState({
                    jobid: this.state.searchResults[i]._id,
                    company: this.state.searchResults[i].company,
                    jobCity: this.state.searchResults[i].jobCity,
                    jobState: this.state.searchResults[i].jobState,
                    jobTitle: this.state.searchResults[i].jobTitle,
                    jobFunction: this.state.searchResults[i].jobFunction,
                    jobDescription: this.state.searchResults[i].jobDescription,
                    skills: this.state.searchResults[i].skills,
                    seniorityLevel: this.state.searchResults[i].seniorityLevel,
                    companyIndustry: this.state.searchResults[i].companyIndustry,
                    employmentType: this.state.searchResults[i].employmentType,
                    educationLevel: this.state.searchResults[i].educationLevel,
                    relevantExperience: this.state.searchResults[i].relevantExperience,
                    image: this.state.searchResults[i].logo,
                    easyApply: this.state.searchResults[i].easyApply
                })
                const loggingData = {
                    company: this.state.searchResults[i].company
                }
                const logData = this.state.searchResults[i].company + ',' + this.state.searchResults[i].jobTitle
                const response = await axios.post('http://localhost:3001/applicant/logDataAdminJobClicks', loggingData)
                //  const response = await axios.post('http://localhost:3001/applicant/logDataAdminJobTrace', logData)


            }
        }
    }


    render() {
        let companyLogo = null;
        if (this.state.company == "") {
            companyLogo = <div />;
        } else {
            companyLogo = (
                <img
                    src={this.state.image}
                    alt="Avatar"
                    style={{ width: "200px", padding: "10px" }}
                />
            );
        }
        let locationDetails = null;
        if (this.state.company == "") {
            locationDetails = <div />;
        } else {
            locationDetails = (
                <tr>
                    <span class="glyphicon glyphicon-map-marker">
                        <font size="3" color="black">
                            {this.state.jobCity},{this.state.jobState}
                        </font>
                    </span>
                </tr>
            );
        }
        //     )
        // }
        // let locationDetails= null
        // if(this.state.company == "" ){
        //     locationDetails = (
        //     <div></div>
        //     )

        // }
        // else{
        //     locationDetails = (
        //         <tr><span class="glyphicon glyphicon-map-marker"><font size = '3' color="black">{this.state.jobCity},{this.state.jobState}</font></span></tr>

        //     )
        // }

        let jobButtonSet = null
        if (this.state.company == "") {
            jobButtonSet = (
                <div></div>
            )

        }
        else {
            if (this.state.easyApply === "yes") {
                jobButtonSet = (
                    <tr> <td></td><td></td>
                        <td><input tabindex="1" className="job-page-job-save" onClick={this.onSubmitSave} type="submit" value="Save" /></td>
                        {/* <td><a href="/application" class="btn job-page-job-apply link1" role="button">Apply</a></td>*/}
                        <td> <Link to={`/application/${this.state.jobid}`}> Apply</Link></td>
                        <td>
                            <input
                                tabindex="1"
                                className="job-page-job-apply"
                                data-toggle="modal"
                                data-target="#addskill"
                                value="Easy Apply"
                            />{" "}
                        </td>
                    </tr>

                )

            }
            else {
                jobButtonSet = (
                    <tr> <td></td><td></td>
                        <td><input tabindex="1" className="job-page-job-save" onClick={this.onSubmitSave} type="submit" value="Save" /></td>
                        {/*  <td><a href="/application" class="btn job-page-job-apply link1" role="button">Apply</a></td>*/}
                        <td> <Link to={`/application/${this.state.jobid}+${this.state.jobTitle}+${this.state.company}`}> Apply</Link></td>


                    </tr>

                )

            }

        }


        let jobDetails = null;
        if (this.state.company == "") {
            jobDetails = (<table>

            </table>);
        } else {
            jobDetails = (
                <div>
                    <hr />
                    <table>
                        <tr />
                        <tr />
                        <tr>
                            {" "}
                            <strong>Job Description:</strong>
                        </tr>
                        <tr>{this.state.jobDescription}</tr>
                        <hr />
                        <tr>
                            <strong>Skills:</strong>
                        </tr>
                        <tr>{this.state.skills}</tr>
                        <hr />
                        <tr>
                            <strong>Industry:</strong>
                        </tr>
                        <tr>{this.state.companyIndustry}</tr>
                        <hr />
                        <tr>
                            <strong>Employment Type:</strong>
                        </tr>
                        <tr>{this.state.employmentType}</tr>
                        <hr />
                        <tr>
                            <strong>Job Functions:</strong>
                        </tr>
                        <tr>{this.state.jobFunction}</tr>
                        <hr />
                        <tr>
                            <strong>Seniority Level:</strong>
                        </tr>
                        <tr>{this.state.seniorityLevel}</tr>
                        <hr />
                        <tr>
                            <strong>Education And Training:</strong>
                        </tr>
                        <tr>{this.state.educationLevel}</tr>
                        <hr />
                        <tr>
                            <strong>Relevant Work Experience Required:</strong>
                        </tr>
                        <tr>{this.state.relevantExperience} years</tr>
                    </table>
                </div>
            );
        }



        const { current, itemsPerPage } = this.state;
        const indexOfLastPage = current * itemsPerPage;
        const indexOfFirstPage = indexOfLastPage - itemsPerPage;
        const currentTodos = this.state.searchResults.slice(indexOfFirstPage, indexOfLastPage);
        console.log("Number of results : " + this.state.searchResults.length);

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.searchResults.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }

        const showPageNumbers1 = pageNumbers.map(number => {
            return (
                <li
                    class="page-item active"
                    key={number}
                    id={number}
                    onClick={this.clickHandler}
                    className="nums"
                >
                    {number}
                </li>
            );
        });
        var details = currentTodos.map((value, i) => {
            console.log(value.company);
            return (
                <div className="card searchcards">
                    <div className="card-body">
                        <table>
                            <th>
                                <h4>
                                    <button
                                        type="button"
                                        onClick={this.settingSearchSelection.bind(this, value._id)}
                                        class="btn btn-link text-left"
                                    >
                                        {value.jobTitle}
                                    </button>
                                </h4>
                            </th>

                            <tr><h5><strong><font color="black">{value.company}</font></strong></h5></tr>
                            <tr><span class="glyphicon glyphicon-map-marker"><font size='3' color="black">{value.jobCity},{value.jobState}</font></span></tr><br></br>
                            <tr></tr>
                            <tr><strong>Minimum work experience:</strong> {value.relevantExperience}</tr>
                            <tr><strong>Description:</strong> {value.jobDescription}...</tr>
                            <tr><strong>Date Posted:</strong> {value.datePosted.substring(0, 10)}</tr>

                        </table>
                        <div />
                    </div>
                </div>
            );
        });
        return (
            <div >
                <NavbarLinkedin>
                </NavbarLinkedin>
                <div className="navbarlogin-custom1">
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="row" >
                        <form onSubmit={this.onSubmit}>
                            <input type="text" name="job" onChange={this.onChange} value={this.state.job} className="sign-up-input" required placeholder="Search Jobs/Company" />
                            <div className="col-md-1" ></div>&nbsp;&nbsp;&nbsp;
      <div className="col-md-1" ></div>
                            <input type="text" name="location" onChange={this.onChange} value={this.state.location} className="sign-up-input" placeholder="Search location" required />
                            &nbsp;&nbsp;
      <input tabindex="1" className="search-page-search-submit" type="submit" value="Search" />
                        </form>
                    </div>
                    <br></br>
                    <div className="navbarlogin-custom2">
                        <div className="col-md-1" > </div>
                        <div className="col-md-1" ><div className="saved-jobs-display"><strong><Link to="/savedJobs">Saved Jobs</Link></strong></div></div>
                        <div className="col-md-1" ><input onChange={this.onChangeSearch} name="search" value={this.state.search} class="sign-up-input2" type="text" placeholder="Company" aria-label="Search" />
                        </div>
                        <div className="col-md-1" ></div>
                        <div className="col-md-1" ></div>
                        <div className="col-md-1" >
                            <select onChange={this.onChangeExperience} className="login-page-login-input10" name='experienceFilter'>
                                <option value="clear">Seniority Level</option>
                                <option value="Entry Level">Entry Level</option>
                                <option value="Associate">Associate</option>
                                <option value="Mid-Senior Level">Mid-Senior Level</option>
                                <option value="Director">Director</option>
                                <option value="Executive">Executive</option>
                                <option value="Not Applicable">Not Applicable</option>
                            </select>
                        </div>
                        <div className="col-md-1" ></div>
                        <div className="col-md-1" >
                            <select onChange={this.onChangeJobType} className="login-page-login-input10" name='jobTypeFilter'>
                                <option value="clear">Job Type</option>
                                <option value="Full Time">Full Time</option>
                                <option value="Part Time">Part Time</option>
                                <option value="Contract">Contract</option>
                                <option value="Temporary">Temporary</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>
                        <div className="col-md-1" ></div>
                        <div className="col-md-1" >
                            <select onChange={this.onChangeDateFilter} className="login-page-login-input10" name='dateFilter'>
                                <option value="clear">Date Posted</option>
                                <option value="month">This Month</option>
                            </select>
                        </div>
                        <div className="col-md-1" >


                        </div>
                        <div className="col-md-1" >
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>

                    <div className="container">
                        <div className="row" >

                            <div className="col-md-3" >{details} </div>

                            <div className="col-md-3" >
                                <div className="card searchresultscards">
                                    <div className="card-body">
                                        {/* <img src={this.state.image} alt="Avatar" style={{width:'200px', padding: '10px','border-radius': '50%'}}/>*/}
                                        <table cellpadding="1">
                                            <tr>
                                                <td style={{ 'padding-left': '50px' }}>
                                                    {companyLogo}</td>
                                                <td style={{ 'padding-right': '10px' }}> <font size="4"><strong>{this.state.jobTitle}</strong></font>
                                                    <tr><font size="3"><strong>{this.state.company}</strong></font></tr>
                                                    {locationDetails}
                                                </td>
                                            </tr>
                                            {jobButtonSet}

                                        </table>
                                        {jobDetails}
                                    </div></div>
                            </div>
                            <div className="col-md-3" ></div>


                            <div className="col-md-3" ></div>
                            <div className="col-md-3" ></div>
                        </div>
                    </div>
                    <div className="row" >
                        <div className="page">
                            {showPageNumbers1}
                        </div>
                    </div>


                </div>
                <div >

                </div>

                <div
                    className="modal fade add-skill"
                    id="addskill"
                    role="dialog"
                    data-keyboard="false"
                    data-backdrop="static"
                >
                    <div className="modal-dialog ">
                        <form onSubmit={this.handleEasyApply}>
                            <div className="modal-content">
                                <div className="modal-header ">
                                    <h3 className="modal-title ">
                                        Apply to {this.state.company}
                                        <button
                                            type="button"
                                            id="add-skill-close"
                                            className="close"
                                            data-dismiss="modal"
                                            aria-label="Close"
                                        >
                                            <span aria-hidden="false">&times;</span>
                                        </button>
                                        <hr />
                                        <img
                                            className="profileimg"
                                            src={this.state.profile.photo}
                                            alt="avatar"
                                            style={{ width: "100px", padding: "10px" }}
                                        />
                                        <div>
                                            <span class="t-16 t-black t-bold">
                                                {this.state.profile.firstName}{" "}
                                                {this.state.profile.lastName}
                                            </span>
                                            <br />
                                            <span class="t-12 t-black--light t-normal">
                                                {this.state.profile.mostRecentJobTitle}
                                            </span>
                                            <br />
                                            <span class="t-12 t-black--light t-normal">
                                                {this.state.profile.country}
                                            </span>
                                        </div>
                                        <div>
                                            <label>Email</label>
                                            <br />
                                            <input
                                                className="profileinput"
                                                name="email"
                                                placeholder="Ex:Microsoft"
                                                type="text"
                                                value={this.state.profile.email}
                                            // onChange={this.postexpcompanyChangeHandler}
                                            />
                                        </div>
                                    </h3>
                                    <label>Resume</label>

                                    <div>
                                        <span style={{ border: "2px", padding: "1px" }}> {this.state.profile.resume}</span>
                                        <input
                                            type="file"
                                            name="resume"
                                            id="file-input"
                                            onChange={this.onUploadResume}
                                        />
                                    </div>

                                </div>
                                <hr />
                                <div className="modalfooter">
                                    <div className="row">
                                        <div className="col-md-11">
                                            <button type="submit" className="modalSave">
                                                Submit Application
 </button>
                                        </div>
                                    </div>
                                </div>
                                <br />
                            </div>

                        </form>

                    </div>
                </div>




            </div>
        )
    }
}
const mapStateToProps = state => ({
    search: state.search.jobSearch
});
export default connect(
    mapStateToProps,
    { submitSearch }
)(JobSearch);
