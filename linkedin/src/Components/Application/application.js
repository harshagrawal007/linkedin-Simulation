import React, { Component } from "react";
import "../PostJob/postJob.css";
import "../PostJob/jobDetails.css";
import "../../css/application.css";
import NavbarJobPost from "../Navbar/jobNavbar";
import axios from "axios";
import swal from "sweetalert2";

import { postJob } from "../../actions/jobActions";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData
} from "react-country-region-selector";
import { connect } from "react-redux";
import { Document, Page } from "react-pdf";
import  url from "./test.pdf";
import { pdfjs } from "react-pdf";
import { Link } from "react-router-dom";
var jwtDecode = require("jwt-decode");
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;


//create the Owner Login Component
class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      address : "",
      jobId:"",
      gender: "",
      applicantFirstName: "",
      applicantLastName: "",
      resume: "",
      coverLetter : "",
      numPages: null,
      pageNumber: 1,
      disabilityStatus: "",
      sponsorShip: "",
      diversity: "",
      howDidYouHearAboutUs : ""
    };

    this.onChange = this.onChange.bind(this);
    
    this.onUploadResume=this.onUploadResume.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleapplication = this.handleapplication.bind(this);
    this.onUploadCoverLetter = this.onUploadCoverLetter.bind(this);
    this.onFocus = this.onFocus.bind(this);
    
  }
  async onFocus(e){
    var split =this.props.history.location.pathname.split("/");
    var split1 = split[2].split('+')
    var logData = split1[1]+','+split1[2]
    console.log(logData)
    const response = await axios.post(`http://localhost:3001/applicant/logDataAdminJobTrace`, {logData : logData, type: "half"});

  }
  async handleapplication(e) {
    e.preventDefault();
    console.log("in submit application");
    var decoded = jwtDecode(localStorage.getItem("userToken"));
   // var split =this.props.history.location.pathname.split("/");
    var split =this.props.history.location.pathname.split("/");
    var split1 = split[2].split('+')
    console.log("split values"+split);
    var logData = split1[1]+','+split1[2]
    console.log(logData)
    const response1 = await axios.post(`http://localhost:3001/applicant/logDataAdminJobTrace`, {logData : logData, type: "full"});
    const applicationData = {
      applicantId: decoded.id,
      jobId: split1[0],
      resume:this.state.resume,
      coverLetter:this.state.coverLetter,
      address: this.state.address,
      howDidYouHearAboutUs: this.state.howDidYouHearAboutUs,
      applicantFirstName: this.state.applicantFirstName,
      applicantLastName: this.state.applicantLastName,
      gender: this.state.gender,
      sponsorship : this.state.sponsorship,
      diversity :this.state.diversity,
      disabilityStatus:this.state.disabilityStatus,
      applicationType: "Application"
    };
    console.log(applicationData.applicantId);
    console.log(applicationData.jobId);
    console.log(applicationData)
    const response = await axios.post(
      "http://localhost:3001/applicant/application",
      applicationData
    );
    if (response.status === 200) {
      swal({
        title: "Job Applied!",
        text: "You will hear back from us soon",
        type: "success",
        confirmButtonText: "OK"
      });
      this.props.history.push('/jobsearch')
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
    this.setState({ [e.target.name]: e.target.value });
  }
  onButtonClick(e) {
    this.setState({ click: e.target.value });
  }
  
  handleOptionChange(e) {
    this.setState({
      selectedOption: e.target.value
    });
  }
  selectCountry(val) {
    this.setState({ country: val });
  }

  selectRegion(val) {
    this.setState({ jobState: val });
  }
  async componentDidMount(){
    var split =this.props.history.location.pathname.split("/");
    var split1 = split[2].split('+')
    var logData = split1[1]+','+split1[2]
    console.log(logData)
    const response = await axios.post(`http://localhost:3001/applicant/logDataAdminJobTrace`, {logData : logData, type: "view"});

  

    

  }
  
  async onUploadResume(e) {
    e.preventDefault();
    console.log("in upload resume");
    console.log("Selected file:", e.target.files[0]);
    let file = new FormData();
    file.append("file", e.target.files[0]);
    //let file = e.target.files[0];
    console.log("uploading profile resume...");
    //formData.append('profileimage', file);
    const response = await axios.post(
      `http://localhost:3001/applicant/resumeApplication`,
      file
    );
    console.log("RESUME" + response.data)
    swal({
      title: "Success!",
      text: "Job Saved",
      type: "success",
      confirmButtonText: "OK"
    });
    if (response.status === 200) {
      console.log(response);
      // console.log(" resume location "+ response.data);
      // console.log(" resume location "+ response.data.location.value);
      // console.log(" resume location "+ response.data.location);

      this.setState({
        resume:response.data
      });
      console.log("resume in state"+ this.state.resume);
      
      swal({
        title: "Success!",
        text: "pdf Saved",
        type: "success",
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
    //window.location.reload();

  }

  async onUploadCoverLetter(e) {
    e.preventDefault();
    console.log("in upload resume");
    console.log("Selected file:", e.target.files[0]);
    let file = new FormData();
    file.append("file", e.target.files[0]);
    //let file = e.target.files[0];
    console.log("uploading profile resume...");
    //formData.append('profileimage', file);
    const response = await axios.post(
      `http://localhost:3001/applicant/resumeApplication`,
      file
    );
    swal({
      title: "Success!",
      text: "Job Saved",
      type: "success",
      confirmButtonText: "OK"
    });
    if (response.status === 200) {
      console.log(response);
      // console.log(" resume location "+ response.data);
      // console.log(" resume location "+ response.data.location.value);
      // console.log(" resume location "+ response.data.location);

      this.setState({
        coverLetter:response.data
      });
      console.log("resume in state"+ this.state.coverLetter);
      
      swal({
        title: "Success!",
        text: "pdf Saved",
        type: "success",
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
    //window.location.reload();

  }

  // onDocumentLoadSuccess = ({ numPages }) => {
  //   this.setState({ numPages });
  //   console.log("loaded" + this.state.numpages);
  // };
  render() {
    // const { pageNumber, numPages } = this.state;
    const { country, jobState } = this.state;

    return (
      <div>
        <div class="container postContainer1">
          {/* <br /><br />
          <div class="row">
            <div class="col-sm-6 col-md-6 col-md-offset-3">
              <div class="col-md-12">
                <div class="stepwizard">
                  <div class="stepwizard-row setup-panel">
                    <div class="stepwizard-step">
                      <a href="#step-1" type="button" class="btn btn-primary btn-circle">1</a>
                    </div>
                    <div class="stepwizard-step">
                      <a href="#step-2" type="button" class="btn btn-default btn-circle" disabled="disabled">2</a>

                    </div>
                    <div class="stepwizard-step">
                      <a href="#step-3" type="button" class="btn btn-default btn-circle" disabled="disabled">3</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <br />
          <form onSubmit={this.handleapplication}>
            <div class="row">
              <div class="row form2">
                <div class="col-md-6">
                  <div class="form2">
                    <div class="section-form2">
                      <h3> Job Application</h3>
                      <div class="row">
                        <div class="col-md-4">
                          <div class="form-group">
                            <label class="control-label">First Name *</label>
                            <input
                              maxlength="200"
                              type="text"
                              required="required"
                              name="applicantFirstName"
                              value={this.state.applicantFirstName}
                              onFocus={ this.onFocus } 
                              onBlur={ this.onBlur } 
                              onChange={this.onChange}
                              class="form-control"
                              placeholder="First Name"
                           required />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label class="control-label">Last Name *</label>
                            <input
                              maxlength="200"
                              type="text"
                              required="required"
                              name="applicantLastName"
                              value={this.state.applicantLastName}
                              onChange={this.onChange}
                              class="form-control"
                              placeholder="Last Name"
                              required/>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label class="control-label">
                            Address
                          </label>
                          <textarea
                            maxlength="100"
                            type="text"
                            
                            class="form-control"
                            name="address"
                            value={this.state.address}
                            onChange={this.onChange}
                            placeholder="Address"
                          />
                        </div>
                      </div>
                    </div>
                      <div class="row">
                      <div class="col-md-8">
                      <div class="form-group">
                        <label class="control-label">Ethnicity*</label>
                        <select
                          class="form-control"
                          name="diversity"
                          value={this.state.diversity}
                          onChange={this.onChange}
                          required>
                          <option value="">Select..</option>
                          <option value="Decline">I don't wish to answer</option>
                          <option value="White">White (Not of Hispanic Origin)</option>
                          <option value="Black">Black or African American (Not of Hispanic Origin)</option>
                          <option value="Hispanic">Hispanic or Latino</option>
                          <option value="Asian">Asian (Not of Hispanic Origin)</option>
                          <option value="PacificIslander">Pacific Islander (Not of Hispanic Origin)</option>
                          <option value="AmericanIndian">American Indian (Not of Hispanic Origin)</option>
                          <option value="NativeAlaskan">Native Alaskan (Not of Hispanic Origin)</option>
                        </select>
                      </div>
                    </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label class="control-label">
                              Disability Status *
                            </label>
                            <select
                              class="form-control"
                              name="disabilityStatus"
                              value={this.state.disabilityStatus}
                              onChange={this.onChange}
                              required >
                              <option value="">Select..</option>
                              <option value="yes">
                                Yes, I have a disability(or previously had a
                                disability)
                              </option>
                              <option value="No">
                                No, I don't have a disability
                              </option>
                              <option value="Decline">
                                Decline to self identify
                              </option>
                            </select>
                          </div>
                        </div>
                        </div>
                        <div className="row">
                          <div class="col-md-8">
                            <div class="form-group">
                              <label class="control-label">How did you hear about us?</label>
                              <select
                                class="form-control"
                                name="howDidYouHearAboutUs"
                                value={this.state.howDidYouHearAboutUs}
                                onChange={this.onChange}
                              >
                                <option value="">Select..</option>
                                <option value="CompanyWebsite">Companyy Website</option>
                                <option value="JobBoard">Job Board</option>
                                <option value="Email">Email</option>
                                <option value="Event">Event</option>
                                <option value="SocialNetwork">Social Network</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          
                          <div class="col-md-4">
                            <div class="form-group">
                              <label class="control-label">
                                Gender *
                              </label>
                              <select
                                class="form-control"
                                required="required"
                                name="gender"
                                value={this.state.gender}
                                onChange={this.onChange}
                                required>
                                <option value="">Choose one...</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Decline">
                                 I do not wish to answer
                                </option>
                                
                              </select>
                            </div>
                          </div>
                        </div>
                    
                        <div class="row">
                          <label class="control-label">
                            &nbsp;&nbsp;&nbsp;&nbsp;Do you require sponsorship? *
                          </label>
                        </div>
                        <div class="row">
                          <div class="col-md-12">
                            <div class="form-group">
                            
                            <select
                            class="form-control"
                            required="required"
                            name="sponsorShip"
                            value={this.state.sponsorShip}
                            onChange={this.onChange}
                            required>
                            <option value="">Choose one...</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                            
                            
                          </select>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p>
                            <span
                              className="resume"
                              data-toggle="modal"
                              data-target="#showResume"
                              aria-hidden="true"
                            >
                              Resume
                            </span>
                          </p>
                        </div>

                        <div>
                          <span style={{ border: "2px", padding: "1px" }}>
                            {" "}
                            {this.state.resume}
                          </span>
                          <input
                            type="file"
                            name="resume"
                            id="file-input"
                            onChange={this.onUploadResume}
                            required />
                        </div>
                        <div>
                          <p>
                            <span
                              className="resume"
                              data-toggle="modal"
                              data-target="#showResume"
                              aria-hidden="true"
                            >
                              Cover Letter (Optional)
                            </span>
                          </p>
                        </div>

                        <div>
                          <span style={{ border: "2px", padding: "1px" }}>
                            {" "}
                            {this.state.coverLetter}
                          </span>
                          <input
                            type="file"
                            name="coverLetter"
                            id="file-input"
                            onChange={this.onUploadCoverLetter}
                          />
                        </div>
                        <button
                          class="btn btn-primary nextBtn btn-lg "
                          type="Submit"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* <div class="col-md-6">
                  <div class="sidebar">

                    <span class="glyphicon glyphicon-dashboard glyphiconJob"></span>
                    <p>
                      <span class="fontBold">Show your job to the right candidates</span><br />
                      Include more details such as relevant job functions,<br /> industries, and seniority level to help us advertise your <br />
                      job post to qualified candidates and recommend <br />matches for you to reach out to.
                  </p>  </div>
                </div> */}
                </div>
              </div>
            
          </form>
        </div>

        {/* <div
          className="modal fade add-skill"
          id="showResume"
          role="dialog"
          data-keyboard="false"
        >
          <div className="modal-dialog  ">
            <div className="modal-content">
              <div className="modal-header ">
                <h3 className="modal-title ">
                  Resume
                  <button
                    type="button"
                    id="add-skill-close"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="false">&times;</span>
                  </button>
                </h3>
              </div>

              <div className="modal-body">
                <Document
                  // file={this.state.profile.resume}
                  file={url}
                  onLoadSuccess={this.onDocumentLoadSuccess}
                >
                  <Page pageNumber={pageNumber} />
                </Document>

                <p>
                  Page {pageNumber} of {numPages}
                </p>
                <button
                  onClick={() =>
                    this.setState(prevState => ({
                      pageNumber: prevState.pageNumber + 1
                    }))
                  }
                >
                  Next page
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}
// export default PostJob;
export default connect(
  null,
  { postJob }
)(Application);
