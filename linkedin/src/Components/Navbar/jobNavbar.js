import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, MenuItem, FormGroup, FormControl } from 'react-bootstrap';
import "../../css/postJobNavbar.css";
import { Redirect } from 'react-router-dom';



class NavbarJobPost extends Component {
    state = {}
    render() {
        let redirectVar = null;
        if (!localStorage.getItem("userToken")) {
            redirectVar = <Redirect to="/home" />
        }
        return (
            <div>
                {redirectVar}
                <Navbar inverse collapseOnSelect className='navbar-fixed-top navbarPostJob'>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/home"><img src="https://static.licdn.com/sc/h/95o6rrc5ws6mlw6wqzy0xgj7y" ></img></a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <ul className='list-inline text-right nav navbar-nav'>

                                <li id="index">
                                    <a href="/home">
                                        <span title="Home"></span> HOME
                                        </a>
                                </li>

                                <li id="index">
                                    <a href="/jobs">
                                        <span title="Jobs"></span> POST A JOB
                                        </a>
                                </li>
                                <li id="index">
                                    <a href="/messaging">
                                        <span title="linkedIn"></span> LINKEDIN.COM
                                        </a>
                                </li>
                                <li id="index">
                                    <a href="/inbox">
                                        <span className="glyphicon glyphicon-envelope glyphiconJobNavbar" title="Messaging"></span>
                                    </a>
                                </li>
                                <li id="index">
                                    <a href="/me">
                                        <span className="glyphicon glyphicon-dashboard glyphiconJobNavbar"></span>
                                        <NavDropdown eventKey={3} id="basic-nav-dropdown">
                                            <MenuItem eventKey={3.1}>Go to LINKEDIN.COM</MenuItem>
                                            <MenuItem divider />
                                            <MenuItem eventKey={3.2}>Sign out</MenuItem>
                                        </NavDropdown>
                                    </a>

                                </li>


                            </ul>

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

            </div >
        );
    }
}

export default NavbarJobPost;