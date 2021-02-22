import React, { Component } from 'react'

export default class input extends Component {
  render() {
    return (
      <div className={this.props.inputContainerClass}>
        <input
          className={this.props.inputClass}
          type={this.props.inputType}
          id={this.props.inputId}
          name={this.props.inputName}
          value={this.props.value}
          onChange={this.props.onChange}
          onKeyDown={this.props.onKeyDown}
          placeholder={this.props.placeholder}
        >
        </input>
        <label className={this.props.labelClass} htmlFor={this.props.inputId}><span>{this.props.labelText}</span></label>
      </div>
    )
  }
}
