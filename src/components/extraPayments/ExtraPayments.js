import React, { Component } from 'react';
import Input from '../general/input/Input';
import Button from '../general/button/Button';
import Context from '../../context/Context';
import Select from '../general/select/Select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

export default class ExtraPayments extends Component {
  static contextType = Context

  state = {
    extraMonthlyPayment: 0,
    showExtraPayments: false,
  }

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    let buttonClass = '' 
    if (!this.state.showExtraPayments) {
      buttonClass =  <div>Extra Payments<span><FontAwesomeIcon className='angleUpIcon' icon={faAngleUp} /></span></div>
    } else {
      buttonClass =  <div>Extra Payments<span><FontAwesomeIcon className='angleDownIcon' icon={faAngleDown} /></span></div>
    }

    return (
      <div>
        <Button
          onClick={() => this.setState({ showExtraPayments: !this.state.showExtraPayments })}
          buttonText={buttonClass}
          buttonClass='showExtraPaymentsButton'
        />
          <Input
            inputType={'text'}
            inputId={'extraMonthlyPayment'}
            inputName={'extraMonthlyPayment'}
            labelText={'Extra Monthly Payment'}
            value={this.state.extraMonthlyPayment}
            onChange={this.onInputChange}
            inputContainerClass={'extraMonthlyPaymentInputContainer'}
          />
          <div className='extraYearlyPaymentContainer'>
            <Input
              inputType={'text'}
              inputId={'extraYearlyPayment'}
              inputName={'extraYearlyPayment'}
              labelText={'Extra Annual Payment'}
              value={this.state.extraYearlyPayment}
              onChange={this.onInputChange}
              inputContainerClass={'extraYearlyPaymentInputContainer'}
            />
            <div className='selectContainer'>
              <p>In:</p>
              <Select
                selectId={'extraYearlyPaymentMonth'}
                selectName={'extraYearlyPaymentMonth'}
                options={this.context.selectMonths}
              />
            </div>

          </div>
          <div className='extraOneTimePaymentContainer'>
            <Input
              inputType={'text'}
              inputId={'extraOneTimePayment'}
              inputName={'extraOneTimePayment'}
              labelText={'Extra One-time Payment'}
              value={this.state.extraOneTimePayment}
              onChange={this.onInputChange}
              inputContainerClass={'extraOneTimePaymentInputContainer'}
            />
            <div className='selectContainer'>
              <p>In:</p>
              <Select
                selectId={'extraOneTimePaymentMonth'}
                selectName={'extraOneTimePaymentMonth'}
                options={this.context.selectMonths}
              />
              <Select
                selectId={'extraOneTimePaymentYear'}
                selectName={'extraOneTimePaymentYear'}
                options={this.context.selectYears}
              />
            </div>

          </div>
      </div>
    )
  }
}
