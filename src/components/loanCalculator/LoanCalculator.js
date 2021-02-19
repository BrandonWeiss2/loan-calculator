import React, { Component } from 'react';
import Context from '../../context/Context';
import AmortizationTable from '../amortizationTable/AmortizationTable';
import ExtraPayments from '../extraPayments/ExtraPayments';
import LoanCalculatorForm from '../loanCalculatorForm/LoanCalculatorForm';
import LoanResults from '../loanResults/LoanResults'

export default class LoanCalculator extends Component {
  static contextType = Context

  render() {
    return (
      <div>
        <div className='loanFormAndResultsContainer'>
          <LoanCalculatorForm />
          <LoanResults />
        </div>

        {this.context.showAmortizationTable &&
          <AmortizationTable />
        }
      </div>
    )
  }
}