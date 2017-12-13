import React, { Component } from 'react';
import { Table } from 'reactstrap';
import Jumbo from './Jumbo';
import '../styles/SetSale.css';

const config = require('../config');
const ApiClient = require('../ApiClient');

export default class SetSale extends Component {

    constructor(props) {
        super(props);
        this.state = {
            set: {
                sales:[]
            }
        };

        getClient().getSet(this.props.match.params.key, (result) => {
            this.setState({'set': result.set});
            console.log(result);
        })
    }

    render() {
        return (
            <div className="setSaleView">
                <Jumbo title={this.state.set.name} text={'ID: ' + this.props.match.params.key}/>
                <img src={this.state.set.img}/>
                <h2>Sales</h2>
                <Table>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.set.sales.map(function(d, idx){
                        return (<tr><td>{d.user}</td><td>${d.price}</td></tr>)
                    })}
                    </tbody>
                </Table>

            </div>
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
