import React, { Component } from 'react';
import Chart from "chart.js";
import Context from '../../context/Context';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';

export default class DonutChart extends Component {
  static contextType = Context

  chartRef = React.createRef();

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");
    let totalInterest = this.context.totalInterestPaid
    let totalPrincipal = this.context.loanDetails.totalPrincipal
    if (!totalInterest) {
      totalInterest = 592.91
    } else {
      totalInterest = totalInterest.toFixed(2)
    }
    if (!totalPrincipal) {
      totalPrincipal = 5000
    }

    new Chart(myChartRef, {
      type: "doughnut",
      data: {
        //Bring in data
        labels: ["Princiapl", "Interest"],
        datasets: [
          {
            data: [totalPrincipal, totalInterest],
            backgroundColor: ['#adc6e5', '#4a7fb0'],
          }
        ]
      },
      options: {
        cutoutPercentage: 65,
        legend: {
          labels: {
            fontSize: 20,
          },
        },
        tooltips: {
          bodyFontSize: 16
        }
      },
    });
  }
  render() {
    return (
      <div >
        <canvas
          id="myChart"
          ref={this.chartRef}
        />
      </div>
    )
  }
}