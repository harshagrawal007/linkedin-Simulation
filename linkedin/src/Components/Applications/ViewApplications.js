import React, { Component } from "react";
import { connect } from "react-redux";
import NavbarLinkedin from "../Navbar/Navbar";
import "../../css/JobSearch.css";
import { recruiterSearch } from "../../actions/recruiterSearchAction";
import axios from "axios";
import swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

class ViewApplications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applicationList: [],
      numPages: null,
      resume: "",
      pageNumber: 1
    };
    this.setresume = this.setresume.bind(this);
  }
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };
  setresume(e) {
    console.log("resume");
    console.log(e.target.value);
    this.setState({ ...(this.state.resume = e.target.value) });
  }
  async componentDidMount() {
    const { jobid } = this.props.match.params;
    if (jobid != "") {
      const link = "http://localhost:3001/recruiter/applicationList/" + jobid;
      const response = await axios.get(link);

      if (response.status === 200) {
        console.log("Profile loaded!");
        console.log(response.data);
        this.setState({
          applicationList: response.data
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
    } else {
      swal({
        title: "Error!",
        text: "There was some error, Please try again",
        type: "error",
        confirmButtonText: "OK"
      });
    }
  }

  render() {
    const { pageNumber, numPages } = this.state;
    let details = this.state.applicationList.map(application => {
      //console.log(application);
      console.log(application.resume);
      var link = "/owner/property/:" + application._id;
      return (
        <div class="card-body">
          <ul class="list-unstyled">
            <li class="media">
              <div class="media-body">
                <a href='#'>
                  <h5 class="mt-0 mb-1 font-weight-bold">
                    {application.applicantFirstName}{" "}
                    {application.applicantLastName}
                  </h5>
                </a>

                {/* {"Gender: "}
                {application.gender} */}
                <br />
                {"Applied On: "}
                {application.dateApplied.substring(0, 10)}
                <div style={{ "padding-left": "75%" }}>
                  <button
                    type="submit"
                    className="job-page-job-save resume"
                    data-toggle="modal"
                    data-target="#showResume"
                    aria-hidden="true"
                    name="Resume"
                    value={application.resume}
                    onClick={this.setresume}
                  >
                    Resume
                  </button>
                </div>
              </div>
            </li>
          </ul>
          <hr />
          <div
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
                    file={this.state.resume}
                    onLoadSuccess={this.onDocumentLoadSuccess}
                  >
                    <Page pageNumber={pageNumber} />
                  </Document>
                  <p>
                    Page {pageNumber} of {numPages}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });

    let heading = (
      <strong style={{ "font-size": "1.5em" }}>
        Below are the applicants that applied for this Job
      </strong>
    );

    return (
      <div class="container">
        <NavbarLinkedin />
        <br />
        <br />
        <br />
        <br />
        {heading}
        <hr />
        <br />
        <br />
        <div>{details}</div>
      </div>
    );
  }
}

export default ViewApplications;
