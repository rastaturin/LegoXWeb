import React, { Component } from 'react';
import { Input } from 'reactstrap';

const config = require('../config');
const ApiClient = require('../ApiClient');

export default class Themes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'themes': []
        };

        getClient().getThemes((result) => {
            this.setState({'themes': result.themes});
            console.log(result);
        })
    }

    render() {
        return (
            <Input type="select" name="themeSelect" id="themeSelect" onChange={this.props.onChange}>
                <option value={''}>Theme</option>
                {this.state.themes.map(function(d, idx){
                    return (<option key={idx} value={d.key}>{d.name}</option>)
                })}
            </Input>
        )
    }
}

/**
 * @returns {ApiClient}
 */
function getClient() {
    const apiBaseUrl = config.api_host;
    return new ApiClient(apiBaseUrl, errorHandler);
}

function errorHandler(error) {
    if (error.response && error.response.status === 401) {
        window.location.href = '/login';
    } else {
        console.log(error);
    }
}