import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class RadialBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {
        labels: [' '],
        plotOptions: {
          radialBar: {
            hollow: {
              size: '70%',
            }
          },
        },
      },
      series: [68],
    }
  }

  render() {

    return (
      <div className="radialbar">
        <Chart options={this.state.options} series={this.state.series} type="radialBar" height="100%" />
      </div>
    );
  }
}

export default RadialBar;
