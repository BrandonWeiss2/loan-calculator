import React, { Component } from 'react'
import LoanCalculator from './components/loanCalculator/LoanCalculator'
import './App-Desktop.css'
import './App-Mobile.css'

export default class App extends Component {
  render() {
    return (
      <div>
        <LoanCalculator />
      </div>
    )
  }
}