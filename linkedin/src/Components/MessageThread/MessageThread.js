import React, { Component } from 'react';
import NavbarLinkedin from '../Navbar/Navbar';
import axios from 'axios';
import jwtdecode from 'jwt-decode';
import { Redirect } from 'react-router-dom';
import "../../css/Messaging.css";


var messageid = null;



class MessageThread extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatHistory: [],
            message: '',
            token: false,
            email: '',
            firstName: '',
            lastName: '',
            type: '',
            // redirectVar: '',
        }
        this.onChange = this.onChange.bind(this)
        this.sendMessageHandler = this.sendMessageHandler.bind(this)
    }
    // componentWillMount() {
    //     if (localStorage.getItem("userToken")) {
    //         var decoded = jwtdecode(localStorage.getItem("userToken"));
    //         console.log("decoded  " + JSON.stringify(decoded))
    //         this.setState({
    //             token: true,
    //             email: decoded.email,
    //             firstName: decoded.firstName,
    //             lastName: decoded.lastName,
    //             type: decoded.type
    //         })
    //     }


    // }
    onChange(e) {
        e.preventDefault();
        this.setState({ message: e.target.value })
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
                type: decoded.type
            })
        }
        console.log('this.state.firstName' + this.state.firstName)
        messageid = this.props.history.location.pathname.substring(18);
        console.log("in Compoenent did mount Message Thread" + this.props.history.location.pathname)
        console.log("messageid +" + messageid)

        console.log("this.state.messageid  " + messageid)
        axios.get(`http://localhost:3001/message/getChatHistory/${messageid}`)
            .then((response) => {
                console.log("new" + JSON.stringify(response.data[0].message))
                if (response.status === 200) {
                    if (response.data) {
                        this.setState({
                            chatHistory: this.state.chatHistory.concat(response.data[0].message)
                        })
                        console.log(" response.data chathistory" + JSON.stringify(this.state.chatHistory))
                    }
                }
            }
            )


    }
    sendMessageHandler() {
        // console.log("this.props.location.owneremail" + this.props.location.state.owneremail);
        messageid = this.props.history.location.pathname.substring(18);
        console.log("this.state.message" + this.state.message)
        console.log("messageid   ++++" + messageid)
        // preventDefault()
        var data = {
            messageid: messageid,
            message: this.state.firstName + " :     " + this.state.message
        }

        axios.post(`http://localhost:3001/message/addmessage`, data)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        messagebox: response.data
                    })
                    console.log(" response.data" + this.state.messagebox)

                }
            }
            )

    }
    render() {
        var redirectVar = null;
        if (!localStorage.getItem("userToken")) {
            redirectVar = <Redirect to="/home" />
        }
        let details = this.state.chatHistory.map((message, i) => {
            return (
                <div>
                    <span> {message}</span>
                    <hr className='hr-msg'></hr>
                </div>

            )
        })
        return (
            <div className="col-md-offset-5 messaging-thread stuck">
                {redirectVar}
                <div >
                    <hr></hr>

                    <ul className="collection">
                        {/* {isFetching ? <div>Loading...</div> : ( */}
                        <div>
                            <p>
                                <i className="prefix mdi-action-alarm" />
                                <br />
                                {details}
                                <br />
                            </p>
                        </div>

                    </ul>
                    <div className="row">

                        <form onSubmit={this.sendMessageHandler}>
                            <div>
                                <textarea onChange={this.onChange} name='mymessage' placeholder='Send a Message' className='messaging-textarea'></textarea>
                                <button className="btn btn-primary messaging-btn" >Send    </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>);
    }
}

export default MessageThread;