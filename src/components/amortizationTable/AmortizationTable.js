import React, { Component } from 'react';
import Context from '../../context/Context';
import AmortizationStartDate from '../amortizationStartDate/AmortizationStartDate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Button from '../general/button/Button';

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
    return this.state.headers.map((header, index) => {
      return (
        <div className='amortTableHeader' id={`amortTableHeader${index +1}`}>
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
    return this.context.amortizationTable.map((payment, index) => {
      return (
        <div className='amortTableRow'>
          <div className={`amortTableCell amortTableColumn1`} id={`amortTableCell${index + 1}`}>
            {payment.paymentDate}
          </div>
          <div className={`amortTableCell amortTableColumn2`} id={`amortTableCell${index + 1}`}>
            {payment.totalPayment}
          </div>
          <div className={`amortTableCell amortTableColumn3`} id={`amortTableCell${index + 1}`}>
            {payment.principalPayment}
          </div>
          <div className={`amortTableCell amortTableColumn4`} id={`amortTableCell${index + 1}`}>
            {payment.interestPayment}
          </div>
          <div className={`amortTableCell amortTableColumn5`} id={`amortTableCell${index + 1}`}>
            {payment.totalInterest}
          </div>
          <div className={`amortTableCell amortTableColumn6`} id={`amortTableCell${index + 1}`}>
            {payment.balance}
          </div>
        </div>
      )
    })
  }

  render() {
    let buttonClass = '' 
    if (!this.context.showAmortizationTable) {
      buttonClass = <div>Hide Amortization Table<span><FontAwesomeIcon className='angleUpIcon' icon={faAngleUp} /></span></div>
    } else {
      buttonClass = <div>Show Amortization Table<span><FontAwesomeIcon className='angleUpIcon' icon={faAngleDown} /></span></div>
    }
    return (
      <div className='amortizationTableContainer'>
        <div className='amortizationTableButtonContainer'>
          <Button 
            onClick={() => this.context.handleSetShowAmortizationTable(!this.context.showAmortizationTable)}
            buttonText={buttonClass}
            buttonClass={'showAmortTableButton'}
          />
        </div>
        {!this.context.showAmortizationTable &&
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
        }
      </div>
    )
  }
}
