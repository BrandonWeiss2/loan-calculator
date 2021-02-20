import React, { Component } from 'react';
import Context from '../../context/Context';
import AmortizationTable from '../amortizationTable/AmortizationTable';
import LoanCalculatorForm from '../loanCalculatorForm/LoanCalculatorForm';

export default class LoanCalculator extends Component {
  static contextType = Context

  render() {
    return (
      <div>
        <div className='loanFormAndResultsContainer'>
          <LoanCalculatorForm />
        </div>
        <AmortizationTable />
      </div>
    )
  }
}