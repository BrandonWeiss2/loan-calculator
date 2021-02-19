import React, { Component } from 'react'
import Context from '../../context/Context'
import Button from '../general/button/Button'

export default class LoanResults extends Component {
  static contextType = Context

  renderTotalInterest = () => {
    if (this.context.totalInterestPaid) {
      return <p>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.context.totalInterestPaid)}</p>
    } else {
      return <p>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.context.loanDetails.totalInterest)}</p>
    }
  }

  renderShowAmortButton = () => {
    if (!this.context.showAmortizationTable) {
      return (
        <Button 
          onClick={() => this.context.handleSetShowAmortizationTable(true)}
          buttonText={'Show amortization table'}
        />
      )
    } else {
      return (
        <Button 
          onClick={() => this.context.handleSetShowAmortizationTable(false)}
          buttonText={'Hide amortization table'}
        />
      )
    }
  }

  render() {
    return (
      <div className='loanResultsContainer'>
        <div>
          <p>Monthly Payments</p>
          <p>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.context.loanDetails.monthlyPayment)}</p>
        </div>
        <div>
          <p>Total Principal Paid</p>
          <p>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.context.loanDetails.totalPrincipal)}</p>
        </div>
        <div>
          <p>Total Interest Paid</p>
          {this.renderTotalInterest()}
        </div>
        {this.renderShowAmortButton()}
      </div>
    )
  }
}
