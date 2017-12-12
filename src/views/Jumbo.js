import React, { Component } from 'react';

export default class Jumbo extends Component {
    render() {
        return (
        <div className="jumbotron">
            <div className="container">
                <h1 className="display-3">{this.props.title}</h1>
                <p>{this.props.text}</p>
            </div>
        </div>
        )
    }
}