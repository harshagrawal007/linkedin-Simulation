import React, { Component } from "react";
import { connect } from "react-redux";
import NavbarLinkedin from "../Navbar/Navbar";
import "../../css/JobSearch.css";
import { recruiterSearch } from "../../actions/recruiterSearchAction";
import Img from "./default.jpg";
import axios from "axios";
import swal from "sweetalert2";
import { Link } from "react-router-dom";

var jwtDecode = require("jwt-decode");

class JobPostings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateFlag: false,
      job: "",
      location: "",
      searchResults: [],
      selectedSearch: [],
      current: 1,
      itemsPerPage: 10,
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
      relevantExperience: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitSave = this.onSubmitSave.bind(this);
  }

  componentDidMount() {
    console.log("in component did mount");
  }

  selectRegion(val) {
    this.setState({ jobState: val });
  }
  async onSubmitSave(e) {
    e.preventDefault();
    console.log("in submit save");
    var decoded = jwtDecode(localStorage.getItem("userToken"));
    const saveJobData = {
      recruiterId: decoded.id,
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
    };
    console.log(saveJobData.applicantId);
    console.log(saveJobData.jobId);
    const response = await axios.put(
      "http://localhost:3001/recruiter/searchJobPosting",
      saveJobData
    );
    if (response.status === 200) {
      swal({
        title: "Success!",
        text: "Job Saved",
        type: "success",
        confirmButtonText: "OK"
      });
      this.onSubmit(e);
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
  async onSubmit(e) {
    e.preventDefault();
    var decoded = jwtDecode(localStorage.getItem("userToken"));

    //console.log(this.state.job)
    //console.log(this.state.location)
    const searchData = {
      recruiterId: decoded.id,
      job: this.state.job,
      location: this.state.location
    };
    await this.props.recruiterSearch(searchData);
  }
  componentWillReceiveProps(nextProps) {
    console.log("in compoenent will recieve props");
    console.log(nextProps.search.data);
    this.setState({
      searchResults: nextProps.search.data
    });
  }
  settingSearchSelection(id, e) {
    console.log("in search selection");
    console.log(id);
    //console.log(this.state.searchResults.length)
    var len = this.state.searchResults.length;
    for (let i = 0; i < len; i++) {
      //console.log(this.state.searchResults[i]._id)
      if (this.state.searchResults[i]._id == id) {
        console.log(this.state.searchResults[i].company);
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
          image: this.state.searchResults[i].logo
        });
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

    let jobButtonSet = null;
    if (this.state.company == "") {
      jobButtonSet = <div />;
    } else {
      var link = "/applications/:" + this.state.jobid;
      jobButtonSet = (
        <div>
          {" "}
          <td />
          <td style={{ "padding-left": "290%" }}>
            <a style={{ display: "table-cell" }} href={link} target="_blank">
              {" "}
              <input
                className="job-page-job-save"
                type="submit"
                value="Applicants"
              />
            </a>
          </td>
          <td style={{ "padding-left": "295%" }}>
            <input
              tabindex="1"
              onClick={this.onSubmitSave}
              className="job-page-job-apply"
              type="submit"
              value="Update"
            />
          </td>
        </div>
      );
    }

    let jobDetails = null;
    if (this.state.company == "") {
      jobDetails = <table />;
    } else {
      jobDetails = (
        <div style={{ "padding-left": "7%" }}>
          <hr />
          <table>
            <tr />
            <tr />

            <tr>
              {" "}
              <strong>Job Title:</strong>
            </tr>
            <tr>
              <textarea
                maxlength="200"
                type="text"
                required="required"
                class="form-control"
                name="jobTitle"
                value={this.state.jobTitle}
                onChange={this.onChange}
                placeholder="Job Title"
              />
            </tr>
            <hr />

            <tr>
              {" "}
              <strong>Company:</strong>
            </tr>
            <tr>
              <textarea
                maxlength="200"
                type="text"
                required="required"
                class="form-control"
                name="company"
                value={this.state.company}
                onChange={this.onChange}
                placeholder="Company"
              />
            </tr>
            <hr />
            <tr>
              {" "}
              <strong>Job Description:</strong>
            </tr>
            <tr>
              <textarea
                maxlength="200"
                type="text"
                required="required"
                class="form-control"
                name="jobDescription"
                value={this.state.jobDescription}
                onChange={this.onChange}
                placeholder="Description"
              />
            </tr>
            <hr />

            <tr>
              <strong>Skills:</strong>
            </tr>
            <tr>
              {" "}
              <textarea
                maxlength="200"
                type="text"
                required="required"
                class="form-control"
                name="skills"
                value={this.state.skills}
                onChange={this.onChange}
                placeholder="Skills"
              />
            </tr>
            <hr />
            <tr>
              <strong>Industry:</strong>
            </tr>
            <tr>
              <input
                maxlength="200"
                type="text"
                required="required"
                class="form-control"
                name="companyIndustry"
                value={this.state.companyIndustry}
                onChange={this.onChange}
                placeholder="Industry"
              />
            </tr>
            <hr />
            <tr>
              <strong>Employment Type:</strong>
            </tr>
            <tr>
              {" "}
              <select
                class="form-control"
                name="employmentType"
                value={this.state.employmentType}
                onChange={this.onChange}
              >
                <option value="">Choose one...</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
                <option value="Temporary">Temporary</option>
                <option value="Internship">Internship</option>
              </select>
            </tr>
            <hr />
            <tr>
              <strong>Job Functions:</strong>
            </tr>
            <tr>
              <input
                maxlength="200"
                type="text"
                required="required"
                class="form-control"
                name="jobFunction"
                value={this.state.jobFunction}
                onChange={this.onChange}
                placeholder="Job Function"
              />
            </tr>
            <hr />
            <tr>
              <strong>Seniority Level:</strong>
            </tr>
            <tr>
              <select
                class="form-control"
                required="required"
                name="seniorityLevel"
                value={this.state.seniorityLevel}
                onChange={this.onChange}
              >
                <option value="">Choose one...</option>
                <option value="Entry Level">Entry Level</option>
                <option value="Associate">Associate</option>
                <option value="Mid-Senior Level">Mid-Senior Level</option>
                <option value="Director">Director</option>
                <option value="Executive">Executive</option>
                <option value="Not Applicable">Not Applicable</option>
              </select>
            </tr>
            <hr />
            <tr>
              <strong>Education And Training:</strong>
            </tr>
            <tr>
              {" "}
              <textarea
                maxlength="200"
                type="text"
                required="required"
                class="form-control"
                name="educationLevel"
                value={this.state.educationLevel}
                onChange={this.onChange}
                placeholder="Education"
              />
            </tr>
            <hr />
            <tr>
              <strong>Relevant Work Experience Required:</strong>
            </tr>
            <tr>
              <input
                type="text"
                required="required"
                class="form-control"
                name="relevantExperience"
                value={this.state.relevantExperience}
                onChange={this.onChange}
                placeholder="years"
              />
            </tr>
          </table>
        </div>
      );
    }

    const { current, itemsPerPage } = this.state;
    const indexOfLastPage = current * itemsPerPage;
    const indexOfFirstPage = indexOfLastPage - itemsPerPage;
    const currentTodos = this.state.searchResults.slice(
      indexOfFirstPage,
      indexOfLastPage
    );
    console.log("Number of results : " + this.state.searchResults.length);
    console.log("current todos" + currentTodos);

    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(this.state.searchResults.length / itemsPerPage);
      i++
    ) {
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

              <tr>
                <h5>
                  <strong>
                    <font color="black">{value.company}</font>
                  </strong>
                </h5>
              </tr>
              <tr>
                <span class="glyphicon glyphicon-map-marker">
                  <font size="3" color="black">
                    {value.jobCity},{value.jobState}
                  </font>
                </span>
              </tr>
              <br />
              <tr />
              <tr>
                <strong>Minimum work experience :</strong>{" "}
                {value.relevantExperience}
              </tr>
              <tr>
                <strong>Description:</strong> {value.jobDescription}...
              </tr>
            </table>
            <div />
          </div>
        </div>
      );
    });
    return (
      <div>
        <NavbarLinkedin />
        <div className="navbarlogin-custom1">
          <br />
          <br />
          <br />
          <br />
          <div className="row">
            <form onSubmit={this.onSubmit}>
              <input
                type="text"
                name="job"
                onChange={this.onChange}
                value={this.state.job}
                className="sign-up-input"
                required
                placeholder="Search jobs"
              />
              <div className="col-md-1" />
              &nbsp;&nbsp;&nbsp;
              <div className="col-md-1" />
              <input
                type="text"
                name="location"
                onChange={this.onChange}
                value={this.state.location}
                className="sign-up-input"
                placeholder="Search location"
                required
              />
              &nbsp;&nbsp;
              <input
                tabindex="1"
                className="search-page-search-submit"
                type="submit"
                value="Search"
              />
            </form>
          </div>
          <br />
          <br />
          <br />

          <div className="container">
            <div className="row">
              <div className="col-md-3">{details} </div>

              <div className="col-md-3">
                <div className="card searchresultscards">
                  <div className="card-body">
                    {/* <img src={this.state.image} alt="Avatar" style={{width:'200px', padding: '10px','border-radius': '50%'}}/>*/}
                    <table cellpadding="1">
                      <tr>
                        <td style={{ "padding-left": "50px" }}>
                          {companyLogo}
                        </td>
                        <td style={{ "padding-right": "10px" }}>
                          {" "}
                          <font size="4">
                            <strong>{this.state.jobTitle}</strong>
                          </font>
                          <tr>
                            <font size="3">
                              <strong>{this.state.company}</strong>
                            </font>
                          </tr>
                          {locationDetails}
                        </td>
                      </tr>
                      {jobButtonSet}
                    </table>
                    {jobDetails}
                  </div>
                </div>
              </div>
              <div className="col-md-3" />

              <div className="col-md-3" />
              <div className="col-md-3" />
            </div>
          </div>
        </div>
        <div />
        {/* <div className="row" >
            <div className ="page">
            {showPageNumbers1}
            </div>
        </div>*/}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  search: state.search.jobSearch
});
export default connect(
  mapStateToProps,
  { recruiterSearch }
)(JobPostings);
