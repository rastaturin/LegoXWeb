import React, { Component } from 'react';
import sadlego from '../images/404lego.jpg';
import '../styles/404.css';

export default class NoMatch extends Component {

  render() {
    return (
      <div className="container not-found">
        <h3>No match for <code>{this.props.location.pathname}</code></h3>
        <img src={sadlego} alt="Not Found" />
      </div>
    )
  }
}