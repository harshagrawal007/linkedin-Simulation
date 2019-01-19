import React from 'react';
import ReactDOM from 'react-dom';
import "../css/chart.css";


import Chart from 'react-google-charts';
// or

// or

// or 
import {Bar} from 'react-chartjs-2';

const data = {
  
  datasets: [{
      label: 'Job1',
      //type:'line',
      data: [22, 44, 11, 99, 66, 88, 49,77,11,22,33,77],
      fill: false,
      borderColor: '#cc6699',
      backgroundColor: '##cc6699',
      pointBorderColor: '#cc6699',
      pointBackgroundColor: '#cc6699',
      pointHoverBackgroundColor: '#cc6699',
      pointHoverBorderColor: '#cc6699',
      yAxisID: 'y-axis-2'
    },{label: 'Job2',
    //type:'line',
    data: [66,44,22,65,87,11,13,45,66,11,14,23],
    fill: false,
    borderColor: '#ffaa00',
    backgroundColor: '#ffaa00',
    pointBorderColor: '#ffaa00',
    pointBackgroundColor: '#ffaa00',
    pointHoverBackgroundColor: '#ffaa00F',
    pointHoverBorderColor: '#ffaa00',
    yAxisID: 'y-axis-2'
  },
  {label: 'Job3',
  //type:'line',
  data: [12,55,77,22,68,90,9,3,88,65,12,45],
  fill: false,
  borderColor: '#EC932F',
  backgroundColor: '#EC932F',
  pointBorderColor: '#EC932F',
  pointBackgroundColor: '#EC932F',
  pointHoverBackgroundColor: '#EC932F',
  pointHoverBorderColor: '#EC932F',
  yAxisID: 'y-axis-2'
},{label: 'Job4',
//type:'line',
data: [45,67,55,12,56,45,55,90,88,27,78,35],
fill: false,
borderColor: '#4da6ff',
backgroundColor: '#4da6ff',
pointBorderColor: '#4da6ff',
pointBackgroundColor: '#4da6ff',
pointHoverBackgroundColor: '#4da6ff',
pointHoverBorderColor: '#4da6ff',
yAxisID: 'y-axis-2'
},{label: 'Job5',
//type:'line',
data: [33,76,90,88,35,76,51,23,29,45,48,40],
fill: false,
borderColor: '#4da6ff',
backgroundColor: '#4da6ff',
pointBorderColor: '#4da6ff',
pointBackgroundColor: '#4da6ff',
pointHoverBackgroundColor: '#4da6ff',
pointHoverBorderColor: '#4da6ff',
yAxisID: 'y-axis-2'
},{label: 'Job6',
//type:'line',
data: [22,9,45,77,89,27,29,32,31,73,88,32],
fill: false,
borderColor: '#7575a3',
backgroundColor: '#7575a3',
pointBorderColor: '#7575a3',
pointBackgroundColor: '#7575a3',
pointHoverBackgroundColor: '#7575a3',
pointHoverBorderColor: '#7575a3',
yAxisID: 'y-axis-2'
},{label: 'Job7',
//type:'line',
data: [22,32,45,63,27,23,88,55,34,87,66,21],
fill: false,
borderColor: '#EC932F',
backgroundColor: '#EC932F',
pointBorderColor: '#EC932F',
pointBackgroundColor: '#EC932F',
pointHoverBackgroundColor: '#EC932F',
pointHoverBorderColor: '#EC932F',
yAxisID: 'y-axis-2'
},{label: 'Job8',
//type:'line',
data: [43,21,54,22,37,38,37,66,42,29,66,9],
fill: false,
borderColor: '#ffb3b3',
backgroundColor: '#ffb3b3',
pointBorderColor: '#ffb3b3',
pointBackgroundColor: '#ffb3b3',
pointHoverBackgroundColor: '#ffb3b3',
pointHoverBorderColor: '#ffb3b3',
yAxisID: 'y-axis-2'
},{label: 'Job9',
//type:'line',
data: [88,54,32,45,78,97,23,28,93,21,22,56],
fill: false,
borderColor: '#EC932F',
backgroundColor: '#EC932F',
pointBorderColor: '#EC932F',
pointBackgroundColor: '#EC932F',
pointHoverBackgroundColor: '#EC932F',
pointHoverBorderColor: '#EC932F',
yAxisID: 'y-axis-2'
},{label: 'Job10',
//type:'line',
data: [66,45,21,78,92,21,27,98,54,44,23,77],
fill: false,
borderColor: '#4d004d',
backgroundColor: '#4d004d',
pointBorderColor: '#4d004d',
pointBackgroundColor: '#4d004d',
pointHoverBackgroundColor: '#4d004d',
pointHoverBorderColor: '#4d004d',
yAxisID: 'y-axis-2'
}]
};
const options = {
  responsive: true,
  tooltips: {
    mode: 'label'
  },
  elements: {
    line: {
      fill: false
    }
  },
  scales: {
    xAxes: [
      {
        stacked:true,
        display: true,
        gridLines: {
          display: false
        },
        labels: {
          show: true
        },
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','Aug','Sep','Oct','nov','Dec'],
      }
    ],
    yAxes: [
      {
        stacked:true,
        //type: 'linear',
        display: true,
        position: 'left',
        id: 'y-axis-1',
        gridLines: {
          display: false
        },
        labels: {
          show: true
        }
      },
      {
        //type: 'linear',
        display: true,
        position: 'right',
        id: 'y-axis-2',
        gridLines: {
          display: false
        },
        labels: {
          show: true
        }
      }
    ]
  }
};

const plugins = [{
    afterDraw: (chartInstance, easing) => {
        const ctx = chartInstance.chart.ctx;
        ctx.fillText("This text drawn by a plugin", 100, 100);
    }
}];

class Charts2 extends React.Component {
  render() {
    return (

<div >

      {/* <Chart
        width={'800px'}
        height={'1400px'}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={[
          ['Job', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'oct', 'Nov', 'Dec'],
          ['Job1', 10, 30, 40, 20, 66, 10, 56, 22, 33, 77, 66, 12],
          ['Job2', 10, 30, 40, 20, 66, 10, 56, 22, 33, 77, 66, 12],
          ['Job3', 10, 30, 40, 20, 66, 10, 56, 22, 33, 77, 66, 12],
          ['Job4', 10, 30, 40, 20, 66, 10, 56, 22, 33, 77, 66, 12],
          ['Job5', 10, 30, 40, 20, 66, 10, 56, 22, 33, 77, 66, 12],
          ['Job6', 10, 30, 40, 20, 66, 10, 56, 22, 33, 77, 66, 12],
          ['Job7', 10, 30, 40, 20, 66, 10, 56, 22, 33, 77, 66, 12],
          ['Job8', 10, 30, 40, 20, 66, 10, 56, 22, 33, 77, 66, 12],
          ['Job9', 10, 30, 40, 20, 66, 10, 56, 22, 33, 77, 66, 12],
          ['Job10', 10, 30, 40, 20, 66, 10, 56, 22, 33, 77, 66, 12],
        ]}
        options={{
          title: 'Number of Applications/Month for first 10 jobs',
          chartArea: { width: '70%' },
          chartArea: { height: '70%' },
          bar: { groupWidth: "400%" },
          hAxis: {
            title: 'Number of Applications/Month',
            minValue: 0,
          },
          vAxis: {
            title: 'Job',
          },
        }}
        // For tests
        rootProps={{ 'data-testid': '1' }}
      /> */}

      <h2>Mixed data Example</h2>
        <Bar
          data={data}
          options={options}
          plugins={plugins}
        />
      

</div>
    )
  }
}

//ReactDOM.render(<Charts1/>, mountNode);
export default Charts2;