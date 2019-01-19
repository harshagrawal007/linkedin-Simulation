import React, { Component } from 'react';
import NavbarLinkedin from "../Navbar/Navbar";
import { Link } from 'react-router-dom';
import "../../css/Messaging.css";
import axios from 'axios';
import jwtdecode from 'jwt-decode';
import { Redirect } from 'react-router-dom';





class Messaging extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messagebox: [],
            token: false,
            email: '',
            firstName: '',
            lastName: '',
            type: '',
            photo: '',
            userid: '',
        }
        // this.createMessage = this.createMessage.bind(this)
    }
    componentDidMount() {
        if (localStorage.getItem("userToken")) {
            var decoded = jwtdecode(localStorage.getItem("userToken"));
            console.log("decoded  " + JSON.stringify(decoded))
            this.setState({
                token: true,
                email: decoded.email,
                firstName: decoded.firstName,
                lastName: decoded.lastName,
                type: decoded.type,
                userid: decoded.id
            })
        }
        console.log("this.state.currentemail" + this.state.userid)
        axios.get(`http://localhost:3001/message/getInbox/${decoded.id}`)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        messagebox: response.data
                    })
                    console.log(" response.data" + response.data)

                }
            })

        // axios.get(`http://localhost:3001/user/details/${decoded.id}`)
        //     .then((response) => {
        //         if (response.status === 200) {
        //             this.setState({
        //                 photo: response.data[0].photo
        //             })
        //         }
        //     })
    }

    render() {
        let redirectVar = null;
        if (!localStorage.getItem("userToken")) {
            redirectVar = <Redirect to="/home" />
        }
        console.log("this.state.currentemail" + this.state.userid)

        let details = this.state.messagebox.map((inbox, i) => {
            return (
                <div className="jumbotron vertical-center messaging-getmymsgs">
                    {inbox.receiverid._id === this.state.userid && (
                        <img src={inbox.senderid.photo} className='col-md-1  messaging-img-circle' alt="messaging-pic" ></img>
                    )}
                    {inbox.receiverid._id !== this.state.userid && (
                        <img src={inbox.receiverid.photo} className='col-md-1  messaging-img-circle' alt="messaging-pic" ></img>
                    )}

                    <Link to={`/messaging/thread/${inbox._id}`}>
                        <table>
                            {inbox.receiverid._id === this.state.userid && inbox.senderid._id !== this.state.userid && (
                                <tr><strong>    {inbox.senderid.firstName}   {inbox.senderid.lastName}</strong></tr>
                            )}
                            {inbox.senderid._id === this.state.userid && inbox.receiverid._id !== this.state.userid && (
                                <tr><strong>    {inbox.receiverid.firstName}   {inbox.receiverid.lastName}</strong></tr>
                            )}
                            {/* <tr><strong> Last Name:    {inbox.lastName}</strong></tr>
                            <tr>Email:    {inbox.email}</tr>
                            <tr>Country:    {inbox.country}</tr> */}
                        </table>
                    </Link>
                </div >
            )
        })

        return (<div>
            <NavbarLinkedin />
            {redirectVar}


            <div className='messaging-main-div'>
                <div className='messaging-leftborder'>
                    <h4>Messaging</h4>
                    <span className='glyphicon glyphicon-pencil messaging-glyph-pencil'></span>
                    <hr className='messaging-hr'></hr>
                    {details}
                </div>
            </div>

        </div >);
    }
}

export default Messaging;