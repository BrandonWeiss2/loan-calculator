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
    extraYearlyPayment: 0,
    extraOneTimePayment: 0,
  }

  //makes sure any dollar amount entered is displayed with correct format
  onInputChangeDollar = (event) => {
    let results = event.target.value.replace(/,/g, "")
    this.setState({
      [event.target.name]: new Intl.NumberFormat().format(results)
    })
  }

  render() {
    let buttonClass = '' 
    if (!this.context.showExtraPayments) {
      buttonClass = <div>Extra Payments<span><FontAwesomeIcon className='angleUpIcon' icon={faAngleUp} /></span></div>
    } else {
      buttonClass = <div>Extra Payments<span><FontAwesomeIcon className='angleDownIcon' icon={faAngleDown} /></span></div>
    }

    return (
      <div>
        <Button
          onClick={() => this.context.handleSetShowExtraPayments(!this.context.showExtraPayments)}
          buttonText={buttonClass}
          buttonClass={'showExtraPaymentsButton'}
        />
        {this.context.showExtraPayments &&
        <div>
          <Input
            inputType={'text'}
            inputId={'extraMonthlyPayment'}
            inputName={'extraMonthlyPayment'}
            labelText={'Extra Monthly Payment'}
            value={this.state.extraMonthlyPayment}
            onChange={this.onInputChangeDollar}
            inputContainerClass={'extraMonthlyPaymentInputContainer'}
          />
          <div className='extraYearlyPaymentContainer'>
            <Input
              inputType={'text'}
              inputId={'extraYearlyPayment'}
              inputName={'extraYearlyPayment'}
              labelText={'Extra Annual Payment'}
              value={this.state.extraYearlyPayment}
              onChange={this.onInputChangeDollar}
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
              onChange={this.onInputChangeDollar}
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
        }
      </div>
    )
  }
}
