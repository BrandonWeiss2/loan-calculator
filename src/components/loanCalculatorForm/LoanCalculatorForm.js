import React, { Component } from 'react';
import Input from '../general/input/Input';
import Button from '../general/button/Button';
import Context from '../../context/Context'
import ExtraPayments from '../extraPayments/ExtraPayments';
import LoanResults from '../loanResults/LoanResults';

export default class LoanCalculatorForm extends Component {
  static contextType = Context

  //stores default values for loan calulator
  state = {
    loanAmount: 5000,
    loanTermMonths: 60,
    interestRate: .045,
  }

  componentDidMount() {
    //runs initial loan calc
    let a = this.state.loanAmount
    let r = this.state.interestRate / 12
    let n = this.state.loanTermMonths
    let d = (((1 + r)**n) - 1) / (r*(1 + r)**n)
    let loanDetails = {
      r,
      n,
      monthlyPayment: a / d,
      totalPrincipal: a,
      totalInterest: (a / d) * n - a,
    }
    //stores loan details in context
    this.context.handleSetLoanDetails(loanDetails)

  }

  //changes the default input value to user input value
  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  

  //button click gets value from inputs
  handleClickCalculate = async (event) => {
    event.preventDefault()
    const { loanAmount, loanTermMonths, interestRate } = event.target
    let a = loanAmount.value
    let r = interestRate.value / 12
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
    const { extraMonthlyPayment, extraYearlyPayment, extraYearlyPaymentMonth, extraOneTimePayment, extraOneTimePaymentMonth, extraOneTimePaymentYear } = event.target
    console.log(extraMonthlyPayment.value)
    let extraLoanDetails = {
      extraMonthlyPayment: parseInt(extraMonthlyPayment.value),
      extraYearlyPayment: {
        payment: parseInt(extraYearlyPayment.value),
        month: parseInt(extraYearlyPaymentMonth.value)
      },
      extraOneTimePayment: {
        payment: parseInt(extraOneTimePayment.value),
        month: parseInt(extraOneTimePaymentMonth.value),
        year: parseInt(extraOneTimePaymentYear.value)
      },
    }

    await this.context.handleSetExtraLoanDetails(extraLoanDetails)
    await this.context.handleCalculateAmortization()
  }

  render() {
    return (
      <form onSubmit={this.handleClickCalculate} className='loanCalculatorForm'>
        <h3>Loan Calculator</h3>
        <div className='loanCalculatorResultsContainer'>
          <div>
            <Input 
              inputType={'text'}
              inputId={'loanAmount'}
              inputName={'loanAmount'}
              labelText={'Loan Amount'}
              value={this.state.loanAmount}
              onChange={this.onInputChange}
              inputContainerClass={'loanAmountInputContainer'}
              labelClass={'loanAmountLabel'}
            />
            <Input 
              inputType={'text'}
              inputId={'loanTermMonths'}
              inputName={'loanTermMonths'}
              labelText={'Loan Term (Months)'}
              value={this.state.loanTermMonths}
              onChange={this.onInputChange}
              inputContainerClass={'loanTermMonthsInputContainer'}
              labelClass={'loanTermMonthsLabel'}
            />
            <Input 
              inputType={'text'}
              inputId={'interestRate'}
              inputName={'interestRate'}
              labelText={'Anual Interest Rate'}
              value={this.state.interestRate}
              onChange={this.onInputChange}
              inputContainerClass={'interestRateInputContainer'}
              labelClass={'interestRateLabel'}
            />
            <ExtraPayments />
          </div>
          <div>
            <LoanResults />
          </div>
        </div>
        <div className={'loanCalculateButtonContainer'}>
          <Button 
            buttonType={'submit'}
            buttonText={'Calculate'}
            buttonClass={'loanCalculateButton'}
          />
        </div>
      </form>
    )
  }
}
