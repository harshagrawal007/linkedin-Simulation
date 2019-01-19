import React, { Component } from 'react';
import NavbarLinkedin from "../Navbar/Navbar";
import { Link, Redirect } from 'react-router-dom';
import jwtdecode from 'jwt-decode';
import axios from "axios";


// import { Navbar, Image } from 'react-bootstrap';
import "../../css/LandingPage.css";

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            email: '',
            firstName: '',
            lastName: '',
            type: '',
            photo: ''
        }
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
        console.log("{decoded.id" + decoded.id)
        axios.get(`http://localhost:3001/user/details/${decoded.id}`)
            .then((response) => {
                console.log("response.data" + JSON.stringify(response.data))
                if (response.status === 200) {
                    this.setState({
                        photo: response.data[0].photo
                    })

                    console.log("photo" + this.state.photo)

                }
            })


    }
    render() {
        let redirectVar = null;
        if (!localStorage.getItem("userToken")) {
            redirectVar = <Redirect to="/home" />
        }
        return (
            <div>
                <NavbarLinkedin />
                {redirectVar}
                <div className='landingpg-main-div'>
                    <h5 align='center'>Teach your Kids to Code  World's most comprehensive Coding and Engineering After-School Program  </h5>
                    {/* <div className='col-md-offset-1'> */}
                    <div className='landingpg-containernew'>

                        {/* // <img src='linkedinlogo.jpg' className='col-md-offset-4  landingpg-img-circle'  ></img> */}
                        <img src={this.state.photo} className='col-md-offset-4  landingpg-img-circle' alt="landingpage-pic" ></img>

                        <p align='center'>{this.state.firstName}   {this.state.lastName}<br />
                            Graduate Student | Software <br />
                            Engineering </p>
                        <hr></hr>
                        <p>Who's viewed your profile   </p>
                        <p>Connections </p>
                        {/* <p>Grow your Network</p> */}

                        <hr></hr>
                        <p align="center">
                            Access exclusive tools & insights
                               <br />
                            Free Upgrade to Premium

                           </p>
                    </div>
                    <br />
                    <div className='landingpg-containernew-bottom'>
                        <h4> Your communities </h4><div className='glyphicon-ring landingpg-glyphicon-ring'><span className='glyphicon glyphicon-pencil landingpg-glyphicon'></span></div>
                        <hr></hr>
                        <p>Hastags</p>
                        <p>#Deloitte</p>
                        <p>#Amazon</p>
                        <hr></hr>
                        <p>Groups</p>
                        <hr></hr>
                        <p>Discover more</p>
                    </div>
                    {/* </div> */}



                    <div className='col-md-offset-8'>
                        <div className='landingpg-containernew-right'>
                            <h4>What people are talking about now</h4>

                            <h5>Holiday sales won’t help all retailers</h5>
                            <p>1h ago 143029 readers</p>
                            <h5>A job after just one phone call</h5>
                            <p>2h ago 143352 readers</p>
                            <h5>Post-millennials are best educated</h5>
                            <p>4h ago 43352 readers</p>
                            <h5>Will 2019 be big year for tech?</h5>
                            <p>6h ago 16280 readers</p>
                            <h5>Fortune unveils top business people</h5>
                            <p>14h ago 35840 readers</p>


                        </div>
                        <div className='landingpg-containernew-bottom-right'>
                            <h4>Promoted</h4>
                            <p align='center'><Link to='#'>Master's in Cybersecurity</Link>
                                <br />
                                Earn your master's in
                                <br />
                                cybersecurity online
                                <br />
                                from UC Berkeley. GRE/GMAT req.
                            </p>
                            <p align='center'><Link to='#'>
                                M.S. in Data Science</Link>
                                <br />
                                Earn your Master's in Data
                                <br />
                                Science from Syracuse.
                                <br />
                                GRE waivers available.
                            </p>
                        </div>
                    </div>
                    {/* <div className='col-md-offset-3'> */}

                    <div className='landingpg-containernew-center'>
                        <br></br>
                        <p>Share an article, photo, video, document, or idea
                            <div className='glyphicon-ring landingpg-glyphicon-ring'> <span className='glyphicon glyphicon-camera landingpg-glyphicon'></span></div><div className='glyphicon-ring landingpg-glyphicon-ring'><span className='glyphicon glyphicon-facetime-video landingpg-glyphicon'></span></div><div className='glyphicon-ring landingpg-glyphicon-ring'><span className='glyphicon glyphicon-file landingpg-glyphicon'></span></div>
                        </p>
                        <hr></hr>
                        <button className='btn btn-default landingpg-btn1'><font color='black'>Write an article</font></button>
                        {/* <small><span className='glyphicon glyphicon-pencil'></span></small> */}
                        <button className='btn btn-primary landingpg-btn2'>Post</button>
                    </div>
                    <div className='landingpg-containernew-bottom-center'>
                        <p>John Doe likes this</p>
                        <hr></hr>
                        <img src="LT.jpg" height="40" width="60" className="landingpg-company-img"></img>
                        <div className='landinpg-company-details'>
                            <h4>Larsen & Toubro </h4>
                            <h6>641,507 followers</h6>
                        </div>

                        <p>We’re proud to be the chosen partner for the Mumbai Coastal Road Project - a first of its kind in India, involving sea front development, to provide seamless connectivity between south and north Mumbai.</p>
                        <img src="company.png" height="200" width="475" className='landingpg-company-img' ></img>


                    </div>

                    {/* </div> */}

                </div>

            </div >
        );
    }
}

export default LandingPage;