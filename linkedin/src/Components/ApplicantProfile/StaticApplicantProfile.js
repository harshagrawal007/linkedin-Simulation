import React, { Component } from "react";
import axios from "axios";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import { Redirect } from "react-router-dom";
import moment from "moment";
import NavbarLinkedin from "../Navbar/Navbar";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;
class StaticApplicantProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      skill: [],
      education: [],
      experience: [],
      numPages: null,
      pageNumber: 1
    };
  }
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  componentDidMount() {
    // let id="5bfa3a22c38a04112c2a546e";
    console.log("IN COMPONENT DID MOUNT");
    var id = this.props.history.location.pathname.substring(24);
    //console.log("currentemail" + this.state.currentemail)
    // this.props.getProfileData(this.state.currentemail)
    // console.log("this.props.getProfile"+this.props.getProfile)
    //axios.get(`http://localhost:3001/profile/${this.state.currentemail}`)
    axios
      .get(`http://localhost:3001/applicant/staticprofile/${id}`)
      .then(response => {
        console.log("response.data" + JSON.stringify(response.data));
        this.setState({
          profile: response.data
          // profile: this.props.getProfile
        });

        console.log("profile [0]   " + this.state.profile.firstName);
        this.setState({
          skill: this.state.profile.skill,
          education: this.state.profile.education,
          experience: this.state.profile.experience
        });
        console.log(this.state);
      });
  }
  render() {
    let redirectVar = null;
    if (!localStorage.getItem("userToken")) {
      redirectVar = <Redirect to="/home" />;
    }
    const { pageNumber, numPages } = this.state;
    let loopedu = this.state.education.map((edu, i) => {
      return (
        <li key={i}>
          <div>
            <h3>{edu.school}</h3>
            <div>
              <h4>
                <span className="inside">{edu.degree}</span>{" "}
                <span>{edu.fieldOfStudy}</span>
              </h4>
            </div>
            <h4>
              <span className="inside" />{" "}
              <span>
                {moment(edu.dateFrom).format()} – {moment(edu.dateTo).format()}
              </span>
            </h4>
            <h4>
              <span className="inside" /> <span>{edu.activity}</span>
            </h4>
            <h4>
              <span className="inside" /> <span>{edu.description}</span>
            </h4>
          </div>
        </li>
      );
    });
    let loopexp = this.state.experience.map((exp, i) => {
      return (
        <li key={i}>
          <div>
            <h3>{exp.title}</h3>
            <h4>
              <span className="inside" /> <span>{exp.company}</span>
            </h4>
            <div>
              <h4>
                <span className="inside" />{" "}
                <span> {moment(exp.dateFrom).format("YYYY-MM-DD")}</span>
              </h4>{" "}
              <div>
                <h4>
                  <span className="inside" />{" "}
                  <span>{moment(exp.dateTo).format("YYYY-MM-DD")}</span>
                </h4>
              </div>
            </div>

            <h4>
              <span className="inside" />{" "}
              <span>
                {exp.city},{exp.state}
              </span>
            </h4>

            <h4>
              <span className="inside" /> <span>{exp.headline}</span>
            </h4>
            <h4>
              <span className="inside" /> <span>{exp.description}</span>
            </h4>
          </div>
        </li>
      );
    });
    let loopskill = this.state.skill.map((ski, i) => {
      return (
        <li key={i}>
          <div>
            <h3>{ski}</h3>
          </div>
        </li>
      );
    });
    return (
      <div>
        <NavbarLinkedin/>
        {redirectVar}
        <div className="profile-container">
          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-7">
              <section className="mycard">
                <div className="headerimage" />
                <div>
                  <div>
                    <img
                      className="profileimg"
                      src={this.state.profile.photo}
                      alt="avatar"
                      style={{ width: "200px", padding: "10px" }}
                    />
                    <span />
                  </div>
                </div>
                <div className="userinfo">
                  <div>
                    <h2>
                      {this.state.profile.firstName}{" "}
                      {this.state.profile.lastName}
                    </h2>
                  </div>
                  <h3>{this.state.profile.headline}</h3>
                  <h4>
                    {this.state.profile.city},{this.state.profile.state}
                  </h4>
                  <div />
                  <div>
                    <p>
                      <span>{this.state.profile.profileSummary}</span>
                      <span>...</span>
                    </p>
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
                </div>

                <div />
              </section>

              <br />

              <section className="mycard">
                <header className="applicantheader">
                  <h2>Experience</h2>
                </header>
                <ul className="myul">{loopexp}</ul>
              </section>

              <section className="mycard">
                <header className="applicantheader">
                  <h2>Education</h2>
                </header>
                <ul className="myul">{loopedu}</ul>
              </section>
              <br />
              <section className="mycard" id="section-skills">
                <header className="applicantheader" id="skill-header">
                  <h2>Skills</h2>
                </header>
                <ul className="myul">{loopskill}</ul>
              </section>
            </div>
            <div className="col-md-3" />
          </div>
        </div>
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
                  file={this.state.profile.resume}
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
  }
}
export default StaticApplicantProfile;
