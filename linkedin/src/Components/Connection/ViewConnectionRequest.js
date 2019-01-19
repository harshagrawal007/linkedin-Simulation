import React, { Component } from 'react';
import NavbarLinkedin from "../Navbar/Navbar";
import axios from 'axios';
import Img from './default.png';
import { Redirect } from 'react-router-dom';

var jwtDecode = require('jwt-decode');


class ViewConnectionRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: [],
        }
    }
    async componentDidMount() {
        console.log("in component did mount connection request view")
        var decoded = jwtDecode(localStorage.getItem("userToken"));
        console.log(decoded)
        const userid = decoded.id
        const response = await axios.get(`http://localhost:3001/connections/getConnectionRequest/${userid}`)
        console.log(response)
        this.setState({
            requests: response.data
        })
    }
    async onSubmitDecline(declineDetails, e) {
        console.log(declineDetails)
        var decoded = jwtDecode(localStorage.getItem("userToken"));
        const senderID = declineDetails.senderID
        const recieverID = decoded.id
        const deleteResponse = await axios.delete('http://localhost:3001/connections/makeConnectionRequest', { params: { senderID: senderID, recieverID: recieverID } })
        if (deleteResponse.status === 200) {
            window.location.reload()
        }
    }

    async onSubmitAccept(connectionDetails, e) {
        console.log("in submit accept")
        var decoded = jwtDecode(localStorage.getItem("userToken"));
        var userId = decoded.id
        var connectionID = connectionDetails.senderID
        console.log(connectionDetails)
        const request = {
            userId: userId,
            userFname: connectionDetails.recieverFname,
            userLname: connectionDetails.recieverLname,
            userCountry: connectionDetails.recieverCountry,
            userJobTitle: connectionDetails.recieverTitle,
            userCompany: connectionDetails.recieverCompany,
            userPhoto: connectionDetails.recieverPhoto,
            connectionID: connectionDetails.senderID,
            connectionFname: connectionDetails.senderFname,
            connectionLname: connectionDetails.senderLname,
            connectionCountry: connectionDetails.senderCountry,
            connectionJobTitle: connectionDetails.senderJobTitle,
            connectionCompany: connectionDetails.senderCompany,
            connectionPhoto: connectionDetails.senderPhoto
        }
        console.log(request)
        const connectionReqResponse = await axios.post('http://localhost:3001/connections/addConnection', request)
        if (connectionReqResponse.status === 200) {
            const deleteResponse = await axios.delete('http://localhost:3001/connections/makeConnectionRequest', { params: { senderID: connectionID, recieverID: userId } })
            if (deleteResponse.status === 200) {
                window.location.reload()
            }
        }
    }
    render() {
        var redirectVar = null;
        if (!localStorage.getItem("userToken")) {
            redirectVar = <Redirect to="/home" />
        }
        var details = this.state.requests.map((value, i) => {

            return (
                <div>
                    <table>
                        <td style={{ 'padding': '10px' }}>
                            <img src={value.senderPhoto} alt="Avatar" style={{ width: '150px', padding: '5px', 'border-radius': '50%' }} />

                        </td>
                        <td style={{ 'padding': '10px' }}>
                            <h4><strong>{value.senderFname} {value.senderLname}</strong></h4>
                            <h5>{value.senderJobTitle},{value.senderCompany}</h5>
                            <h6><font color="gray">{value.senderCountry}</font></h6>
                            <input tabindex="1" className="job-page-job-accept" onClick={this.onSubmitAccept.bind(this, value)} type="submit" value="Accept" /> &nbsp;&nbsp;
               <input tabindex="1" className="job-page-job-decline" onClick={this.onSubmitDecline.bind(this, value)} type="submit" value="Decline" /> &nbsp;&nbsp;
               </td>
                    </table>

                    {/* <h6><font color = "gray">Posted on: {value.dateSaved.slice(0,10)}</font></h6>*/}
                    {/* <input tabindex="1"  className ="job-page-job-apply" type="submit" value="Easy Apply" />  &nbsp;&nbsp;*/}
                    <hr></hr>
                </div>
            )

        })
        return (
            <div>
                <NavbarLinkedin>
                </NavbarLinkedin>
                {redirectVar}
                <br></br><br></br><br></br><br></br>
                <div className="row">
                    <div className="col-md-1" ></div>
                    <div className="col-md-1" >
                        <div className="card searchresultscards1">
                            <div className="card-body">
                                <h4 className="fontsHeading">Connection Requests</h4>
                                <hr></hr>
                                {details}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-1" ></div>
                    <div className="col-md-1" ></div>
                </div>
            </div>
        )
    }
}
export default ViewConnectionRequest