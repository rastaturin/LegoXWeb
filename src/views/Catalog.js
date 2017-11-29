import React, { Component } from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import LegoSet from './LegoSet';
import Themes from './Themes';
import Jumbo from './Jumbo';

const config = require('../config');
const ApiClient = require('../ApiClient');

const legorow = {
    display: 'flex',
    flexWrap: 'wrap',
};

export default class Catalog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'sets': [],
            'searchYear': 2017,
            'searchTheme': '',
        };

        this.search();
    }

    search(e) {
        getClient().getSets(this.state.searchTheme, this.state.searchYear, (result) => {
            this.setState({'sets': result.sets});
            console.log(result);
        })
    }

    handleYear(e) {
        this.setState({searchYear: e.target.value});
    }

    handleTheme(e) {
        this.setState({searchTheme: e.target.value});
    }

    render() {
        return (
            <div>
                <Jumbo title={'Catalog'} text={'Chose the Lego sets you wish to buy or swap.'}/>

                <Form inline>
                    <FormGroup>
                        <Input type="select" name="yearSelect" id="yearSelect" onChange={event => this.handleYear(event)}>
                            <option value={'0'}>All</option>
                            <option selected={'selected'}>2017</option>
                            <option>2016</option>
                            <option>2015</option>
                            <option>2014</option>
                            <option>2013</option>
                            <option>2012</option>
                            <option>2011</option>
                            <option>2010</option>
                            <option>2009</option>
                            <option>2008</option>
                            <option>2007</option>
                            <option>2006</option>
                            <option>2005</option>
                            <option>2004</option>
                            <option>2003</option>
                            <option>2002</option>
                            <option>2001</option>
                            <option>2000</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Themes onChange={event => this.handleTheme(event)}/>
                    </FormGroup>
                    <Button onClick={event => this.search(event)}>Search</Button>
                </Form>

                <div style={legorow}>
                {this.state.sets.map(function(d, idx){
                    return (<LegoSet set={d} />)
                        })
                }
                </div>
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