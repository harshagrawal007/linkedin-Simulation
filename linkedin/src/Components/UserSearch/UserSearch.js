import React, { Component } from 'react';
import NavbarLinkedin from "../Navbar/Navbar";
import { connect } from "react-redux";
import {submitUserSearch} from "../../actions/submitUserSearch";
import {submitUserSearchConnection} from "../../actions/submitUserSearch";
import {submitUserSearchConnectionRequest} from "../../actions/submitUserSearch";
import {submitUserSearchConnectionRequestRec} from "../../actions/submitUserSearch";
import { Link } from 'react-router-dom';

import Img from './default.png';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
var jwtDecode = require('jwt-decode');


class UserSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            userName : "",
            displayStatus : "Connect",
            searchResults : [],
            sentRequest : false,
            searchResultsConnection : [],
            searchResultsConnectionReq : [],
            redirectVar: '',

        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitConnect = this.onSubmitConnect.bind(this);
        this.createMessage = this.createMessage.bind(this)
    }
    onChange (e) {
        e.preventDefault();
        this.setState({[e.target.name] : e.target.value})
    }
    async onSubmit(e){
        e.preventDefault();
        console.log("in on submit")
        var decoded = jwtDecode(localStorage.getItem("userToken"));
        const applicantId = decoded.id
        const searchData = {
            userName: this.state.userName,
            id : applicantId
        }
        await this.props.submitUserSearch(searchData)
        await this.props.submitUserSearchConnection(searchData)
        await this.props.submitUserSearchConnectionRequest(searchData)
        await this.props.submitUserSearchConnectionRequestRec(searchData)


    }

    componentWillReceiveProps(nextProps){
        console.log("in component will recieve props")
        console.log("search" + nextProps.search)
        console.log("search2" + nextProps.searchConnection)
        console.log("search3" + nextProps.searchConnectionReq)
        console.log("search4" + nextProps.searchConnectionReqRec)
        if(nextProps.search){
            this.setState({
                searchResults : nextProps.search,
                searchResultsConnection : nextProps.searchConnection,
                searchResultsConnectionReq : nextProps.searchConnectionReq,
                searchResultsConnectionReqRec : nextProps.searchConnectionReqRec,

            })

        }
        // if(nextProps.searchConnection){
        //     this.setState({
        //         searchResultsConnection : nextProps.searchConnection,
        //         image : Img
        //     })

        // }
        // if(nextProps.searchConnectionReq){
        //     this.setState({
        //         searchResultsConnectionReq : nextProps.searchConnectionReq,
        //         image : Img
        //     })

        // }

      
    }

    async onSubmitConnect(recieverDetails,e){
        e.persist()
        console.log("in on submit connect")
        console.log(recieverDetails)
        //console.log(e.target.value)
        var decoded = jwtDecode(localStorage.getItem("userToken"));
        var userId = decoded.id
        console.log(userId)
        const response = await axios.get(`http://localhost:3001/user/details/${userId}`)
        console.log(response)
  const request = {
      senderID : userId,
      recieverID : recieverDetails._id,
      senderFname : response.data[0].firstName,
      senderLname : response.data[0].lastName,
      senderCountry : response.data[0].country,
      senderJobTitle : response.data[0].mostRecentJobTitle,
      senderCompany : response.data[0].mostRecentCompany,
      senderPhoto : response.data[0].photo,
      recieverFname : recieverDetails.firstName,
      recieverLname : recieverDetails.lastName,
      recieverCountry : recieverDetails.country,
      recieverTitle : recieverDetails.mostRecentJobTitle,
      recieverCompany : recieverDetails.mostRecentCompany,
      recieverPhoto : recieverDetails.photo,
      flag : "pending"
  }
  const connectionReqResponse = await axios.post('http://localhost:3001/connections/makeConnectionRequest', request)
  if(connectionReqResponse.status === 200){
      e.target.value = "Pending"
      e.target.disabled = true;
      e.target.className = "job-page-job-pending"
  }

    }
    createMessage(e, i) {
        var receiverid
        var receiverFirstName
        var receiverLastName
        var decoded = jwtDecode(localStorage.getItem("userToken"));
        var userId = decoded.id
        console.log("e " + e + "i " + i)
        console.log("createMessage" + userId)
        this.state.searchResultsConnection.map((network, index) => {
            if (index === i) {
                console.log("network" + JSON.stringify(network))
                console.log("network._id" + network.connectionID)
                console.log("network.email" + network.email)
                // receiveremail = network.email;
                receiverid = network.connectionID;
                receiverFirstName = network.connectionFname;
                receiverLastName = network.connectionLname;
            }

        })

        var data = {
            senderid: userId,
            receiverid: receiverid
        }
        axios.post(`http://localhost:3001/message/sendMessage`, data)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        redirectVar: <Redirect to="/messaging" />
                    })
                }
            }
            )
    }

    render(){
        // if(this.props.search){
        //     console.log("props" + this.props.search[1])


        // }
        var details = null
      

        let companyLogo= null
        if(this.state.searchResults === "" ){
            companyLogo = (
                <div></div>
            )
           
        }
        else{
            companyLogo = (
                <img src={this.state.image} alt="Avatar" style={{width:'150px', padding: '5px', 'border-radius': '50%'}}/>

            )
        }
        console.log(this.state.searchResults)
        if(this.state.searchResults){
             details = this.state.searchResults.map((value,i) => {

                return(
                   <div>
                   <table>
                   <td  style={{'padding':'10px'}}>
                   <img src={value.photo} alt="Avatar" style={{width:'150px', padding: '5px', 'border-radius': '50%'}}/>
                   </td>
                   <td  style={{'padding':'10px'}}>
                  {/* <font color='blue'><Link to={`/StaticApplicantProfile/${value._id}`}> {inbox._id}</Link></font>*}*/}
                   <h4><strong><font color='blue'><Link to={`/StaticApplicantProfile/${value._id}`}> {value.firstName} {value.lastName}</Link></font></strong></h4>
                   <h5>{value.mostRecentJobTitle},{value.mostRecentCompany}</h5>
                   <h6><font color = "gray">{value.country}</font></h6>   
                   <input tabindex="1"  className ="job-page-job-save" onClick = {this.onSubmitConnect.bind(this, value)}  type="submit" value = "Connect"/> &nbsp;&nbsp;             
                   </td>
                
                   
                   </table>
                  
                  {/* <h6><font color = "gray">Posted on: {value.dateSaved.slice(0,10)}</font></h6>*/}
                {/* <input tabindex="1"  className ="job-page-job-apply" type="submit" value="Easy Apply" />  &nbsp;&nbsp;*/}
                   <hr></hr>
                   </div>
                )

            })

        }
        var conndetails = null
        if(this.state.searchResultsConnection){
             conndetails = this.state.searchResultsConnection.map((value,i) => {

                return(
                   <div>
                   <table>
                   <td  style={{'padding':'10px'}}>
                   <img src={value.connectionPhoto} alt="Avatar" style={{width:'150px', padding: '5px', 'border-radius': '50%'}}/>
                   </td>
                   <td  style={{'padding':'10px'}}>
                   <h4><strong><font color='blue'><Link to={`/StaticApplicantProfile/${value._id}`}> {value.connectionFname} {value.connectionLname}</Link></font></strong></h4>
                   <h5>{value.connectionJobTitle},{value.connectionCompany}</h5>
                   <h6><font color = "gray">{value.connectionCountry}</font></h6>   
                   <input tabindex="1"  className ="job-page-job-apply"   type="submit" value = "Message"  onClick={e => this.createMessage(e, i)}/> &nbsp;&nbsp;  
                   </td>
                
                   
                   </table>
                  
                  {/* <h6><font color = "gray">Posted on: {value.dateSaved.slice(0,10)}</font></h6>*/}
                {/* <input tabindex="1"  className ="job-page-job-apply" type="submit" value="Easy Apply" />  &nbsp;&nbsp;*/}
                   <hr></hr>
                   </div>
                )

            })


        }
        var connreqdetails = null
        if(this.state.searchResultsConnectionReq){
            connreqdetails = this.state.searchResultsConnectionReq.map((value,i) => {

                return(
                   <div>
                   <table>
                   <td  style={{'padding':'10px'}}>
                   <img src={value.senderPhoto} alt="Avatar" style={{width:'150px', padding: '5px', 'border-radius': '50%'}}/>
                   </td>
                   <td  style={{'padding':'10px'}}>
                   <h4><strong><font color='blue'><Link to={`/StaticApplicantProfile/${value._id}`}> {value.senderFname} {value.senderCompany}</Link></font></strong></h4>
                   <h5>{value.senderJobTitle},{value.senderCompany}</h5>
                   <input tabindex="1"  className ="job-page-job-pending"  type="submit" value = "Pending"/> &nbsp;&nbsp;   
                         
                   </td>
                
                   
                   </table>
                  
                  {/* <h6><font color = "gray">Posted on: {value.dateSaved.slice(0,10)}</font></h6>*/}
                {/* <input tabindex="1"  className ="job-page-job-apply" type="submit" value="Easy Apply" />  &nbsp;&nbsp;*/}
                   <hr></hr>
                   </div>
                )

            })

        }

        var connreqresdetails = null
        if(this.state.searchResultsConnectionReqRec){
            console.log("search new" + this.state.searchResultsConnectionReqRec)
            connreqresdetails = this.state.searchResultsConnectionReqRec.map((value,i) => {

                return(
                   <div>
                   <table>
                   <td  style={{'padding':'10px'}}>
                   <img src={value.recieverPhoto} alt="Avatar" style={{width:'150px', padding: '5px', 'border-radius': '50%'}}/>
                   </td>
                   <td  style={{'padding':'10px'}}>
                   <h4><strong><font color='blue'><Link to={`/StaticApplicantProfile/${value._id}`}> {value.recieverFname} {value.recieverLname}</Link></font></strong></h4>
                   <h5>{value.recieverTitle},{value.recieverCompany}</h5>
                   <input tabindex="1"  className ="job-page-job-pending"  type="submit" value = "Pending"/> &nbsp;&nbsp;   
                         
                   </td>
                
                   
                   </table>
                  
                  {/* <h6><font color = "gray">Posted on: {value.dateSaved.slice(0,10)}</font></h6>*/}
                {/* <input tabindex="1"  className ="job-page-job-apply" type="submit" value="Easy Apply" />  &nbsp;&nbsp;*/}
                   <hr></hr>
                   </div>
                )
            })
        }
        
        return(
           
            <div>
            <NavbarLinkedin>
            </NavbarLinkedin>
            {this.state.redirectVar}
            <div className="navbarlogin-custom1">
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="row" >
            <form onSubmit = {this.onSubmit}>
            <input type="text" name="userName" onChange = {this.onChange} value = {this.state.userName} className="sign-up-input" required placeholder = "Search Users" />
            <div className="col-md-1" ></div>&nbsp;&nbsp;&nbsp;
            <div className="col-md-1" ></div>
            <input tabindex="1" className="search-page-search-submit" type="submit" value="Search" />
            </form>
            </div>
            </div>
            <br></br>
            <div className="row">
            <div className="col-md-1" ></div>
            <div className="col-md-1" >
            <div className="card searchresultscards1">
            <div className="card-body">
            {conndetails}
            {connreqdetails}
            {connreqresdetails}
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

const mapStateToProps = state => ({
    search : state.search.userSearch,
    searchConnection : state.search.userSearchConnection ,
    searchConnectionReq : state.search.userSearchConnectionRequest,
    searchConnectionReqRec : state.search.userSearchConnectionRequestRec

  })
export default connect (mapStateToProps,{submitUserSearch,submitUserSearchConnection,submitUserSearchConnectionRequest,submitUserSearchConnectionRequestRec})(UserSearch);
