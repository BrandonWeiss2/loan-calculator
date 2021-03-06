import React, { Component } from 'react';
import Chart from "chart.js";

const Context = React.createContext({
  loanDetails: {},
  loanStartDate: '',
  extraLoanDetails: {},
  selectMonths: [],
  selectYears: [],
  totalInterestPaid: '',
  showAmortizationTable: '',
  amortizationTable: [],
  showExtraPayments: '',
  payoffDate: '',
  handleSetLoanDetails: () => {},
  handleSetLoanStartDate: () => {},
  handleSetExtraLoanDetails: () => {},
  handlesSetTotalInterestPaid: () => {},
  handleSetShowAmortizationTable: () => {},
  handleCalculateAmortization: () => {},
  handleSetShowExtraPayments: () => {},
})
export default Context

export class Provider extends Component {  
  constructor() {
    super();

    //sets default value of loan start date to today's date
    let today = new Date()
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    let date = `${year}-${month<10?`0${month}`:`${month}`}-${day}`

    let extraLoanDetails = {
      extraMonthlyPayment: 0,
      extraYearlyPayment: {
        payment: 0,
        month: null
      },
      extraOneTimePayment: {
        payment: 0,
        month: null,
        year: null
      },
    }

    let selectMonths = [{text: 'January', value: 1}, {text: 'February', value: 2}, {text: 'March', value: 3}, {text: 'April', value: 4}, {text: 'May', value: 5}, {text: 'June', value: 6}, {text: 'July', value: 7}, {text: 'August', value: 8}, {text: 'September', value: 9}, {text: 'October', value: 10}, {text: 'November', value: 11}, {text: 'December', value: 12}]
    let selectYears = []
    for (let i = 0; i < 60; i++) {
      selectYears.push({
        text: year + i,
        value: year + i,
      })
    }

    this.state = {
      loanDetails: {},
      loanStartDate: date,
      extraLoanDetails,
      selectMonths,
      selectYears,
      totalInterestPaid: '',
      showAmortizationTable: '',
      amortizationTable: [],
      showExtraPayments: false,
      payoffDate: '',
    };
  }

  handleSetLoanDetails = (val) => {
    this.setState({ loanDetails: val })
  }

  handleSetLoanStartDate = async (val) => {
    await this.setState({ loanStartDate: val })
    await this.handleCalculateAmortization()
  }

  handleSetExtraLoanDetails = (val) => {
    this.setState({ extraLoanDetails: val })
  }

  handlesSetTotalInterestPaid = (val) => {
    this.setState({ totalInterestPaid: val })
  }

  handleSetShowAmortizationTable = (val) => {
    this.setState({ showAmortizationTable: val })
  }

  handleSetShowExtraPayments = (val) => {
    this.setState({ showExtraPayments: val })
  }

  handleCalculateAmortization = async () => {
    //sets variables for amortization calculation
    let amort = []
    let totalPayment = this.state.loanDetails.monthlyPayment
    let r = this.state.loanDetails.r
    let n = this.state.loanDetails.n
    let remainingBalance = this.state.loanDetails.totalPrincipal
    let totalInterest = null
    let paymentDateMonth = parseInt(this.state.loanStartDate.slice(5,7))
    let paymentDateYear = parseInt(this.state.loanStartDate.slice(0,4))
    let extraLoanDetails = this.state.extraLoanDetails

    //checks if user applied extra monthly payments, then appropriately applies them to amort calculation
    if (extraLoanDetails.extraMonthlyPayment > 0) {
      totalPayment += extraLoanDetails.extraMonthlyPayment
    }

    //formats a number to USD currency $ 
    const currencyFormatUSD = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    })

    for (let i = 0; i < n; i++) {
      //checks if user applied extra yearly payments and extra one-time payment, then appropriately applies them to amort calculation
      if (extraLoanDetails.extraYearlyPayment.payment > 0 && extraLoanDetails.extraYearlyPayment.month === paymentDateMonth) {
        totalPayment += extraLoanDetails.extraYearlyPayment.payment
      }
      if (extraLoanDetails.extraOneTimePayment.payment > 0 && extraLoanDetails.extraOneTimePayment.month === paymentDateMonth && extraLoanDetails.extraOneTimePayment.year === paymentDateYear) {
        totalPayment += extraLoanDetails.extraOneTimePayment.payment
      }

      let interestPayment = r * remainingBalance
      let principalPayment = totalPayment - interestPayment

      //converts date to proper format
      let currentMonth = ''

      switch (paymentDateMonth) {
        case 1:
          currentMonth = 'Jan'
          break
        case 2:
          currentMonth = 'Feb'
          break
        case 3:
          currentMonth = 'Mar'
          break
        case 4:
          currentMonth = 'Apr'
          break
        case 5:
          currentMonth = 'May'
          break
        case 6:
          currentMonth = 'Jun'
          break
        case 7:
          currentMonth = 'Jul'
          break
        case 8:
          currentMonth = 'Aug'
          break
        case 9:
          currentMonth = 'Sep'
          break
        case 10:
          currentMonth = 'Oct'
          break
        case 11:
          currentMonth = 'Nov'
          break
        case 12:
          currentMonth = 'Dec'
          break
      }

      //makes sure final payment does not exceed remaining loan balance
      if (principalPayment > remainingBalance) {
        principalPayment = remainingBalance
        totalPayment = principalPayment + interestPayment
      }

      totalInterest += interestPayment
      remainingBalance -= principalPayment

      //adds an object to the amort array containing payment details for each month
      amort.push({
        paymentDate: currentMonth + ' ' + paymentDateYear,
        totalPayment: currencyFormatUSD.format(totalPayment.toFixed(2)),
        interestPayment: currencyFormatUSD.format(interestPayment.toFixed(2)),
        principalPayment: currencyFormatUSD.format(principalPayment.toFixed(2)),
        totalInterest: currencyFormatUSD.format(totalInterest.toFixed(2)),
        balance: currencyFormatUSD.format(remainingBalance.toFixed(2)),
      })

      //if remaining balance is 0, the loop ends
      if(remainingBalance < .01) {
        await this.handlesSetTotalInterestPaid(totalInterest)
        await this.calculateEstimatedPayoffDate(this.state.loanStartDate.slice(8,10), paymentDateMonth, paymentDateYear)
        break;
      }

      //removes annual payment and one-time payment applied to total payment 
      if (extraLoanDetails.extraYearlyPayment.payment > 0 && extraLoanDetails.extraYearlyPayment.month === paymentDateMonth) {
        totalPayment -= extraLoanDetails.extraYearlyPayment.payment
      }
      if (extraLoanDetails.extraOneTimePayment.payment > 0 && extraLoanDetails.extraOneTimePayment.month === paymentDateMonth && extraLoanDetails.extraOneTimePayment.year === paymentDateYear) {
        totalPayment -= extraLoanDetails.extraOneTimePayment.payment
      }
      

      //increments the payment date 
      if(paymentDateMonth === 12) {
        paymentDateMonth = 1
        paymentDateYear++
      } else {
        paymentDateMonth++
      }
    }
    console.log('handleCalculateAmortization', amort)
    await this.setState({
      amortizationTable: amort
    })
  }

  calculateEstimatedPayoffDate = (day, month, year) => {
    let payoffDay = day
    let payoffMonth 
    switch (month) {
      case 1:
        payoffMonth = 'January'
        break
      case 2:
        payoffMonth = 'February'
        if ((year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0)) {
          if (day > 29) {
            payoffDay = 29
          } 
        } else if (day > 28) {
          payoffDay = 28
        }
        break
      case 3:
        payoffMonth = 'March'
        break
      case 4:
        payoffMonth = 'April'
        if (day > 30) {
          payoffDay = 30
        }
        break
      case 5:
        payoffMonth = 'May'
        break
      case 6:
        payoffMonth = 'June'
        if (day > 30) {
          payoffDay = 30
        }
        break
      case 7:
        payoffMonth = 'July'
        break
      case 8:
        payoffMonth = 'August'
        break
      case 9:
        payoffMonth = 'September'
        if (day > 30) {
          payoffDay = 30
        }
        break
      case 10:
        payoffMonth = 'October'
        break
      case 11:
        payoffMonth = 'November'
        if (day > 30) {
          payoffDay = 30
        }
        break
      case 12:
        payoffMonth = 'December'
        break
    }
    let payoffDate = `${payoffMonth} ${payoffDay}, ${year}`
    this.setState({ payoffDate: payoffDate})
  }




  render() {
    const value = {
      loanDetails: this.state.loanDetails,
      loanStartDate: this.state.loanStartDate,
      extraLoanDetails: this.state.extraLoanDetails,
      selectMonths: this.state.selectMonths,
      selectYears: this.state.selectYears,
      totalInterestPaid: this.state.totalInterestPaid,
      showAmortizationTable: this.state.showAmortizationTable,
      amortizationTable: this.state.amortizationTable,
      showExtraPayments: this.state.showExtraPayments,
      payoffDate: this.state.payoffDate,
      handleSetLoanDetails: this.handleSetLoanDetails,
      handleSetLoanStartDate: this.handleSetLoanStartDate,
      handleSetExtraLoanDetails: this.handleSetExtraLoanDetails,
      handlesSetTotalInterestPaid: this.handlesSetTotalInterestPaid,
      handleSetShowAmortizationTable: this.handleSetShowAmortizationTable,
      handleCalculateAmortization: this.handleCalculateAmortization,
      handleSetShowExtraPayments: this.handleSetShowExtraPayments,
    }
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    )
  }
}