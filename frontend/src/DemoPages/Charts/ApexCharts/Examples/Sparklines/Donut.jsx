import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class Donut extends Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {
        labels: ['A', 'B', 'C', 'D', 'E'],
        chart: {
          sparkline: {
            enabled: true,
          }
        }
      },
      series: [44, 55, 41, 17, 15],
    }
  }

  render() {

    return (
      <div className="apexcharts-donut">
        <Chart options={this.state.options} series={this.state.series} type="donut" width="100%" />
      </div>
    );
  }
}

export default Donut;
