import React, { Component } from 'react';
import "../../css/SignUp.css"
import Logo from './linkedInLogo.png'
import { connect } from "react-redux";
import { CountryDropdown } from 'react-country-region-selector';
import { signUp } from "../../actions/signUp";
import {store} from '../../store/store';
import swal from 'sweetalert2'



class SignUp extends Component {
    constructor (props) {
        super(props);
        this.state = 
        { country: '', 
        region: '' ,
        postalCode :'',
        city : '',
        mostRecentJobTitle : '',
        mostRecentCompany : '',
        optradio : ''
    };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeSignUp = this.onChangeSignUp.bind(this);

      }
      selectCountry (val) {
        this.setState({ country: val });
      }
      onChangeSignUp (e) {
        e.preventDefault();
        this.setState({[e.target.name] : e.target.value})
    }
    componentWillReceiveProps(nextProps){
        console.log(JSON.stringify(nextProps))  
        console.log(store.getState().signUp.signup.status)
        if(store.getState().signUp.signup.status === 201){
            swal({
                title: 'Error!',
                text: 'EmailID already registered. Please use an alternate email address',
                type: 'error',
                confirmButtonText: 'OK'
              })
        }
        else if(store.getState().signUp.signup.status === 400){
            swal({
                title: 'Error!',
                text: 'There was some error in Sign Up, Please try again',
                type: 'error',
                confirmButtonText: 'OK'
              })
        } 
        else if(store.getState().signUp.signup.status === 200){
            swal({
                title: 'Success!',
                text: 'Sign Up Successful',
                type: 'success',
                confirmButtonText: 'OK'
              })
              this.props.history.push('/home');


        }          
}
      async onSubmit(e){
        e.preventDefault();
        console.log("in on submit")
        var signUpFullDataSet ={
            fname : this.props.signUpOne.fname,
            lname : this.props.signUpOne.lname,
            signUpEmail : this.props.signUpOne.signUpEmail,
            signUpPass : this.props.signUpOne.signUpPass,
            country : this.state.country,
            city : this.state.city,
            postalCode : this.state.postalCode,
            mostRecentJobTitle : this.state.mostRecentJobTitle,
            mostRecentCompany : this.state.mostRecentCompany,
            type : this.state.optradio
        }
        // console.log(signUpFullDataSet.fname)
        // console.log(signUpFullDataSet.lname)
        // console.log(signUpFullDataSet.signUpEmail)
        // console.log(signUpFullDataSet.signUpPass)
        // console.log(signUpFullDataSet.country)
        // console.log(signUpFullDataSet.postalCode)
        // console.log(signUpFullDataSet.mostRecentJobTitle)
        // console.log(signUpFullDataSet.mostRecentCompany)
        // console.log(signUpFullDataSet.type)
        await this.props.signUp(signUpFullDataSet);
      }


    
    render(){
        const { country } = this.state;

        return(
            
            <div className = "sign-up"   >
            <div className="navbarsignup-custom">
            <div className="navbar-header">
            <img className = "signup-page-logo" alt="LinkedIn" src = {Logo} />
            </div>
            <div className="sign-up-div">
            <h1 className="sign-up-heading">
			Welcome, {this.props.signUpOne.fname}!
        </h1>
        <h2 className="sign-up-heading2">
        Let’s start your profile, connect to people you know, and engage with them on topics you care about.
    </h2>
    <form onSubmit = {this.onSubmit}>
    <div className = "sign-up">
    <div className="row"> <div className="col-md-2"></div><label for="location-country" className="sign-up-label">Country/Region</label></div>
    <div className="row" ><div className="col-md-2"></div><CountryDropdown className="sign-up-input" value={country} onChange={(val) => this.selectCountry(val)} required /> </div>
    <div className="row"> <div className="col-md-2"></div><label for="postal-code" className="sign-up-label">Postal Code</label></div>
    <div className="row" ><div className="col-md-2"></div><input type="text" pattern="^\d{5}(?:[-\s]\d{4})?$" title="Enter a valid  ZipCode" name="postalCode" onChange = {this.onChangeSignUp} className="sign-up-input" required />  </div>
    <div className="row"> <div className="col-md-2"></div><label for="city" className="sign-up-label">City</label></div>
    <div className="row" ><div className="col-md-2" ></div><input type="text" name="city" onChange = {this.onChangeSignUp} className="sign-up-input" required /></div>
    <div className="row"> <div className="col-md-2"></div><label for="most-recent-job-title" className="sign-up-label">Most Recent Job Title</label></div>
    <div className="row" ><div className="col-md-2" ></div><input type="text" name="mostRecentJobTitle" onChange = {this.onChangeSignUp} className="sign-up-input" required /></div>
    <div className="row"> <div className="col-md-2"></div><label for="most-recent-company" className="sign-up-label">Most Recent Company</label></div>
    <div className="row" ><div className="col-md-2"></div><input type="text" name="mostRecentCompany" onChange = {this.onChangeSignUp} className="sign-up-input" required/></div>
    <div className="row"> <div className="col-md-2"></div><label for="type" className="sign-up-label">Type</label></div>
    <div className="row"> <div className="col-md-2"></div>
    <label class="radio-inline"><input type="radio" name="optradio"  value = "applicant" onChange = {this.onChangeSignUp} required/>Applicant</label>
    <label class="radio-inline"><input type="radio" name="optradio" value  = "recruiter" onChange = {this.onChangeSignUp}/>Recruiter</label>
    </div>
    <div className="row"> <div className="col-md-2"></div><input type="submit" name="submitSignUp" value="Sign Up"  className="submit-button-sign-up" /></div>
    </div>
    </form>

    </div>
    </div>
    </div>
        )
    }

}
const mapStateToProps = state => ({
    signUpOne : state.signUp.signupone,
    signUp : state.signUp.signup 
  })
export default connect (mapStateToProps,{signUp})(SignUp);



