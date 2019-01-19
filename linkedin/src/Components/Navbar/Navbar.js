import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, MenuItem, FormGroup, FormControl, InputGroup, DropdownButton } from 'react-bootstrap';
import "../../css/Navbar.css";
import jwtdecode from 'jwt-decode';
import { Link, Redirect } from 'react-router-dom';



class NavbarLinkedin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: false,
            email: '',
            firstName: '',
            lastName: '',
            type: '',
        }
        this.handleLogout = this.handleLogout.bind(this);
    }
    handleLogout = () => {
        // cookie.remove('cookie', { path: '/' })
        localStorage.removeItem("userToken")
        window.location = '/home'

    }
    componentDidMount() {
        console.log("localStorage.getItem" + localStorage.getItem("userToken"))
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
        console.log("type" + this.state.type)

        console.log("email" + this.state.email)
    }
    render() {
        var isrecruiter = null;
        var redirectVar = null;
        if (!localStorage.getItem("userToken")) {
            redirectVar = <Redirect to="/home" />
        }
        if (this.state.type === 'recruiter')
            isrecruiter = true;
        else
            isrecruiter = false;

        return (

            <div>
                {redirectVar}
                <Navbar inverse collapseOnSelect className='navbar-fixed-top navbarlinkedin-navbar'>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/landingpage"><img alt="linkedin-logo" src="https://s3.us-east-2.amazonaws.com/user-images-linkedin2/linkedin-logo.png" height="30" width="35"></img></Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Navbar.Form pullLeft>
                            {/* <FormGroup>
                                <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">Page 1 <span class="caret"></span></a>
                                <FormControl type="text" placeholder="Search" class="dropdown dropdown-toggle" data-toggle="dropdown" />
                                <ul class="dropdown-menu">
                                    <li><a href="#">Page 1-1</a></li>
                                    <li><a href="#">Page 1-2</a></li>
                                </ul>
                            </FormGroup>{' '} */}

                            <FormGroup>
                                <InputGroup>
                                    <FormControl type="text" className='disabled' value="" />
                                    <DropdownButton
                                        componentClass={InputGroup.Button}
                                        className='glyphicon glyphicon-search'
                                        id="input-dropdown-addon"
                                        title=""
                                        pull-right>
                                        <MenuItem key="1" className='navbarlinkedin-dropdown'><Link to='/userSearch'><span className='glyphicon glyphicon-user'></span> People</Link></MenuItem>
                                        {!isrecruiter && (
                                        <MenuItem key="2" className='navbarlinkedin-dropdown'><Link to='/jobsearch'><span className='glyphicon glyphicon-briefcase'></span> Jobs</Link></MenuItem>
                                        )}
                                          {isrecruiter && (
                                        <MenuItem key="2" className='navbarlinkedin-dropdown'><Link to='/jobPostings'><span className='glyphicon glyphicon-briefcase'></span>Job Postings</Link></MenuItem>
                                        )}
                                    </DropdownButton>
                                </InputGroup>
                            </FormGroup>
                        </Navbar.Form>
                        <Nav pullRight>
                            <ul className='list-inline text-right nav navbar-nav'>

                                <li id="index">
                                    <Link to="/landingpage">
                                        <span className="glyphicon glyphicon-home navbarlinkedin-glyphicon" title="Home"></span> Home
                                        </Link>
                                </li>

                                <li id="index">
                                    <Link to="/viewConnections">
                                        <span className="glyphicon glyphicon-user navbarlinkedin-glyphicon" title="My Network"></span> My Network
                                        </Link>
                                </li>
                                {!isrecruiter && (
                                    <li id="index">
                                        <Link to="/jobsearch">
                                            <span className="glyphicon glyphicon-briefcase navbarlinkedin-glyphicon" title="Jobs"></span> Jobs
                                        </Link>
                                    </li>
                                )}
                                <li id="index">
                                    <Link to="/messaging">
                                        <span className="glyphicon glyphicon-envelope navbarlinkedin-glyphicon" title="Messaging"></span> Messaging
                                        </Link>
                                </li>
                                <li id="index">
                                    <Link to="/viewConnectionRequest">
                                        <span className="glyphicon glyphicon-bell navbarlinkedin-glyphicon" title="Notification"></span> Notification
                                        </Link>
                                </li>
                                <li id="index">
                                    <Link to="#">
                                        <span className="glyphicon glyphicon-dashboard navbarlinkedin-glyphicon" title="Me"></span>
                                        <NavDropdown eventKey={3} title="Me" id="basic-nav-dropdown">


                                            <MenuItem eventKey={3.1}><Link to="/profile">View Profile</Link></MenuItem>
                                            <MenuItem divider />
                                            <MenuItem eventKey={3.2} >ACCOUNT</MenuItem>
                                            <MenuItem divider />
                                            <MenuItem eventKey={3.3}><Link to="/deleteaccount">Settings & Privacy</Link></MenuItem>

                                            <MenuItem eventKey={3.4}>Languages</MenuItem>
                                            <MenuItem divider />
                                            <MenuItem eventKey={3.5}>NEED HELP?</MenuItem>
                                            <MenuItem divider />
                                            <MenuItem eventKey={3.6}>Open Quick Help</MenuItem>
                                            <MenuItem divider />
                                            <MenuItem eventKey={3.7}>MANAGE</MenuItem>
                                            <MenuItem divider />
                                            <MenuItem eventKey={3.8}>Posts & Activity</MenuItem>
                                            <MenuItem eventKey={3.9}>Job postings</MenuItem>
                                            <MenuItem divider />
                                            <MenuItem eventKey={3.10} onClick={this.handleLogout}>Sign out</MenuItem>


                                        </NavDropdown>
                                    </Link>

                                </li>

                                {isrecruiter && (
                                    <li id="index">
                                        <Link to="/recruiterDashboard">
                                            <span className="glyphicon glyphicon-th navbarlinkedin-glyphicon" title="Work"></span> Work
                                        </Link>
                                    </li>
                                )}
                                {!isrecruiter && (
                                    <li id="index">
                                        <Link to="/applicantdashboard">
                                            <span className="glyphicon glyphicon-th navbarlinkedin-glyphicon" title="Work"></span> Work
                                        </Link>
                                    </li>
                                )}

                                <li>
                                    <p align="center" ><font color='white' size='2'>Free Upgrade to  <br />Premium </font> </p>
                                </li>

                                {isrecruiter && (
                                    <li id="index">
                                        <Link to="/postJob">
                                            <span className="glyphicon glyphicon-blackboard navbarlinkedin-glyphicon" title="Post a Job"></span> Post a Job
                                        </Link>
                                    </li>
                                )}



                            </ul>


                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

            </div >
        );
    }
}

export default NavbarLinkedin;