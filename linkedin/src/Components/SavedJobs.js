import React, { Component } from 'react';
import NavbarLinkedin from "../Navbar/Navbar";
import "../../css/JobSearch.css"
import axios from 'axios'
var jwtDecode = require('jwt-decode');


class SavedJobs extends Component {
    constructor(props){
        super(props);
        this.state = {
            savedJobs : [],          
        }
        this.onUnsave = this.onUnsave.bind(this);
    }

    async componentDidMount(){
        console.log("in component did mount save jobs")
        var decoded = jwtDecode(localStorage.getItem("userToken"));
        const applicantId = decoded.id
        const response = await axios.get(`http://localhost:3001/applicant/savejob/${applicantId}`) 
        console.log(response.data)
        this.setState({
            savedJobs : response.data
        })
        
    }
    async onUnsave(id, e){
        console.log("in unsave")
        var decoded = jwtDecode(localStorage.getItem("userToken"));
        const applicantId = decoded.id;
        const jobId = id
        const response = await axios.delete(`http://localhost:3001/applicant/savejob`, {params: {applicantId: applicantId,jobId: jobId}})
        if(response.status === 200){
            window.location.reload()
        }
    }
    render(){
        var details = null
        console.log(this.state.savedJobs)

        if(this.state.savedJobs !== ""){
            console.log("something")
            var details = this.state.savedJobs.map((value,i) => {
                return(
                   <div>
                   <h4><strong>{value.jobTitle}</strong>
                   <button tabindex="1"  onClick = {this.onUnsave.bind(this, value.jobId)} className ="job-page-job-unsave"><span class="glyphicon glyphicon-bookmark"></span></button>
                   </h4>
                   <h5>{value.company}</h5>
                   <h6>{value.jobCity},{value.jobState}</h6>
                   <h6><font color = "gray">Posted on: {value.dateSaved.slice(0,10)}</font></h6>
                   <hr></hr>
                   </div>
                )

            })

        }
        else{
            console.log("nothing")
        }
        
     
        return(
            <div>
            <NavbarLinkedin>
            </NavbarLinkedin>
            <div className = "containerSavedJobs">

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className = "container">
            <div className="row" >
            <div className="col-md-2" >
         
            </div>
            <div className="col-md-2" ></div>
            <div className="col-md-2" ></div>
            <div className="col-md-2" ></div>
          </div>
            <div className="row">
            <div className="col-md-1" >
            <div className="card searchresultscards1">
            <div className="card-body">
            <h4 className = "fontsHeading">Saved Jobs</h4> 
            <hr></hr>
            {details}
            
            </div>
            </div>
            </div>
           
            <div className="col-md-1" ></div>
            <div className="col-md-1" ></div>


            <div className="col-md-1" ></div>



            
            </div>
            </div>
            </div>
            </div>
        )
    }
}
export default SavedJobs
