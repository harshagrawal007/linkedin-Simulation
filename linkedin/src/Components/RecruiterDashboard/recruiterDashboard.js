import React, { Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import NavbarLinkedin from "../Navbar/Navbar";
import axios from "axios";
// import "../../css/material-dashboard.css";
//import "../../css/AdminDashboard.css";



class RecruiterDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{
                jobTitle: "job1"
            },
            { jobTitle: "job2" },
            { jobTitle: "job3" },
            { jobTitle: "job4" }
            ],
            dropDownData: [],
            // chartData: {
            //     labels: [],
            //     datasets: [{
            //         label: 'Saved Jobs',
            //         data: [],
            //         backgroundColor: [
            //             // 'rgba(255, 99, 132, 0.6)',
            //             'rgba(128,0,0,0.6)',
            //             'rgba(54, 162, 235, 0.6)',
            //             'rgba(255, 206, 86, 0.6)',
            //             'rgba(75, 192, 192, 0.6)',
            //             'rgba(153, 102, 255, 0.6)',
            //             'rgba(255, 159, 64, 0.6)',
            //             'rgba(255, 99, 132, 0.6)'
            //         ],
            //     }]
            // },
            chartDataCityChart: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'Corona',
                        data: [5, 9, 8, 1, 6, 5, 0,0,0,34,12,66],
                        backgroundColor: 'rgba(217, 169, 129, 1)' // green
                    },
                    {
                        label: 'San Jose',
                        data: [6, 9, 40, 81, 56, 55, 0,7,6,8,9,0],
                        backgroundColor: 'rgba(172, 217, 129, 1)' // yellow
                    },
                    {
                        label: 'California',
                        data: [65, 59, 80, 81, 56, 55, 40,12,45,67,56,77],
                        backgroundColor: 'rgba(129, 217, 187, 1)' // red
                    },
                    {
                        label: 'New York',
                        data: [95, 50, 50, 51, 56, 55, 20,12,54,32,76,12],
                        backgroundColor: 'rgba(217, 129, 129, 1)' // green
                    },
                    {
                        label: 'Palo Alto',
                        data: [45, 50, 50, 1, 6, 5, 10,12,14,32,16,2],
                        backgroundColor: 'rgba(150, 129, 217, 1)' // yellow
                    },
                    
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
            },
            chartDatafirstTen: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: '',
                        data: [],
                        backgroundColor: 'rgba(217, 169, 129, 1)' // green
                    },
                    {
                        label: '',
                        data: [],
                        backgroundColor: 'rgba(172, 217, 129, 1)' // yellow
                    },
                    {
                        label: '',
                        data: [],
                        backgroundColor: 'rgba(129, 217, 187, 1)' // red
                    },
                    {
                        label: '',
                        data: [],
                        backgroundColor: 'rgba(217, 129, 129, 1)' // green
                    },
                    {
                        label: '',
                        data: [],
                        backgroundColor: 'rgba(150, 129, 217, 1)' // yellow
                    },
                    {
                        label: '',
                        data: [],
                        backgroundColor: 'rgba(213, 129, 217, 1)' // red
                    },
                    {
                        label: '',
                        data: [],
                        backgroundColor: 'rgba(129, 160, 217, 1)' // green
                    },
                    {
                        label: '',
                        data: [],
                        backgroundColor: '#FAEBCC' // yellow
                    },
                    {
                        label: '',
                        data: [],
                        backgroundColor: '#D6E9C6' // red
                    },
                    {
                        label: '',
                        data: [],
                        backgroundColor: '#EBCCD1' // red
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
            },
            leastApplication: {
                labels: [
                    'Executive',
                    'Senior Software Engineer',
                    'CEO',
                    'Mid-Level Engineer',
                    'System Administrator'

                ],
                datasets: [{
                    data: [25, 87, 12, 56, 40],
                    backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#C1E6D4',
                    '#EFC2DB'

                    ],
                    hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#729784',
                    '#FFD7EE'
                    ]
                }]
            }
        }
    }
    componentDidMount() {
        //Get Number of Saved Jobs0
        axios.get(`http://localhost:3001/recruiter/firstTen`)
            .then((response) => {
                var tempA = []
                console.log(response.data);
                response.data.map((data, i) => {
                    tempA = data.appArray;
                    // if (response.status === 200) {
                    //     tempA.push(data.appArray)
                    //     tempB.push(data.jobTitle)

                    // }
                    // console.log("tempB" + tempB)
                    this.setState({
                        ...this.state.chartDatafirstTen.datasets[i].label = data.jobTitle,
                        ...this.state.chartDatafirstTen.datasets[i].data = tempA
                    })
                })
                console.log(this.state.chartDatafirstTen.datasets);
            });

        axios.get(`http://localhost:3001/recruiter/getAllJobs`)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    dropDownData: response.data
                });
            });

    }
    render() {
        let dropDownData = this.state.dropDownData;
        let optionItems = dropDownData.map((dropDownData) =>
            <option key={dropDownData.jobTitle}>{dropDownData.jobTitle}</option>
        );
        console.log("OPTION ITEMS");
        return (
            <div>
                <NavbarLinkedin />
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div className='row'> */}
                {/* <div className='col-md-6'> */}
                    <div className="container ad-container1">
                        {/* <select>
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="mercedes">Mercedes</option>
                            <option value="audi">Audi</option>
                        </select> */}
                        {/* {['jobTitle'].map(key => (
                            <select key={key}>
                                {this.state.dropDownData.map(({ [key]: value }) => <option value={value}>{value}</option>)}
                            </select>
                            
                        ))} */}
                        <select>
                            {optionItems}
                        </select>
                    </div>
                </div>
                <div className='row'>
                
                <div className="container">
                    {['job'].map(key => (
                        <select key={key}>
                            {this.state.dropDownData.map(({ [key]: value }) => <option key={value}>{value}</option>)}
                        </select>
                    ))}
                    <Bar data={this.state.chartDatafirstTen}
                        options={{
                            maintainAspectRatio: true,
                            title: {
                                display: true,
                                text: 'First Ten Graph',
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
                                    { stacked: true },
                                ]
                            }
                        }}></Bar>

                        <Bar data={this.state.chartDataCityChart}
                        options={{
                            maintainAspectRatio: true,
                            title: {
                                display: true,
                                text: 'City Wise Application Graph',
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
                                    { stacked: true },
                                ]
                            }
                        }}></Bar>
                        <Bar data={this.state.leastApplication}
                        options={{
                            maintainAspectRatio: true,
                            title: {
                                display: true,
                                text: 'Least Applications Graph',
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
                                    { stacked: true },
                                ]
                            }
                        }}></Bar>
                </div>
            </div >
            </div>
        );
    }
}

export default RecruiterDashboard;