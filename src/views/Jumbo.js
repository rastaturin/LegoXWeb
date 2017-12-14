import React, { Component } from 'react';
import '../styles/Jumbo.css';

export default class Jumbo extends Component {
    render() {
      return (
      <div className="jumbotron jumboLayout">
        <h1 className="display-3 jumboTitle">{this.props.title}</h1>
        <p className="jumboSubTitle">{this.props.text}</p>
      </div>
      )
    }
}