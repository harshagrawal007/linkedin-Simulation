import React, { Component } from 'react';
import { connect } from "react-redux";
import "../../css/LoginPage.css"
import { signUpOne } from "../../actions/signUpOne";
import { submitLogin } from "../../actions/submitLogin";
import {store} from '../../store/store';
import * as jwtDecode from 'jwt-decode';
import swal from 'sweetalert2'




class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            fname : "",
            lname : "",
            signUpEmail : "",
            signUpPass : "",
            loginType : "",
            loginEmail : "",
            loginPass : "",
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitLogin = this.onSubmitLogin.bind(this);

    }

  async onSubmitLogin(e){
        e.preventDefault();
        console.log("in submit login")
        console.log(this.state.loginEmail);
        console.log(this.state.loginPass)
        console.log(this.state.loginType)
        const loginData = {
            email: this.state.loginEmail,
            password: this.state.loginPass,
            type : this.state.loginType
        }
        if(this.state.loginEmail === "admin@linkedin.com" && this.state.loginPass === "pass123"){
            this.props.history.push("/admindashboard");  

        }
        else{
            
        

        await this.props.submitLogin(loginData)
        console.log(this.props.login)
        }

    }

    onChange (e) {
        e.preventDefault();
        this.setState({[e.target.name] : e.target.value})
    }
    async onSubmit(e){
        e.preventDefault(); 
        console.log("In Login SignUp");
        var signUpLoginDataSet ={
            fname : this.state.fname,
            lname : this.state.lname,
            signUpEmail : this.state.signUpEmail,
            signUpPass : this.state.signUpPass
        }
        await this.props.signUpOne(signUpLoginDataSet);
     }
     componentWillReceiveProps(nextProps){
         console.log("in component will recieve props")
         if(store.getState().signUp.signupone){
            this.props.history.push("/signup");
         }
        else if(store.getState().signUp.login){
            if(store.getState().signUp.login.status === 201){
                swal({
                    title: 'Error!',
                    text: 'Invalid Credentials. Please Enter correct password',
                    type: 'error',
                    confirmButtonText: 'OK'
                  })

            }
            else if(store.getState().signUp.login.status === 203){
                swal({
                    title: 'Error!',
                    text: 'You are not registered. Please log in with registered EmailI',
                    type: 'error',
                    confirmButtonText: 'OK'
                  })

            }
            else if(store.getState().signUp.login.status === 400){
                swal({
                    title: 'Error!',
                    text: 'There has been some error, Please try again',
                    type: 'error',
                    confirmButtonText: 'OK'
                  })

            }
            else if(store.getState().signUp.login.status === 200){
              
                localStorage.setItem("userToken", store.getState().signUp.login.data.token);
                // var decoded = jwtDecode(localStorage.getItem("userToken"));
                // console.log(decoded.type)
                // if(decoded.type === "applicant"){
                    this.props.history.push("/landingpage");                    
                // }
                // else {

                // }



            }
        }   
    }
    render(){
        return(
        <div>
          <div className="navbar navbar-fixed-top navbarlogin-custom">
          <div className="navbar-header">
          <img className = "login-page-logo" alt="LinkedIn" src="https://static.licdn.com/sc/h/95o6rrc5ws6mlw6wqzy0xgj7y" />
            </div>
            <form onSubmit = {this.onSubmitLogin}>            
            <div className="login-page-login-div">
         
        <select onChange={this.onChange} className = "login-page-login-input1" name='loginType' required>
                                        <option value="">Select</option>
                                        <option value="recruiter">Recruiter</option>
                                        <option value="applicant">Applicant</option>
                                        </select>
          <div class="divider-location-login-page"/>  
       
            <input type="email" name="loginEmail" tabindex="1" className="login-page-login-input1" onChange = {this.onChange} value = {this.state.loginEmail} placeholder="Email"  required/> 
            <div class="divider-location-login-page"/>
            <input type="password" name="loginPass" tabindex="1" className="login-page-login-input1" onChange = {this.onChange} value = {this.state.loginPass} placeholder="Password" required />
            <div class="divider-location-login-page"/>
            <input tabindex="1" className="login-page-login-submit" type="submit" value="Sign in" />
            <div class="divider-location-login-page"/>
            <div class="divider-location-login-page"/>
        <a tabindex="1" href="www.linked.com" className="login-page-forgot-pass">Forgot password?</a>
            </div>
            </form>     
          </div>


          {/*<div class="divider-location-login-page"/>
            <input type="email" name="loginEmail" tabindex="1" className="login-page-login-input1" onChange = {this.onChange} value = {this.state.loginEmail} placeholder="Email" /> 
            <div class="divider-location-login-page"/>
            <input type="password" name="loginPass" tabindex="1" className="login-page-login-input1" onChange = {this.onChange} value = {this.state.loginPass} placeholder="Password" />
            <div class="divider-location-login-page"/>
            <input tabindex="1" className="login-page-login-submit" type="submit" value="Sign in" />
            <div class="divider-location-login-page"/>
            <div class="divider-location-login-page"/>
        <a tabindex="1" href="www.linked.com" className="login-page-forgot-pass">Forgot password?</a> */}
             
           
            <div className="login-background-container">
            <div className="login-page-sign-up-form">
            <div className="login-page-signup-heading1 ">
            Be great at what you do <br/>
            
            <font size="3" face="Helvetica, Arial, sans-serif">Get started - it's free.</font>
            </div>
        <div>
        <form onSubmit = {this.onSubmit}>
        <label className = "login-page-labels">First Name</label><br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" name="fname" onChange = {this.onChange} value = {this.state.fname} className="input-fields-login-page" required/>
        <label className = "login-page-labels">Last Name</label><br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" name="lname" onChange = {this.onChange} value = {this.state.lname} className="input-fields-login-page" required /> <br/>
        <label className = "login-page-labels">Email</label><br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="email" name="signUpEmail" onChange = {this.onChange} value = {this.state.signUpEmail} className="input-fields-login-page" required /> <br/>
        <label className = "login-page-labels">Password (6 or more characters)</label><br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="password" name="signUpPass" onChange = {this.onChange} value = {this.state.signUpPass} className="input-fields-login-page" pattern=".{6,}" title="Six or more characters" required/> <br/>
        <center><span className="login-page-span">By clicking Join now, you agree to the LinkedIn <a tabindex="4" href="https://www.linkedin.com/legal/user-agreement" id="A_21">User Agreement</a>, <a tabindex="4" href="https://www.linkedin.com/legal/privacy-policy" id="A_22">Privacy Policy</a>, and <a tabindex="4" href="https://www.linkedin.com/legal/cookie-policy" id="A_23">Cookie Policy</a>.</span>
       <input tabindex="4" className="signup-submit-login-page" type="submit" value="Join now" /></center>
       </form>
            </div>
            </div>
            </div>
            <div className="login-page-footer">
            <div className="login-page-footer-div">
            <label className="H3_3">Find a colleague</label>&nbsp;&nbsp;
            <input type="text" name="first" placeholder="First name" className="login-page-footer-input" />&nbsp;&nbsp;
            <input type="text" name="last" placeholder="Last name" className="login-page-footer-input" />&nbsp;&nbsp;
            <input type="submit" name="search" value="Search" className="login-page-footer-submit" />
            </div>
            <div>         
            </div>
             </div>
            </div>
        )
    }

}
const mapStateToProps = state => ({
    signUpOne : state.signUp.signupone, 
    login : state.signUp.login
  })
export default connect (mapStateToProps,{signUpOne,submitLogin})(LoginPage);

