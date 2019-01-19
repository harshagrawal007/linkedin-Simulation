import React, { Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import NavbarLinkedin from "../Navbar/AdminNavbar";
import axios from "axios";
// import "../../css/material-dashboard.css";
import "../../css/AdminDashboard.css";



class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: [],
                datasets: [{
                    label: 'Saved Jobs',
                    data: [],
                    backgroundColor: [
                        // 'rgba(255, 99, 132, 0.6)',
                        'rgba(128,0,0,0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(255, 99, 132, 0.6)'
                    ],
                }]
            },
            chartDataclicks: {
                labels: [],
                datasets: [{
                    label: 'Clicks Per Jobs',
                    data: [],
                    backgroundColor: [
                        // 'rgba(255, 99, 132, 0.6)',
                        'rgba(217, 129, 129, 1)',
                        'rgba(217, 169, 129, 1)',
                        'rgba(172, 217, 129, 1)',
                        'rgba(129, 217, 187, 1)',
                        'rgba(129, 160, 217, 1)',
                        'rgba(150, 129, 217, 1)',
                        'rgba(213, 129, 217, 1)',
                        'rgba(250, 61, 108, 1)',
                        'rgba(168, 61, 250, 1)',
                        'rgba(61, 111, 250, 1)',
                        'rgba(61, 206, 250, 1)',
                        'rgba(61, 250, 203, 1)',
                        'rgba(61, 250, 140, 1)',
                        'rgba(80, 250, 61, 1)',
                        'rgba(206, 250, 61, 1)',
                        'rgba(250, 162, 61, 1)',
                        'rgba(250, 86, 61, 1)',
                        'rgba(129, 160, 217, 1)',
                        'rgba(150, 129, 217, 1)',
                        'rgba(213, 129, 217, 1)',
                        'rgba(250, 61, 108, 1)',
                        'rgba(168, 61, 250, 1)',
                        'rgba(61, 111, 250, 1)',
                    ],
                }]
            },
            chartDataTrace: {
                labels: [],
                datasets: [
                    {
                        label: 'Half Filled',
                        data: [],
                        backgroundColor: 'rgba(250, 86, 61, 0.6)' // green
                    },
                    {
                        label: 'Viewed',
                        data: [],
                        backgroundColor: 'rgba(61, 206, 250, 0.6)' // yellow
                    },
                    {
                        label: 'Completely Filled',
                        data: [],
                        backgroundColor: 'rgba(80, 111, 250, 0.6)' // red
                    }
                    //     {
                    //     label: 'Trace Diagram',
                    //     data: [],
                    //     backgroundColor: [
                    //         // 'rgba(255, 99, 132, 0.6)',
                    //         'rgba(217, 129, 129, 1)',
                    //         'rgba(217, 169, 129, 1)',
                    //         'rgba(172, 217, 129, 1)',
                    //         'rgba(129, 217, 187, 1)',
                    //         'rgba(129, 160, 217, 1)',
                    //         'rgba(150, 129, 217, 1)',
                    //         'rgba(213, 129, 217, 1)'
                    //     ],
                    // }
                ]
            }
        }
    }
    componentDidMount() {
        //Get Number of Saved Jobs0
        axios.get(`http://localhost:3001/applicant/numberofsavedjobs`)
            .then((response) => {
                var tempA = []
                var tempB = []
                console.log("response.data.companyTitle" + JSON.stringify(response.data[0]))
                console.log("response.data.saves" + JSON.stringify(response.data.saves))
                response.data.map((data, i) => {
                    if (response.status === 200) {
                        tempA.push(data.companyTitle)
                        tempB.push(data.saves)


                        console.log(" response.data" + response.data)
                    }
                    console.log("tempA" + tempA)
                    console.log("tempB" + tempB)
                })
                this.setState({
                    ...this.state.chartData.labels = tempA,
                    ...this.state.chartData.datasets[0].data = tempB
                })
            })
        //Get Number of Clicks per JOB Postings
        axios.get(`http://localhost:3001/applicant/clicksperjob`)
            .then((response) => {
                var tempC = []
                var tempD = []
                console.log("response.data.companyTitle" + JSON.stringify(response.data[0]))
                console.log("response.data.saves" + JSON.stringify(response.data.saves))
                response.data.map((data, i) => {
                    if (response.status === 200) {
                        tempC.push(data.company)
                        tempD.push(data.clicks)


                        console.log(" response.data" + response.data)
                    }
                    console.log("tempC" + tempC)
                    console.log("tempD" + tempD)
                })
                this.setState({
                    ...this.state.chartDataclicks.labels = tempC,
                    ...this.state.chartDataclicks.datasets[0].data = tempD
                })
            })
        axios.get(`http://localhost:3001/applicant/usertrace`)
            .then((response) => {
                var tempE = []
                var tempF = []
                var tempG = []
                var tempH = []
                console.log("response.data" + JSON.stringify(response.data))
                response.data.map((data, i) => {
                    if (response.status === 200) {
                        tempE.push(data.companyTitle)
                        tempF.push(data.view)
                        tempG.push(data.half)
                        tempH.push(data.full)


                        console.log(" response.data" + response.data)
                    }
                    console.log("tempE" + tempE)
                    console.log("tempF" + tempF)

                })
                this.setState({
                    ...this.state.chartDataTrace.labels = tempE,
                    ...this.state.chartDataTrace.datasets[0].data = tempF,
                    ...this.state.chartDataTrace.datasets[1].data = tempG,
                    ...this.state.chartDataTrace.datasets[2].data = tempH

                })

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
                <div className="container">
                    <Pie data={this.state.chartData}
                        options={{
                            maintainAspectRatio: true,
                            title: {
                                display: true,
                                text: 'Saved Jobs Details',
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
                                }]
                            }
                        }}></Pie>
                </div>
                <div className="container">
                    <Bar data={this.state.chartDataTrace}
                        options={{
                            maintainAspectRatio: true,
                            title: {
                                display: true,
                                text: 'User Trace Graph',
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
                                yAxes: [
                                    { stacked: true },
                                    // {
                                    //     ticks: {
                                    //         beginAtZero: true
                                    //     }
                                    // }
                                ],
                                xAxes: [

                                    {
                                        ticks: {
                                            fontSize: 6
                                        },
                                        stacked: true
                                    },

                                ]
                            }
                        }}></Bar>
                </div>
                {/* </div> */}
                {/* </div> */}
                {/* <div className='row'> */}
                {/* <div className='col-md-6'> */}
                <div className="container">
                    <Pie data={this.state.chartDataclicks}
                        options={{
                            maintainAspectRatio: true,
                            title: {
                                display: true,
                                text: 'Clicks Per Job',
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
                                // xAxes: [{
                                //     ticks: {
                                //         fontSize: 6
                                //     }

                                // }]
                            }
                        }}></Pie>
                </div>
                {/* </div> */}
                {/* </div> */}

            </div >
        );
    }
}

export default AdminDashboard;