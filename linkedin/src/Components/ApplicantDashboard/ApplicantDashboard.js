import React, { Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import NavbarLinkedin from "../Navbar/AdminNavbar";
import axios from "axios";
import jwtdecode from 'jwt-decode';
// import "../../css/material-dashboard.css";
import "../../css/AdminDashboard.css";
var today = new Date();



class ApplicantDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {

            chartData: {
                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
                datasets: [{
                    label: 'Profile Views (Last 30 Days)',
                    data: [],
                    // backgroundColor: [
                    //     // 'rgba(255, 99, 132, 0.6)',
                    //     'rgba(217, 129, 129, 1)',
                    //     'rgba(217, 169, 129, 1)',
                    //     'rgba(172, 217, 129, 1)',
                    //     'rgba(129, 217, 187, 1)',
                    //     'rgba(129, 160, 217, 1)',
                    //     'rgba(150, 129, 217, 1)',
                    //     'rgba(213, 129, 217, 1)',
                    //     'rgba(250, 61, 108, 1)',
                    //     'rgba(168, 61, 250, 1)',
                    //     'rgba(61, 111, 250, 1)',
                    //     'rgba(61, 206, 250, 1)',
                    //     'rgba(61, 250, 203, 1)',
                    //     'rgba(61, 250, 140, 1)',
                    //     'rgba(80, 250, 61, 1)',
                    //     'rgba(206, 250, 61, 1)',
                    //     'rgba(250, 162, 61, 1)',
                    //     'rgba(250, 86, 61, 1)'
                    // ],
                }]
            }

        }
    }
    componentDidMount() {
        if (localStorage.getItem("userToken")) {
            var decoded = jwtdecode(localStorage.getItem("userToken"));
            console.log("decoded  " + JSON.stringify(decoded))
        }
        console.log("this.state.id" + decoded.id)
        //Get Number of Saved Jobs0
        axios.get(`http://localhost:3001/applicant/profileview/${decoded.id}`)
            .then((response) => {

                console.log("response.data." + JSON.stringify(response.data))
                if (response.status === 200) {
                    this.setState({
                        ...this.state.chartData.datasets[0].data = response.data
                    })
                }

            })

    }
    render() {
        return (
            <div>
                <NavbarLinkedin />
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                {/* <div className='row'> */}
                {/* <div className='col-md-6'> */}


                {/* </div> */}
                {/* </div> */}
                {/* <div className='row'> */}
                {/* <div className='col-md-6'> */}
                <div className="container">
                    <Line data={this.state.chartData}
                        options={{
                            maintainAspectRatio: true,
                            title: {
                                display: true,
                                text: 'Number of Days',
                                fontSize: 25
                            },

                            legend: {
                                display: true,
                                position: 'right',
                                labels: {
                                    fontColor: '#000'
                                }
                            },

                            layout: {
                                padding: {
                                    left: 50,
                                    right: 0,
                                    bottom: 0,
                                    top: 0
                                }
                            },
                            tooltips: {
                                enabled: true
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }],
                                xAxes: [{
                                    ticks: {
                                        fontSize: 6
                                    }

                                }]
                            }
                        }}></Line>
                </div>
                {/* </div> */}
                {/* </div> */}
            </div >
        );
    }
}

export default ApplicantDashboard;