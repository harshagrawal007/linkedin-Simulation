import React, { Component } from 'react';
import './postJob.css';
import './jobDetails.css';
import NavbarJobPost from "../Navbar/jobNavbar";
import axios from 'axios';
import { postJob } from "../../actions/jobActions";
import { connect } from "react-redux";
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

//create the Owner Login Component
class PostJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: '',
      jobTitle: '',
      jobCity: '',
      jobState: '',
      jobFunction: '',
      employmentType: '',
      companyIndustry: '',
      seniorityLevel: '',
      jobDescription: '',
      selectedOption: '',
      emailNotify: '',
      externalSite: '',
      skills: '',
      hearAboutUs: '',
      relevantExperience: '',
      educationLevel: '',
      country: '', region: '',
      logo : "https://s3.us-east-2.amazonaws.com/user-images-linkedin2/logo+image.jpeg",
      easyApply : '',
      click: [],
      country: '', region: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.onChangePhoto = this.onChangePhoto.bind(this);

  }
  async onChangePhoto(e){
    e.preventDefault();
    console.log("in on change")
    console.log('Selected file:', e.target.files[0]);
    let file = new FormData();
    file.append("file", e.target.files[0]);
    //let file = e.target.files[0];
    console.log("uploading profile photo...");
    //formData.append('profileimage', file);
    const result = await axios.post(`http://localhost:3001/applicant/logoimage/`, file) 
    console.log(result.data)
     this.setState({
       logo : result.data
     })

}
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onButtonClick(e) {
    this.setState({ click:  e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      jobTitle: this.state.jobTitle,
      company: this.state.company,
      jobCity: this.state.jobCity,
      jobState: this.state.jobState,
      jobFunction: this.state.jobFunction,
      employmentType: this.state.employmentType,
      companyIndustry: this.state.companyIndustry,
      seniorityLevel: this.state.seniorityLevel,
      jobDescription: this.state.jobDescription,
      selectedOption: this.state.selectedOption,
      emailNotify: this.state.emailNotify,
      externalSite: this.state.externalSite,
      skills: this.state.skills,
      hearAboutUs: this.state.hearAboutUs,
      relevantExperience: this.state.relevantExperience,
      educationLevel: this.state.educationLevel,
      logo : this.state.logo,
      easyApply : this.state.easyApply,
      click: this.state.click
    };
    console.log(profileData);
    this.props.postJob(profileData, this.props.history);
  }

  handleOptionChange(e) {
    this.setState({
      selectedOption: e.target.value
    });
  }
  selectCountry (val) {
    this.setState({ country: val });
  }

  selectRegion (val) {
    this.setState({ jobState: val });
  }
  render() {
    const { country, jobState } = this.state;

    return (
      <div>
        <NavbarJobPost />
        <br /><br />
        <br />
        <br />
        <div class="container postContainer1">
          <br /><br />
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
          </div>
          <br />
          <form onSubmit={this.onSubmit}>

            <div class="row setup-content" id="step-1">
              <header>
                <h1> Reach the quality candidates you can’t find anywhere else.</h1><br /><br />
              </header>
              <div class="form1">
                <div class="form-group">
                  <input type="text" required="required" class="form-control" name="company" value={this.state.company} onChange={this.onChange} placeholder="Company" />
                </div>
                <div class="form-group">
                  <input type="text" required="required" class="form-control" name="jobTitle" value={this.state.jobTitle} onChange={this.onChange} placeholder="Job Title" />
                </div>
                <div class="form-group">
                  <input type="text" required="required" class="form-control" name="jobCity" value={this.state.jobCity} onChange={this.onChange} placeholder="Job City" />
                </div>
                <div class="form-group">
                {/*<input type="text" required="required" class="form-control" name="jobState" value={this.state.jobState} onChange={this.onChange} placeholder="Job State" />*/}
                <CountryDropdown class="form-control"
                value={country}
                onChange={(val) => this.selectCountry(val)}/>
                </div>
                <div class="form-group">
              <RegionDropdown class="form-control"
                country={country}
                value={jobState}
                onChange={(val) => this.selectRegion(val)} />
              </div>
                <button class="btn btn-primary nextBtn btn-lg btn-block" type="button" >Start Job Post</button>
                {/* </div>
            </div> */}
              </div>
            </div>
            <div class="row setup-content" id="step-2">
              <div class="row form2">
                <div class="col-md-6">
                  <div class="form2">
                    <div class="section-form2">
                      <h3> Step 1: What job do you want to post?</h3>
                      <div class="row">
                        <div class="col-md-4">
                          <div class="form-group">
                            <label class="control-label">Company *</label>
                            <input maxlength="200" type="text" required="required" name="company" value={this.state.company} onChange={this.onChange} class="form-control" placeholder="Company" />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label class="control-label">Job Title *</label>
                            <input maxlength="200" type="text" required="required" name="jobTitle" value={this.state.jobTitle} onChange={this.onChange} class="form-control" placeholder="Job Title" />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label class="control-label">Location *</label>
                            <input maxlength="200" type="text" required="required" class="form-control" name="jobCity" value={this.state.jobCity} onChange={this.onChange} placeholder="Job Address/City" />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-8">
                          <div class="form-group">
                            <label class="control-label">Job Function *</label>
                            <input maxlength="200" type="text" required="required" class="form-control" name="jobFunction" value={this.state.jobFunction} onChange={this.onChange} placeholder="Job Function" />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label class="control-label">
                              Employment Type *
                          </label>
                            <select class="form-control" name="employmentType" value={this.state.employmentType} onChange={this.onChange}>
                              <option value="">Choose one...</option>
                              <option value="Full Time">Full Time</option>
                              <option value="Part Time">Part Time</option>
                              <option value="Contract">Contract</option>
                              <option value="Temporary">Temporary</option>
                              <option value="Internship">Internship</option>
                            </select>

                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-8">
                          <div class="form-group">
                            <label class="control-label">Company Industry *</label>
                            <input maxlength="200" type="text" required="required" class="form-control" name="companyIndustry" value={this.state.companyIndustry} onChange={this.onChange} placeholder="Industry" />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label class="control-label">
                              Seniority Level *
                          </label>
                            <select class="form-control" required="required" name="seniorityLevel" value={this.state.seniorityLevel} onChange={this.onChange} >
                              <option value="">Choose one...</option>
                              <option value="Entry Level">Entry Level</option>
                              <option value="Associate">Associate</option>
                              <option value="Mid-Senior Level">Mid-Senior Level</option>
                              <option value="Director">Director</option>
                              <option value="Executive">Executive</option>
                              <option value="Not Applicable">Not Applicable</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label class="control-label">Job Description *</label>
                            <textarea type="text" required="required" class="form-control" name="jobDescription" value={this.state.jobDescription} onChange={this.onChange} placeholder="Description" />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <label class="control-label">&nbsp;&nbsp;&nbsp;&nbsp;How would you like to receive your applicants? *</label>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <div className="radio">
                              <label>
                                <input type="radio" value="option1" checked={this.state.selectedOption === 'option1'} onChange={this.handleOptionChange} />
                                Recommended: Let candidates apply with their LinkedIn profile and notify me by email
                            </label>
                              <input maxlength="200" type="text" class="form-control" name="emailNotify" value={this.state.emailNotify} onChange={this.onChange} placeholder="example@example.com" />
                            </div>
                            <div className="radio">
                              <label>
                                <input type="radio" value="option2" checked={this.state.selectedOption === 'option2'} onChange={this.handleOptionChange} />
                                Direct applicants to an external site to apply
                            </label>
                              <input maxlength="200" type="text" class="form-control" name="externalSite" value={this.state.externalSite} onChange={this.onChange} placeholder="http://yourcompany.com/job123" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label class="control-label">
                           Easy Apply Option
                        </label>
                          <select class="form-control" name="easyApply" value={this.state.easyApply} onChange={this.onChange}>
                            {/* <select value={this.state.value} onChange={this.handleChange}> */}
                            <option value="">Choose one...</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="control-label">
                         Company Logo
                      </label>
                      <input type="file" name="companyLogo"  id="file-input" onChange={this.onChangePhoto}/> 
                      </div>
                    </div>
                  </div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label class="control-label">
                              How did you hear about us
                          </label>
                            <select class="form-control" name="hearAboutUs" value={this.state.hearAboutUs} onChange={this.onChange}>
                              {/* <select value={this.state.value} onChange={this.handleChange}> */}
                              <option value="">Choose one...</option>
                              <option value="radio">Radio</option>
                              <option value="email">Email</option>
                              <option value="onlineAd">Online-Ad/ Search Engine</option>
                              <option value="podcast">Podcast</option>
                              <option value="adOnLinkedIn">Ad on LinkedIn.com</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <button class="btn btn-primary nextBtn btn-lg " type="button" >Continue</button>
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="sidebar">

                    <span class="glyphicon glyphicon-dashboard glyphiconJob"></span>
                    <p>
                      <span class="fontBold">Show your job to the right candidates</span><br />
                      Include more details such as relevant job functions,<br /> industries, and seniority level to help us advertise your <br />
                      job post to qualified candidates and recommend <br />matches for you to reach out to.
                  </p>  </div>
                </div>
              </div>
            </div>
            <div class="row setup-content" id="step-3">
              <div class="row form2">
                <div class="col-md-6">
                  <div class="form2">
                    <div class="section-form2">
                      <h3> Step 2: What are the right qualifications for your job?</h3>

                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label class="control-label">Skills Required for the Job *</label>
                            <textarea maxlength="200" type="text" required="required" class="form-control" name="skills" value={this.state.skills} onChange={this.onChange} placeholder="Skills" />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label class="control-label">How many years of relevant experience are you looking for? *</label>
                            <input type="text" required="required" class="form-control" name="relevantExperience" value={this.state.relevantExperience} onChange={this.onChange} placeholder="years" />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label class="control-label">What level of education are you looking for? *</label>
                            <textarea maxlength="200" type="text" required="required" class="form-control" name="educationLevel" value={this.state.educationLevel} onChange={this.onChange} placeholder="Education" />
                          </div>
                        </div>
                      </div>
                      <button class="btn btn-success nextBtn btn-lg " type="submit" >Finish</button>
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="sidebar">

                    <span class="glyphicon glyphicon-dashboard glyphiconJob2"></span>
                    <p>
                      <span class="fontBold">Show your job to the right candidates</span><br />
                      Include more details such as relevant job functions,<br /> industries, and seniority level to help us advertise your <br />
                      job post to qualified candidates and recommend <br />matches for you to reach out to.
                  </p>  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

    )
  }
}
// export default PostJob;
export default connect (null,{postJob})(PostJob);


