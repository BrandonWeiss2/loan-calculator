import React, { Component } from 'react';

export default class Select extends Component {
  
  renderOptions = () => {
    return this.props.options.map(option => {
      return (
        <option value={option.value}>{option.text}</option>
      )
    })
  }

  render() {
    return (
      <select className={this.props.selectClass} id={this.props.selectId} name={this.props.selectName}> 
        {this.renderOptions()}
      </select>
    )
  }
}
