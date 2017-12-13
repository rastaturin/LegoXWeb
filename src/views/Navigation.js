import React, { Component } from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';

export default class Navigation extends Component {

  render() {
    return (
      <div>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <a className="navbar-brand" href="/">Lego Exchanger</a>
          <Button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </Button>

          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                  <a className="nav-link" href="/mysets">My sets</a>
              </li>
              <li className="nav-item" id="login">
              </li>
            </ul>
            <Form className="form-inline my-2 my-lg-0">
              <FormGroup>
                <Input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
              </FormGroup>
              <Button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search
              </Button>
            </Form>
          </div>
      </nav>
      </div>
      )
  }




}