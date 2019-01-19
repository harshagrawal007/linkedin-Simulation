import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavbarLinkedin from "../Navbar/Navbar";
import { Radio } from 'react-bootstrap';
import "../../css/DeleteAccount.css";
import jwtdecode from 'jwt-decode';
import { Redirect } from 'react-router-dom';
import axios from 'axios';



class DeleteAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            email: '',
            firstName: '',
            lastName: '',
            type: '',
            id: ''
        }
        this.deleteAccount = this.deleteAccount.bind(this);
    }
    componentDidMount() {
        if (localStorage.getItem("userToken")) {
            var decoded = jwtdecode(localStorage.getItem("userToken"));
            console.log("decoded  " + JSON.stringify(decoded))
            this.setState({
                token: true,
                id: decoded.id,
                email: decoded.email,
                firstName: decoded.firstName,
                lastName: decoded.lastName,
                type: decoded.type
            })
        }


    }
    deleteAccount(event) {
        event.preventDefault();
        console.log("this.state.id" + this.state.id)
        console.log("this.state.email" + this.state.email)
        console.log("this.state.type" + this.state.type)
        // email: this.state.email,
        //     type: this.state.type,
        //         id: this.state.id


        axios.delete(`http://localhost:3001/user/deleteAccount/`, { params: { email: this.state.email, type: this.state.type, id: this.state.id } })
            .then(res => {

                if (res.status === 200) {
                    window.location = '/home'
                    console.log("Delete in delete account")
                    console.log('res ' + res);
                    console.log('res.data' + res.data);
                    console.log('res.data.redirect ' + res.data.redirect)
                }
            })
        console.log('handleDelete ' + event.target.value)

    }
    render() {
        var redirectVar = null;
        if (!localStorage.getItem("userToken")) {
            redirectVar = <Redirect to="/home" />
        }
        return (<div>
            <NavbarLinkedin />
            {redirectVar}
            <div className='deleteacct-main-div'>
                <h3 align='left'>{this.state.firstName} {this.state.lastName}, we’re sorry to see you go</h3>
                <p align='left'>
                    Are you sure you want to close your account? You’ll lose your connections, messages, endorsements, and recommendations.</p>
                <hr />
                <h5>Tell us why you’re closing your account:</h5>
                <Radio name="groupOptions">I have a duplicate account</Radio>
                <Radio name="groupOptions">I’m getting too many emails</Radio>
                <Radio name="groupOptions">I’m not getting any value from my membership</Radio>
                <Radio name="groupOptions">I have a privacy concern</Radio>
                <Radio name="groupOptions">I’m receiving unwanted contact</Radio>
                <Radio name="groupOptions">Other</Radio>
                <p>Your feedback matters. Is there anything else you’d like us to know?</p>
                <textarea className='deleteacct-txtarea'></textarea>
                <br />
                <button className='btn btn-default'><Link to='/landingpage'>Back to Home</Link></button>
                <button className='btn btn-primary' onClick={this.deleteAccount}>Delete</button>


            </div>
        </div>
        );
    }
}

export default DeleteAccount;