import React, { Component } from 'react';
import Context from '../../context/Context';
import AmortizationStartDate from '../amortizationStartDate/AmortizationStartDate';

export default class AmortizationTable extends Component {
  static contextType = Context

  state = {
    loanStartDate: '',
    headers: ['Payment Date', 'Payment', 'Principal', 'Interest', 'Total Interest', 'Balance']
  }

  componentDidMount() {
    this.context.handleCalculateAmortization()
  }

  renderTableHeaders = () => {
    return this.state.headers.map(header => {
      return (
        <div className='amortTableHeader'>
          {header}
        </div>
      )
    })
  }

  updateLoanStartDate = (val) => {
    this.setState({
      loanStartDate: val
    })
  }

  renderAmortTable = () => {
    return this.context.amortizationTable.map(payment => {
      return (
        <div className='amortTableRow'>
          <div className='amortTableCell'>
            {payment.paymentDate}
          </div>
          <div className='amortTableCell'>
            {payment.totalPayment}
          </div>
          <div className='amortTableCell'>
            {payment.principalPayment}
          </div>
          <div className='amortTableCell'>
            {payment.interestPayment}
          </div>
          <div className='amortTableCell'>
            {payment.totalInterest}
          </div>
          <div className='amortTableCell'>
            {payment.balance}
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        <AmortizationStartDate 
          updateLoanStartDate={this.updateLoanStartDate}
        />
        <div className='amortTableContainer'>
          <div className='amortTableHeaderContainer'>
            {this.renderTableHeaders()}
          </div>
          <div className='amortTableBody'>
            {this.renderAmortTable()}
          </div>
        </div>
      </div>
    )
  }
}
