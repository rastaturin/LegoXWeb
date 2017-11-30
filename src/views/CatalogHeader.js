import React, { Component } from 'react';

export default class CatalogHeader extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <h1 className="display-3">{this.props.title}</h1>
          <p>{this.props.text}</p>
        </div>
      </div>
    )
  }
}