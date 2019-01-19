import React, { Component } from "react";
import axios from "axios";
import "../../css/ApplicantProfile.css";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

import { Document, Page } from 'react-pdf';
import NavbarLinkedin from "../Navbar/Navbar";
import { pdfjs } from 'react-pdf';
import moment from 'moment';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


class ApplicantProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profile: {},
           
            skill: [],
            education: [],
            experience: [],
            postedu:{
                school: "",
                degree: "",
                fieldOfStudy: "",
                grade: "",
                activity: "",
                dateTo: "",
                dateFrom: "",
                description:""
            },
            postexp:{
               title: "",
            company: "",
            city:"",
            state:"",
            // location: "",
            dateFrom: "",
            dateTo: "",
            headline:"",
            description:""

            },
            postskill:"",
            numPages: null,
            pageNumber: 1,
           
        };

        //this.handleShow = this.handleShow.bind(this);
        //this.handleClose = this.handleClose.bind(this);

        //this.skillChangeHandler = this.skillChangeHandler.bind(i,this);
        this.postskillChangeHandler = this.postskillChangeHandler.bind(this);


        this.postexpTitleChangeHandler = this.postexpTitleChangeHandler.bind(this);
        this.postexpcompanyChangeHandler = this.postexpcompanyChangeHandler.bind(this);

        this.postexpcityChangeHandler = this.postexpcityChangeHandler.bind(this);
        this.postexpstateChangeHandler = this.postexpstateChangeHandler.bind(this);
        
        this.postexpdateFromChangeHandler = this.postexpdateFromChangeHandler.bind(this);
        this.postexpdateToChangeHandler = this.postexpdateToChangeHandler.bind(this);
        this.postexpheadlineChangeHandler = this.postexpheadlineChangeHandler.bind(this);
        this.postexpdescriptionChangeHandler = this.postexpdescriptionChangeHandler.bind(this);

    
        this.posteduschoolChangeHandler= this.posteduschoolChangeHandler.bind(this);
        this.postedudegreeChangeHandler= this.postedudegreeChangeHandler.bind(this);
        this.postedufieldOfStudyChangeHandler= this.postedufieldOfStudyChangeHandler.bind(this);
        this.postedugradeChangeHandler= this.postedugradeChangeHandler.bind(this);
        this.posteduactivityChangeHandler= this.posteduactivityChangeHandler.bind(this);
        this.postedudateToChangeHandler= this.postedudateToChangeHandler.bind(this);
        this.postedudateFromChangeHandler= this.postedudateFromChangeHandler.bind(this);
        this.postedudescriptionChangeHandler= this.postedudescriptionChangeHandler.bind(this);

        this.firstnameChangeHandler = this.firstnameChangeHandler.bind(this);
         this.lastnameChangeHandler = this.lastnameChangeHandler.bind(this);
         this.headlineChangeHandler = this.headlineChangeHandler.bind(this);
         this.countryChangeHandler = this.countryChangeHandler.bind(this);
         this.cityChangeHandler=this.cityChangeHandler.bind(this);
         this.stateChangeHandler=this.stateChangeHandler.bind(this);
         //this.locationChangeHandler = this.locationChangeHandler.bind(this);
         this.zipCodeChangeHandler = this.zipCodeChangeHandler.bind(this);
         
         this.profileSummaryChangeHandler = this.profileSummaryChangeHandler.bind(this);
         this.handleEditIntroSubmit = this.handleEditIntroSubmit.bind(this);
         this.handleAddSKill= this.handleAddSKill.bind(this);

            this.handleAddEducation =this.handleAddEducation.bind(this);
            this.handleAddExperience =this.handleAddExperience.bind(this);

    }

    postskillChangeHandler = e => {
        this.setState({...this.state.postskill= e.target.value});
    };

         postexpTitleChangeHandler = e => {
            this.setState({...this.state.postexp.title= e.target.value});
        };
       postexpcompanyChangeHandler = e => {
            this.setState({...this.state.postexp.company= e.target.value});
        };
        // postexplocationChangeHandler= e => {
        //     this.setState({...this.state.postexp.location= e.target.value});
        // };
        postexpcityChangeHandler= e => {
            this.setState({...this.state.postexp.city= e.target.value});
        };
        postexpstateChangeHandler= e => {
            this.setState({...this.state.postexp.state= e.target.value});
        };
        postexpdateFromChangeHandler= e => {
            this.setState({...this.state.postexp.dateFrom= e.target.value});
        };
        postexpdateToChangeHandler= e => {
            this.setState({...this.state.postexp.dateTo=e.target.value});
        };
        postexpheadlineChangeHandler = e => {
            this.setState({...this.state.postexp.headline=e.target.value});
        };
        postexpdescriptionChangeHandler = e => {
            this.setState({...this.state.postexp.description= e.target.value});
        };




        posteduschoolChangeHandler = e => {
            this.setState({...this.state.postedu.school= e.target.value});
        };
        postedudegreeChangeHandler = e => {
            this.setState({...this.state.postedu.degree= e.target.value});
        };
         postedufieldOfStudyChangeHandler = e => {
            this.setState({...this.state.postedu.fieldOfStudy= e.target.value});
        };
        postedugradeChangeHandler = e => {
            this.setState({...this.state.postedu.grade= e.target.value});
        };
        postedudateToChangeHandler = e => {
            this.setState({...this.state.postedu.dateTo= e.target.value});
        };
        posteduactivityChangeHandler = e => {
            this.setState({...this.state.postedu.activity= e.target.value});
        };
        postedudateFromChangeHandler = e => {
            this.setState({...this.state.postedu.dateFrom= e.target.value});
        };
        postedudescriptionChangeHandler = e => {
            this.setState({...this.state.postedu.description= e.target.value});
        };



         postedudescriptionChangeHandler = e => {
            this.setState({...this.state.postedu.description= e.target.value});
        };

    profileSummaryChangeHandler = e => {
        this.setState({...this.state.profile.profileSummary= e.target.value});
    };
    zipCodeChangeHandler = e => {

        this.setState({...this.state.profile.postalCode= e.target.value});
      
    };
    // locationChangeHandler = e => {
    //     this.setState({...this.state.profile.location= e.target.value});
       
    // };
    cityChangeHandler = e => {
        this.setState({...this.state.profile.city= e.target.value});
       
    };

    stateChangeHandler (val) {
        this.setState({...this.state.profile.state= val});
       
    };
    countryChangeHandler (val) {
        this.setState({...this.state.profile.country= val});
    };
    headlineChangeHandler = e => {
        this.setState({...this.state.profile.headline= e.target.value});
    };
    
    firstnameChangeHandler = e => {
        this.setState({...this.state.profile.firstName = e.target.value});
    };
    lastnameChangeHandler = e => {
        this.setState({...this.state.profile.lastName = e.target.value});
    };
    skillChangeHandler(i,e) {
        this.setState({...this.state.profile.skill[i] = e.target.value});
    };
    educationSchoolChangeHandler(i,e) {
        this.setState({...this.state.profile.education[i].school = e.target.value});
    };
    educationdegreeChangeHandler(i,e) {
        this.setState({...this.state.profile.education[i].degree = e.target.value});
    };
    educationfieldOfStudyChangeHandler(i,e) {
        this.setState({...this.state.profile.education[i].fieldOfStudy = e.target.value});
    };
    educationgradeChangeHandler(i,e) {
        this.setState({...this.state.profile.education[i].grade = e.target.value});
    };
    educationactivityChangeHandler(i,e) {
        this.setState({...this.state.profile.education[i].activity = e.target.value});
    };
    educationdateToChangeHandler(i,e) {
        this.setState({...this.state.profile.education[i].dateTo = e.target.value});
    };
    educationdateFromChangeHandler(i,e) {
        this.setState({...this.state.profile.education[i].dateFrom = e.target.value});
    };
    educationdescriptionChangeHandler(i,e) {
        this.setState({...this.state.profile.education[i].description = e.target.value});
    };

    experiencetitleChangeHandler(i,e) {
        this.setState({...this.state.profile.experience[i].title = e.target.value});
    };
    experiencecompanyChangeHandler(i,e) {
        this.setState({...this.state.profile.experience[i].company = e.target.value});
    };
    // experiencelocationChangeHandler(i,e) {
    //     this.setState({...this.state.profile.experience[i].location = e.target.value});
    // };
    experiencecityChangeHandler(i,e) {
        this.setState({...this.state.profile.experience[i].city = e.target.value});
    };
    experiencestateChangeHandler(i,e) {
        this.setState({...this.state.profile.experience[i].state = e.target.value});
    };
    experienceheadlineChangeHandler(i,e) {
        this.setState({...this.state.profile.experience[i].headline = e.target.value});
    };
    experiencedateToChangeHandler(i,e) {
        this.setState({...this.state.profile.experience[i].dateTo = e.target.value});
    };
    experiencedateFromChangeHandler(i,e) {
        this.setState({...this.state.profile.experience[i].dateFrom = e.target.value});
    };
    experiencedescriptionChangeHandler(i,e) {
        this.setState({...this.state.profile.experience[i].description = e.target.value});
    };
    // handleClose() {
    //     this.setState({ show: false });
    // }
    // handleShow() {
    //     this.setState({ show: true });
    // }


    async componentDidMount()  {

        //console.log("currentemail" + this.state.currentemail)
        // this.props.getProfileData(this.state.currentemail)
        // console.log("this.props.getProfile"+this.props.getProfile)
        //axios.get(`http://localhost:3001/profile/${this.state.currentemail}`)
        await axios.get(`http://localhost:3001/applicant/profile`)
            .then((response) => {
                console.log("response.data" + JSON.stringify(response.data));
                this.setState({
                    profile: response.data,
                    // profile: this.props.getProfile
                });

                console.log("profile [0]   " + this.state.profile.firstName)
                this.setState({

                    skill: this.state.profile.skill,
                    education: this.state.profile.education,
                    experience: this.state.profile.experience,
                    
                })
                console.log(this.state);

            });
    }

    // handleSubmit = e => {
    //     e.preventDefault();
    //     const data = {
    //     };
    //     this.props.onSubmitHandle(data);
    // };
    async  handleEditIntroSubmit(e) {
        e.preventDefault();
       
        console.log("edit into" + this.state.profile);
        var newprofile= {profile:this.state.profile};
        axios.put(`http://localhost:3001/applicant/profile`,newprofile)
        .then((response) => {
            console.log(response);
            if(response.status===200)
            {
                alert("edit info succesfull")
                document.getElementById('add-skill-close').click()
                window.location.reload();
            }
        });
        //await this.props.handleEditIntroSubmit(newprofile);
     };

     async handleAddSKill(e){
        e.preventDefault();
        this.setState({...this.state.profile.skill.push(this.state.postskill) 
        });
        
        var newprofile= {profile:this.state.profile};
        axios.put(`http://localhost:3001/applicant/profile`,newprofile)
        .then((response) => {
            console.log(response);
            if(response.status===200)
            {
                alert("ADD skill succesfull")
                document.getElementById('add-skill-close').click()
                window.location.reload();
            }
        });
        //await this.props.handleAddSKill(newprofile);
    }

    async handleAddEducation(e){
        e.preventDefault();
        this.setState({...this.state.profile.education.push(this.state.postedu) });
        //console.log(this.state.profile.education[1].school);
        //console.log("add edu "+ this.state.postedu.school);
        //alert("data aya post edu")
       // document.getElementById('add-edu-close').click();
       var newprofile= {profile:this.state.profile};
        axios.put(`http://localhost:3001/applicant/profile`,newprofile)
        .then((response) => {
            console.log(response);
            if(response.status===200)
            {
                alert("ADD edu succesfull")
                document.getElementById('add-edu-close').click()
                window.location.reload();
            }
        });

        //await this.props.handleAddEducation(newprofile);
    }
    async handleAddExperience (e){
        e.preventDefault();
        this.setState({...this.state.profile.experience.push(this.state.postexp) });
        
        var newprofile= {profile:this.state.profile};
        axios.put(`http://localhost:3001/applicant/profile`,newprofile)
        .then((response) => {
            console.log(response);
            if(response.status===200)
            {
                alert("ADD exp succesfull")
                document.getElementById('add-exp-close').click();
                window.location.reload();
            }
        });

        //await this.props.handleEditIntroSubmit(newprofile);
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
        const result = await axios.post(`http://localhost:3001/applicant/profileimage/`, file)  
        window.location.reload();
    
    }
    async onUploadResume(e){
        e.preventDefault();
        console.log("in upload resume")
        console.log('Selected file:', e.target.files[0]);
        let file = new FormData();
        file.append("file", e.target.files[0]);
        //let file = e.target.files[0];
        console.log("uploading profile resume...");
        //formData.append('profileimage', file);
        const result = await axios.post(`http://localhost:3001/applicant/resume/`, file)  
        window.location.reload();
    
    }

   
    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
        console.log("loaded"+this.state.numpages);
      }

    render() {
        
        const { pageNumber, numPages } = this.state;
        // let pagination = null;
        // if (this.state.pages) {
        //     pagination = this.renderPagination(this.state.page, this.state.pages);
        //   }
        // let redirectVar = null;
        // if (!(cookie.load("travellercookie") || cookie.load("ownercookie"))) {
        //     redirectVar = <Redirect to="/home" />;
        // }
        let redirectVar = null;
        if (!localStorage.getItem("userToken")) {
            redirectVar = <Redirect to="/home" />
        }

        let loopedu = this.state.education.map((edu, i) => {
            return (
                
                    <li   key={i }>
                        <div >
                            <h3 >
                                {edu.school}

                            </h3>
                            <div >
                                <h4 >
                                    <span className="inside" >{edu.degree}</span> <span >{edu.fieldOfStudy}</span>

                                    <span className="glyphicon glyphicon-pencil linked-plus" data-toggle="modal" data-target="#editEducationModal" aria-hidden="true"></span>

                                </h4>
                            </div>
                            <h4 >
                                <span className="inside" ></span> <span >{moment(edu.dateFrom).format()} – {moment(edu.dateTo).format()}</span>
                            </h4>
                            <h4 >
                                <span className="inside" ></span> <span >{edu.activity}</span>
                            </h4>
                            <h4 >
                                <span className="inside" ></span> <span >{edu.description}</span>
                            </h4>
                        </div>
                    </li>
            )
        })
        let loopexp = this.state.experience.map((exp, i) => {
            return (
                    <li key={i}>
                        <div >
                            <h3 >
                                {exp.title}
                                <span className="glyphicon glyphicon-pencil linked-plus" data-toggle="modal" data-target="#editEducationModal" aria-hidden="true"></span>
                            </h3>
                            <h4 >
                                <span className="inside" ></span> <span>{exp.company}</span>
                            </h4>
                            <div >
                                <h4 >
                                    <span className="inside" ></span> <span >  {moment(exp.dateFrom).format("YYYY-MM-DD")} </span>
                                </h4> <div>
                                    <h4>
                                        <span className="inside" ></span> <span >{moment(exp.dateTo).format("YYYY-MM-DD")} </span>
                                    </h4>
                                </div>
                            </div>
                            {/* <h4 >
                                <span className="inside" ></span> <span >{exp.location}</span>
                            </h4> */}
                            <h4 >
                                <span className="inside" ></span> <span >{exp.city},{exp.state}</span>
                            </h4>

                            <h4 >
                                <span className="inside" ></span> <span >{exp.headline}</span>
                            </h4>
                            <h4 >
                                <span className="inside" ></span> <span >{exp.description}</span>
                            </h4>
                        </div>

                    </li>
                    
               
            )
        })


        let loopskill = this.state.skill.map((ski, i) => {
            return (
                
                    <li key={i} >
                        <div >
                            <h3 >
                                {ski}
                            </h3>
                        </div>
                    </li>
                   
                
            )
        })


        let loopseditexperience = this.state.experience.map((exp, i) => {

            return (
                <div key={i}>
                    <div>
                        <label>
                            Title
                                                        </label>
                        <div>
                            <input className="profileinput" placeholder="Ex: Manager" value={exp.title} onChange={this.experiencetitleChangeHandler.bind(this, i)} type="text" />
                        </div>
                    </div>
                    <div>
                        <label>
                            Company
                                                    </label>
                        <br></br>
                        <input className="profileinput" placeholder="Ex: Microsoft" type="text" value={exp.company} onChange={this.experiencecompanyChangeHandler.bind(this, i)} />
                    </div>
                    <div>
                        <div>
                            <label>
                                City
                                </label>
                            <br></br>
                            <input className="profileinput" placeholder="Ex: London" value={exp.city} onChange={this.experiencecityChangeHandler.bind(this, i)}
                                type="text" />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>
                                State
                                </label>
                            <br></br>
                            <input className="profileinput" placeholder="Ex: United Kingdom" value={exp.state} onChange={this.experiencestateChangeHandler.bind(this, i)}
                                type="text" />
                        </div>
                    </div>
                    {/* <div>
                        <div>
                            <label>
                                Location
                                </label>
                            <br></br>
                            <input className="profileinput" placeholder="Ex: London,United Kingdom" value={exp.location} onChange={this.experiencelocationChangeHandler.bind(this, i)}
                                type="text" />
                        </div>
                    </div> */}
                    <div>
                        <div>
                            <label>
                                From
                             </label> <div >
                                <input type="date" value={moment(exp.dateFrom).format("YYYY-MM-DD")} onChange={this.experiencedateFromChangeHandler.bind(this, i)}/>
                            </div>
                        </div>
                        <div>
                            <label>To </label>
                            <div >
                                <input type="date" value={moment(exp.dateTo).format("YYYY-MM-DD")}  onChange={this.experiencedateToChangeHandler.bind(this, i)} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label> Headline</label>
                        <br></br>
                        <input className="profileinput" type="text" value={exp.headline} onChange={this.experiencedescriptionChangeHandler.bind(this, i)}/>
                    </div>
                    <div>
                        <label> Description</label>
                        <br></br>
                        <textarea className="profileinput" name="description" value={exp.description} onChange={this.experiencedescriptionChangeHandler.bind(this, i)}>
                        </textarea>
                    </div>
                </div>
            )
        })
        let loopsediteducation = this.state.education.map((edu, i) => {

            return (
                <div  key={i} >
                    <div>
                        <label>
                            School </label>
                        <div>
                            <input className="profileinput" placeholder="Ex: Boston University" type="text" value={edu.school} onChange={this.educationSchoolChangeHandler.bind(this, i)}/>
                        </div>
                    </div>
                    <div>
                        <label>
                            Degree</label>
                        <br></br>
                        <input className="profileinput" placeholder="Ex: Bachelor’s" type="text" value={edu.degree} onChange={this.educationdegreeChangeHandler.bind(this, i)} />
                    </div>
                    <div>
                        <div>
                            <label>
                                Field of study
                                    </label>
                            <br></br>
                            <input className="profileinput" name="fieldofstudy" type="text" value={edu.fieldOfStudy} onChange={this.educationfieldOfStudyChangeHandler.bind(this, i)} />
                        </div>
                    </div>
                    <div>
                        <label>
                            Grade
                                    </label>
                        <br></br>
                        <input className="profileinput" name="grade" type="text" value={edu.grade} onChange ={this.educationgradeChangeHandler.bind(this, i)}/>
                    </div>
                    <div>
                        <label>
                            Activities and societies
                                    </label>
                        <br></br>
                        <textarea className="profileinput" name="activities" placeholder="Ex: Alpha Phi Omega, Marching Band, Volleyball" value={edu.activity} onChange={this.educationactivityChangeHandler.bind(this, i)}>
                        </textarea>

                    </div>
                    <div>
                        <div>
                            <div>
                                <label>
                                    From Year
                                        </label> <span >
                                    <input type="date" id="datepicker" value={moment(edu.dateFrom).format("YYYY-MM-DD")} onChange = {this.educationdateFromChangeHandler.bind(this, i)}/>
                                </span>
                            </div>
                            <div>
                                <label>
                                    To Year (or expected)
                                        </label>
                                <input type="date" id="datepicker" value={moment(edu.dateTo).format("YYYY-MM-DD")}  onChange={this.educationdateToChangeHandler.bind(this, i)}/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label>
                            Description
                        </label>
                        <br></br>
                        <textarea className="profileinput" name="description" value={edu.description} onChange={this.educationdescriptionChangeHandler.bind(this, i)} >
                        </textarea>
                    </div>
                    </div>

                    )})

                   


return (
            <div>
                <NavbarLinkedin>
                </NavbarLinkedin>
                        {redirectVar}
                        {/* <Header>
                </Header> */}
                        <div className="profile-container">
                            <div className="row">
                                <div className="col-md-2" >

                                </div>
                                <div className="col-md-7">
                                <section className="mycard">
                                        <div className="headerimage">
                                        </div>
                                        <div>
                                            <div >
                                                <img className="profileimg" src={this.state.profile.photo} alt="avatar" style={{width:'200px',padding: '10px'}} />
                                                <span ></span>
                                                
                                            </div>
                                            
                                            <span className="glyphicon glyphicon-pencil linked-plus" data-toggle="modal" data-target="#editprofile" aria-hidden="true"></span>

                                        </div>
                                        <div className="userinfo">
                                            <div >
                                                <h2 >{this.state.profile.firstName}  {this.state.profile.lastName}
                                                </h2>
                                            </div>
                                            <h3 >
                                                {this.state.profile.headline}
                                            </h3>
                                            <h4 >
                                                {this.state.profile.city},{this.state.profile.state}
                                            </h4>
                                            <div >
                                            </div>
                                            <div >
                                                <p>
                                                    <span >{this.state.profile.profileSummary}</span>
                                                    <span >...</span>
                                                </p>
                                                <p>
                                            <span className="resume" data-toggle="modal" data-target="#showResume" aria-hidden="true">Resume</span>
                                            </p>
                                            </div>
                                            

                                        </div>
                                        <div>
         
</div>
                                    </section>

                                    <br></br>


                                    <section className="mycard">
                                        <header className="applicantheader">
                                            <h2 >
                                                Experience
        
                                    <span className="glyphicon glyphicon-plus linked-plus" data-toggle="modal" data-target="#addexperience" aria-hidden="true"></span>
                                            </h2>
                                        </header>
                                        <ul className="myul" >
                                        {loopexp}
                                        </ul>

                                    </section>

                                    <section className="mycard">

                                        <header className="applicantheader">
                                            <h2 >
                                                Education
                                        <span className="glyphicon glyphicon-plus linked-plus" data-toggle="modal" data-target="#addeducation" aria-hidden="true"></span>
                                            </h2>
                                        </header>
                                        <ul className="myul">
                                        {loopedu}
                                        </ul>

                                    </section>
                                    <br></br>
                                    <section className="mycard" id="section-skills">
                                        <header className="applicantheader" id="skill-header">
                                            <h2 >
                                                Skills <span className="glyphicon glyphicon-plus linked-plus" data-toggle="modal" data-target="#addskill" aria-hidden="true"></span>
                                            </h2></header>
                                            <ul className="myul" >
                                        {loopskill}
                                        </ul>
                                    </section>
                                </div>
                                <div className="col-md-3" ></div>
                            </div>
                        </div>
                        <div className="modal fade add-skill" id="addskill" role="dialog" data-keyboard="false" data-backdrop="static">
                            <div className="modal-dialog  ">
                                <div className="modal-content">
                                    <div className="modal-header ">
                                        <h3 className="modal-title ">Add Skill
                                                <button type="button" id= "add-skill-close"className="close" data-dismiss="modal" aria-label="Close" >
                                                <span aria-hidden="false">&times;</span>
                                            </button>
                                        </h3>
                                    </div>
                                    <form onSubmit={this.handleAddSKill} >
                                        <div className="modal-body">
                                            <div className="row">
                                                <div >
                                                    <div >
                                                        <label >
                                                            Skill
				                                            </label>
                                                        <div>
                                                            <input required className="profileinput" placeholder="Ex: Java" type="text" value={this.state.postskill} onChange={this.postskillChangeHandler}/>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                        <hr></hr>
                                        <div className="modalfooter">
                                            <div className="row">
                                                <div className="col-md-11">
                                                    <button type="submit" className="modalSave" >Add</button>
                                                </div>
                                            </div>
                                        </div>
                                        <br></br>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="modal fade add-experience" id="addexperience" role="dialog" data-keyboard="false" data-backdrop="static">
                            <div className="modal-dialog  ">
                                <div className="modal-content">
                                    <div className="modal-header ">
                                        <h3 className="modal-title ">Add Experience
                    <button type="button" id = "add-exp-close"className="close" data-dismiss="modal" aria-label="Close" >
                                                <span aria-hidden="false">&times;</span>
                                            </button>
                                        </h3>
                                    </div>
                                    <form onSubmit={this.handleAddExperience}>
                                        <div className="modal-body">
                                            <div className="row">
                                                <div >
                                                    <div >
                                                        <label >
                                                            Title
				                                            </label>
                                                        <div>
                                                            <input required className="profileinput" placeholder="Ex: Manager" type="text" value={this.state.postexp.title} onChange={this.postexpTitleChangeHandler} />
                                                        </div>
                                                    </div>
                                                    <div >
                                                        <label >
                                                            Company
			                                        </label>
                                                        <br></br>
                                                        <input  required className="profileinput" placeholder="Ex: Microsoft" type="text" value={this.state.postexp.company} onChange={this.postexpcompanyChangeHandler}/>
                                                    </div>
                                                    <div >
                                                    <div >
                                                            <label  >
                                                                City
			                                        </label>
                                                            <br></br>
                                                            <input required className="profileinput" placeholder="Ex: London,United Kingdom" name="fieldofstudy"  type="text" value={this.state.postexp.city} onChange={this.postexpcityChangeHandler}/>
                                                        </div>
                                                        <div >
                                                            <label  >
                                                                State
			                                        </label>
                                                            <br></br>
                                                            <input required className="profileinput" placeholder="Ex: London,United Kingdom" name="fieldofstudy"  type="text" value={this.state.postexp.state} onChange={this.postexpstateChangeHandler}/>
                                                        </div>
                                                        {/* <div >
                                                            <label  >
                                                                Location
			                                        </label>
                                                            <br></br>
                                                            <input className="profileinput" placeholder="Ex: London,United Kingdom" name="fieldofstudy"  type="text" value={this.state.postexp.location} onChange={this.postexplocationChangeHandler}/>
                                                        </div> */}
                                                    </div>
                                                    <div >

                                                        <div >
                                                            <div >
                                                                <div >
                                                                    <label >
                                                                        From
					                                            </label>
                                                                </div>
                                                                <div >
                                                                    <input required type="date" value={moment(this.state.postexp.dateFro).format("YYYY-MM-DD")} onChange={this.postexpdateFromChangeHandler} />

                                                                </div>
                                                            </div>
                                                            <div >
                                                                <div  >
                                                                    <div >
                                                                        <label >
                                                                            To
					                                            </label>
                                                                    </div>
                                                                    <div >
                                                                        <input required type="date"value={moment(this.state.postexp.dateTo).format("YYYY-MM-DD")} onChange={this.postexpdateToChangeHandler} />
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div >
                                                        <label >
                                                            Headline
		                                        </label>
                                                        <br></br>
                                                        <input required className="profileinput" name="headline" type="text"value={this.state.postexp.headline} onChange={this.postexpheadlineChangeHandler} />
                                                    </div>
                                                    <div >
                                                        <label >
                                                            Description
                                            </label>
                                                        <br></br>
                                                        <textarea required className="profileinput" name="description"  value={this.state.postexp.description} onChange={this.postexpdescriptionChangeHandler}>
                                                        </textarea>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <hr></hr>
                                        <div className="modalfooter">
                                            <div className="row">
                                                <div className="col-md-11">
                                                    <button type="submit" className="modalSave" >Save</button>
                                                </div>
                                            </div>
                                        </div>
                                        <br></br>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="modal fade add-education" id="addeducation" role="dialog" data-keyboard="false" data-backdrop="static">
                            <div className="modal-dialog  ">
                                <div className="modal-content">
                                    <div className="modal-header ">
                                        <h3 className="modal-title ">Add Education
                    <button type="button" id="add-edu-close"className="close" data-dismiss="modal" aria-label="Close" >
                                                <span aria-hidden="false">&times;</span>
                                            </button>
                                        </h3>
                                    </div>
                                    <form onSubmit={this.handleAddEducation}>
                                        <div className="modal-body">
                                            <div className="row">
                                                <div >
                                                    <div >
                                                        <label >
                                                            School
				                                            </label>
                                                        <div>
                                                            <input required className="profileinput" placeholder="Ex: Boston University" value={this.state.postedu.school} onChange={this.posteduschoolChangeHandler} type="text" />
                                                        </div>
                                                    </div>
                                                    <div >
                                                        <label >
                                                            Degree
			                                        </label>
                                                        <br></br>
                                                        <input required className="profileinput" placeholder="Ex: Bachelor’s" type="text" value={this.state.postedu.degree} onChange={this.postedudegreeChangeHandler} />
                                                    </div>
                                                    <div >
                                                        <div >
                                                            <label  >
                                                                Field of study
			                                        </label>
                                                            <br></br>
                                                            <input required className="profileinput" name="fieldofstudy" type="text" value={this.state.postedu.fieldOfStudy} onChange={this.postedufieldOfStudyChangeHandler} />
                                                        </div>
                                                    </div>
                                                    <div >
                                                        <label >
                                                            Grade
		                                        </label>
                                                        <br></br>
                                                        <input className="profileinput" name="grade" type="text" value={this.state.postedu.grade} onChange={this.postedugradeChangeHandler} />
                                                    </div>
                                                    <div>
                                                        <label >
                                                            Activities and societies
		                                        </label>
                                                        <br></br>
                                                        <textarea className="profileinput" name="activities" placeholder="Ex: Alpha Phi Omega, Marching Band, Volleyball" value={this.state.postedu.activity} onChange={this.posteduactivityChangeHandler}  >
                                                        </textarea>

                                                    </div>
                                                    <div >

                                                        <div >
                                                            <div >
                                                                <label >
                                                                    From Year
					                                            </label>
                                                                <div >
                                                                    <input type="date"  value={this.state.postedu.dateFrom} onChange={this.postedudateFromChangeHandler}/>

                                                                </div>
                                                            </div>
                                                            <div >
                                                                <label >
                                                                    To Year (or expected)
					                    </label>
                                                                <div >
                                                                    <input type="date" value={this.state.postedu.dateTo} onChange={this.postedudateToChangeHandler}/>

                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div >
                                                        <label >
                                                            Description
                                            </label>
                                                        <br></br>
                                                        <textarea className="profileinput" name="description" value={this.state.postedu.description} onChange={this.postedudescriptionChangeHandler} >
                                                        </textarea>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <hr></hr>
                                        <div className="modalfooter">
                                            <div className="row">
                                                <div className="col-md-11">
                                                    <button type="submit" className="modalSave" >Save</button>
                                                </div>
                                            </div>
                                        </div>
                                        <br></br>
                                    </form>
                                </div>
                            </div>
                        </div>


                        <div className="modal fade edit-intro " id="editprofile" role="dialog" data-keyboard="false" data-backdrop="static">
                            <div className="modal-dialog  ">
                                <div className="modal-content">
                                    <div className="modal-header ">
                                        <h3 className="modal-title ">Edit Intro
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                                                <span aria-hidden="false">&times;</span>
                                            </button>
                                        </h3>
                                    </div>
                                    <div className="row">
<div className="col-md-5">
                                    <img className="profileimg" src={this.state.profile.photo} alt="avatar" style={{width:'300px', padding: '10px'}} /><span id="SPAN_8"></span>
                                    
                                    </div><div className="col-md-5">
                                    <label>
                                                            Chooose new profile picture 
                                                </label>
                                                <input type="file" name="profileimage"  id="file-input" onChange={this.onChangePhoto}/> 
                                            </div>
                                            </div>
                                    <form   onSubmit={this.handleEditIntroSubmit}>
                                        <div className="modal-body">
                                            <div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label>
                                                            First Name
                                                </label>
                                                        <div>
                                                            <input name="firstName"  type="text" value={this.state.profile.firstName} onChange={this.firstnameChangeHandler} />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="col-md-6">
                                                            <label>
                                                                Last Name
                                                    </label>
                                                            <div>
                                                                <input name="lastName"  type="text" value={this.state.profile.lastName} onChange={this.lastnameChangeHandler} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label>
                                                            Headline
                                            </label>

                                                        <div>
                                                            <textarea name="headline" value= {this.state.profile.headline} onChange={this.headlineChangeHandler}>
                                                            </textarea>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label>
                                                            Resume
                                            </label>

                                                        <div>
                                                        <input type="file" name="resume"  id="file-input" onChange={this.onUploadResume}/> 
                                           
                                                           
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr></hr>
                                                <div className="row">

                                                    <label>
                                                        Experience
                                            </label>

                                                    {loopseditexperience}

                                                </div>
                                                <hr></hr>
                                                <div>
                                                    <div className="row">
                                                        <label>
                                                            Education
                                            </label>
                                            {loopsediteducation}
                                                    </div>
                                                    <hr></hr>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <label>
                                                                Country/Region
                                                            </label>
                                                            <div>
                                                            <CountryDropdown className="form-control"
                                                                 value={this.state.profile.country}
                                                                 onChange={(val) => this.countryChangeHandler(val)}/>
                                                                {/* <input name="country"  type="text" value={this.state.profile.country} onChange={this.countryChangeHandler} />
                                                            */}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6" >
                                                            <label >
                                                                ZIP code
                                                        </label>
                                                            <div>
                                                                <div>
                                                                    <input name="zipcode" title="Enter a valid  ZipCode" pattern="^\d{5}(?:[-\s]\d{4})?$"  type="text"  value={this.state.profile.postalCode} onChange={this.zipCodeChangeHandler}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        </div>
                                                        <div className="row">
                                                        <div className="col-md-6">
                                                            <label>
                                                                City
                                                        </label>
                                                            <div>
                                                                <input name="city" type="text" value={this.state.profile.city} onChange ={this.cityChangeHandler}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6" >
                                                        <label>
                                                                State
                                                        </label>
                                                            <div>
                                                                 <RegionDropdown className="form-control"
                                                                 country={this.state.profile.country}
                                                                 value={this.state.profile.state}
                                                                 onChange={(val) => this.stateChangeHandler(val)}/>
                                                                {/* <input name="state" type="text" value={this.state.profile.state} onChange ={this.stateChangeHandler}/> */}
                                                            </div>
                                                        
                                                        </div>
                                                        </div>
                                                        <div className="row">
                                                        <div className="col-md-12">
                                                            <label>
                                                                Summary
                                                </label>
                                                            <div>
                                                                <textarea name="summary" value={this.state.profile.profileSummary} onChange={this.profileSummaryChangeHandler}>
                                                                </textarea>
                                                            </div>
                                                        </div>
                                                       
                                                    </div>
                                                    <div>
                                                            <h3>
                                                                Media
                                                            </h3>
                                                            <p>
                                                                Add or link to external documents, photos, sites, videos, and presentations.
                                                            </p>
                                                            <div>
                                                                <input name="file" type="file" />

                                                            </div>
                                                        </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr></hr>
                                        <div className="modalfooter">
                                            <div className="row">
                                                <div className="col-md-11">
                                                    <button type="submit" className="modalSave" >Save</button>
                                                </div>
                                            </div>
                                        </div>
                                        <br></br>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="modal fade add-skill" id="showResume" role="dialog" data-keyboard="false">
                            <div className="modal-dialog  ">
                                <div className="modal-content">
                                    <div className="modal-header ">
                                        <h3 className="modal-title ">Resume
                                                <button type="button" id= "add-skill-close"className="close" data-dismiss="modal" aria-label="Close" >
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
        
        
        <p>Page {pageNumber} of {numPages}</p>
        <button onClick={() => this.setState(prevState => ({ pageNumber: prevState.pageNumber + 1 }))}>
Next page
</button>
        

                                        </div>
       
                                </div>
                            </div>
                        </div>

                    </div>
                    );
                }
            }
            
const mapStateToProps = state => {
    return {
        //email: state.email,
        //authFlag: state.authFlag
    }
}

//export default connect(mapStateToProps, mapDispatchStateToProps)(ApplicantProfile);
export default ApplicantProfile;