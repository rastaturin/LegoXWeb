import React, { Component } from 'react';
import '../styles/CatalogHeader.css';

export default class CatalogHeader extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-lg-12 catalogBanner">
          <h1 className="display-3 catalogTitle">{this.props.title}</h1>
          <p className="catalogSubTitle">{this.props.text}</p>
        </div>
      </div>
    )
  }
}