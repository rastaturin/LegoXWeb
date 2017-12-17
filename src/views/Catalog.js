import React, { Component } from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import LegoSet from './LegoSet';
import Themes from './Themes';
import CatalogHeader from './CatalogHeader';
import SetsPagination from './SetsPagination';
import '../styles/Catalog.css';

const config = require('../config');
const ApiClient = require('../ApiClient');

const hr = {
  height: '12px',
  border: 0,
  'box-shadow': 'inset 0 12px 12px -12px rgba(0, 0, 0, 0.5)'
};

export default class Catalog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'sets': [],
            'fullSets' : {},
            'pageLength' : 1,
            'searchYear': 2017,
            'searchTheme': '',
            'activePage' : 1,
        };

        this.search();
        this.changePage = this.changePage.bind(this);
    }

    search(e) {
        getClient().getSets(this.state.searchTheme, this.state.searchYear, (result) => {
            const sets = result.sets;
            let pageLength = Math.ceil(sets.length / 12);
            const fullSets = cutSets(pageLength, sets);
            const defaultPageNum = this.state.activePage;
            this.setState({'sets': fullSets[defaultPageNum],
                            'fullSets': fullSets,
                            'pageLength': pageLength });
            console.log(fullSets);
        })
    }

    handleYear(e) {
        this.setState({searchYear: e.target.value});
    }

    handleTheme(e) {
        this.setState({searchTheme: e.target.value});
    }

    changePage(activePage) {
      const nextLegoSets = this.state.fullSets[activePage];
      this.setState({'sets': nextLegoSets,
                     'activePage': activePage });
    }

    render() {
      let isLoadingSets = this.state.sets.length === 0 ? true : false;

      return (
        <div className="container-fluid">
          <CatalogHeader title={'Catalog'} text={'Chose the Lego sets you wish to buy or swap.'}/>

          <div className="row catalogView">
            <div className="col-lg-3">
              <h3 className="filter-title">Filters</h3>
              <hr/>
                <Form>
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
            </div>

            <div className="col-lg-9">
              <div className="legorow">
              {isLoadingSets ? (
                <div className="loader"></div>
                ) : (this.state.sets.map(function(d, idx){
                  return (<LegoSet key={idx} set={d} />)
                  }))
              }
              </div>
            </div>
          </div>

          <div className="row catalogView">
            <SetsPagination length={this.state.pageLength} onPageClick={this.changePage} activePageNum={this.state.activePage} />
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

function cutSets(pageLength, sets){
  let head = 0, end = 12;
  let dividedSets = {};
  for(let i=1; i<=pageLength; i++) {
    let setsPerPage = sets.slice(head, end);
    dividedSets[i] = setsPerPage;
    head = end;
    end = end + 12;
  }
  return dividedSets;
}