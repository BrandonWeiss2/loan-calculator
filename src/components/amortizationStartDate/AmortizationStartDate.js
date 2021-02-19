import React, { Component } from 'react';
import Input from '../general/input/Input';
import Context from '../../context/Context';

export default class AmortizationStartDate extends Component {
  static contextType = Context

  //changes the default input value to user input value
  onInputChange = async (event) => {
    await this.context.handleSetLoanStartDate(event.target.value)
    await this.props.updateLoanStartDate(event.target.value)
  }

  render() {
    return (
      <div>
        <Input 
          inputType={'date'}
          inputId={'loanStartDate'}
          inputName={'loanStartDate'}
          labelText={'Start Date'}
          value={this.context.loanStartDate}
          onChange={this.onInputChange}
        />
      </div>
    )
  }
}
