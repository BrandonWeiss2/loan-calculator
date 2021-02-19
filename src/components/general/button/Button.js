import React, { Component } from 'react'

export default class Button extends Component {
  static defaultProps = {
    onClick: null
  }

  render() {
    return (
      <button className={this.props.buttonClass} type={this.props.buttonType} onClick={this.props.onClick}>{this.props.buttonText}</button>
    )
  }
}
