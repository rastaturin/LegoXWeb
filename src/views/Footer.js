import React, { Component } from 'react';
//import { Form, FormGroup, Input, Button } from 'reactstrap';
import github from '../images/github.png';
import '../styles/Footer.css';

export default class Footer extends Component {

  render() {
    return (
      <footer className="footer-bottom">
        <div className="container">
          <span className="text-muted">© Copyright 2017 - Lego Exchanger. All rights reserved.</span>
          <a href="https://github.com/rastaturin/LegoXWeb" target="_blank"><img src={github} alt="github" className="githubIcon" />
          </a>
        </div>
      </footer>
    )
  }
}