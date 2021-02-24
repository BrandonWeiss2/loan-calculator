import React, { Component } from 'react';
import Input from '../general/input/Input';
import Button from '../general/button/Button';
import Context from '../../context/Context'
import ExtraPayments from '../extraPayments/ExtraPayments';
import LoanResults from '../loanResults/LoanResults';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import Chart from "chart.js";
import Header from '../header/Header';

let myDonutChart;

export default class LoanCalculatorForm extends Component {
  static contextType = Context

  chartRef = React.createRef();

  //stores default values for loan calulator
  state = {
    loanAmount: '',
    loanTermMonths: '',
    interestRate: '',
  }

  //changes the default input value to user input value
  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  //makes sure any dollar amount entered is displayed with correct format
  onInputChangeDollar = (event) => {
    let x = parseInt(document.forms['loanCalculatorForm']['loanAmount'].value)
    console.log('x', x, typeof(x))
    if (typeof(x) !== 'number') {
      this.setState({
        [event.target.name]: 'Please Enter A Number'
      })
      alert("Name must be filled out");
      return false;
    }

    let results = event.target.value.replace(/,/g, "")
    this.setState({
      [event.target.name]: new Intl.NumberFormat().format(results)
    })
  }

  //button click gets value from inputs
  handleClickCalculate = async (event) => {
    console.log('handle click calc')
    event.preventDefault()
    const { loanAmount, loanTermMonths, interestRate } = event.target
    let a = loanAmount.value.replace(/,/g, "")
    let r = (interestRate.value / 100) / 12
    let n = loanTermMonths.value
    let d = (((1 + r)**n) - 1) / (r*(1 + r)**n)
    let loanDetails = {
      r,
      n,
      monthlyPayment: a / d,
      totalPrincipal: a,
      totalInterest: (a / d) * n - a,
    }

    //stores loan details in context
    await this.context.handleSetLoanDetails(loanDetails)
    await this.context.handleCalculateAmortization()

    //handles all extra payment details
    if (this.context.showExtraPayments) {
      const { extraMonthlyPayment, extraYearlyPayment, extraYearlyPaymentMonth, extraOneTimePayment, extraOneTimePaymentMonth, extraOneTimePaymentYear } = event.target
      let extraLoanDetails = {
        extraMonthlyPayment: parseInt(extraMonthlyPayment.value.replace(/,/g, "")),
        extraYearlyPayment: {
          payment: parseInt(extraYearlyPayment.value.replace(/,/g, "")),
          month: parseInt(extraYearlyPaymentMonth.value)
        },
        extraOneTimePayment: {
          payment: parseInt(extraOneTimePayment.value.replace(/,/g, "")),
          month: parseInt(extraOneTimePaymentMonth.value),
          year: parseInt(extraOneTimePaymentYear.value)
        },
      }
      await this.context.handleSetExtraLoanDetails(extraLoanDetails)
      await this.context.handleCalculateAmortization()
    }
    await this.buildChart()
  }

  // controls all settings for donutchart
  buildChart = () => {
    console.log('chart build')
    const myChartRef = this.chartRef.current.getContext("2d");

    let totalInterest = this.context.totalInterestPaid
    let totalPrincipal = this.context.loanDetails.totalPrincipal
    if (!totalInterest) {
      totalInterest = 0
    } else {
      totalInterest = totalInterest.toFixed(2)
    }
    if (!totalPrincipal) {
      totalPrincipal = 0
    }

    if (typeof myDonutChart !== "undefined") myDonutChart.destroy();

    myDonutChart = new Chart(myChartRef, {
      type: "doughnut",
      data: {
        //Bring in data
        labels: ["Principal", "Interest"],
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
        },
        animation: {
          animateRotate: true
        }
      },
    });
  }

  render() {
    return (
      <form onSubmit={this.handleClickCalculate} className='loanCalculatorForm' name='loanCalculatorForm'>
        <Header />
        <div className='loanCalculatorResultsContainer'>
          <div className='calculatorContainer'>
            <SimpleBar style={{ maxHeight: 360 }}>
              <div className='calculatorRelative'>
                <div className='calculatorWrapper'>
                  <Input
                    inputType={'text'}
                    inputId={'loanAmount'}
                    inputName={'loanAmount'}
                    inputClass={'loanCalcInput'}
                    labelText={'Loan Amount'}
                    value={this.state.loanAmount}
                    onChange={this.onInputChangeDollar}
                    inputContainerClass={'loanAmountInputContainer'}
                    labelClass={'loanCalcLabel'}
                    placeholder={'Loan Amount'}
                  />
                  <Input
                    inputType={'text'}
                    inputId={'loanTermMonths'}
                    inputName={'loanTermMonths'}
                    inputClass={'loanCalcInput'}
                    labelText={'Loan Term (Months)'}
                    value={this.state.loanTermMonths}
                    onChange={this.onInputChange}
                    inputContainerClass={'loanTermMonthsInputContainer'}
                    labelClass={'loanCalcLabel'}
                    placeholder={'Loan Term (Months)'}
                  />
                  <Input
                    inputType={'text'}
                    inputId={'interestRate'}
                    inputName={'interestRate'}
                    inputClass={'loanCalcInput'}
                    labelText={'Anual Interest Rate'}
                    value={this.state.interestRate}
                    onChange={this.onInputChange}
                    inputContainerClass={'interestRateInputContainer'}
                    labelClass={'loanCalcLabel'}
                    placeholder={'Anual Interest Rate'}
                  />
                  <ExtraPayments
                    onInputChangeDollar={this.onInputChangeDollar}
                  />
                </div>
              </div>
            </SimpleBar>
          </div>
          <div style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <LoanResults />
            <div >
              <canvas
                id="myChart"
                ref={this.chartRef}
              />
            </div>
            <div className={'loanCalculateButtonContainer'}>
              <Button
                buttonType={'submit'}
                buttonText={'Calculate'}
                buttonClass={'loanCalculateButton'}
              />
            </div>
          </div>
        </div>
        <div className='gradientColor'></div>
      </form>
    )
  }
}
