import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default class Header extends Component {
  render() {
    return (
      <div className='headerContainer'>
        <h3><span>LOAN CALCULA</span><span><FontAwesomeIcon className='plus' id={'plusIcon'} icon={faPlus} /></span><span class={'headerOR'}>OR</span></h3>
      </div>
    )
  }
}
