import React, { Component } from 'react';
import NavbarLinkedin from "../Navbar/Navbar";
import axios from 'axios';
import Img from './default.png';
import { Link, Redirect } from 'react-router-dom';
var jwtDecode = require('jwt-decode');



class ViewConnections extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connections: [],
        }
    }
    async componentDidMount() {
        var decoded = jwtDecode(localStorage.getItem("userToken"));
        var userId = decoded.id
        const response = await axios.get(`http://localhost:3001/connections/getConnectionList/${userId}`)
        console.log(response.data)
        this.setState({
            connections: response.data,
        })
    }
    render() {
        var redirectVar = null;
        if (!localStorage.getItem("userToken")) {
            redirectVar = <Redirect to="/home" />
        }
        var details = this.state.connections.map((value, i) => {

            return (
                <div>
                    <table>
                        <td style={{ 'padding': '10px' }}>
                            <img src={value.connectionPhoto} alt="Avatar" style={{ width: '150px', padding: '5px', 'border-radius': '50%' }} />

                        </td>
                        <td style={{ 'padding': '10px' }}>
                            <h4><strong>{value.connectionFname} {value.connectionLname}</strong></h4>
                            <h5>{value.connectionJobTitle},{value.connectionCompany}</h5>
                            <h6><font color="gray">{value.connectionCountry}</font></h6>
                            {/* <input tabindex="1" className="job-page-job-apply" type="submit" value="Message" /> &nbsp;&nbsp; */}
               </td>
                    </table>
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
                                <h4 className="fontsHeading">Connections</h4>
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
export default ViewConnections
