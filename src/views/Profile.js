import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Slider from 'react-slick';
import Jumbo from './Jumbo';
import '../styles/Profile.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import face01 from '../images/profile-icons/face01.png';
import face02 from '../images/profile-icons/face02.png';
import face03 from '../images/profile-icons/face03.png';
import classnames from 'classnames';

const config = require('../config');
const ApiClient = require('../ApiClient');


class PrevArrow extends React.Component {
  render() {
    return (
      <p onClick={this.props.onClick}>
        <a href="" className={classnames('arrow', this.props.pos)}></a>
      </p>
    );
  }
}

export default class Profile extends Component {

  constructor(props) {
    super(props)
    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
  }

  next() {
    this.slider.slickNext()
  }
  previous() {
    this.slider.slickPrev()
  }

  render() {
    // const {classes, children} = this.props;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: <PrevArrow pos="left" onClick={this.previous} />,
      nextArrow: <PrevArrow pos="right" onClick={this.next} />,
      responsive: [ { breakpoint: 768, settings: { slidesToShow: 1 } } ],
      className: 'robot-face'
    };

    return (
      <div className="container-fluid profile-view">
        <Jumbo title={'Your Profile'} text={'Enter your data.'}/>
        <Slider ref={c => this.slider = c } {...settings}>
          <div><img src={face01} alt="Deafult Pic" className="avatar" /></div>
          <div><img src={face02} alt="Deafult Pic" className="avatar" /></div>
          <div><img src={face03} alt="Deafult Pic" className="avatar" /></div>
        </Slider>
        <Form className="profile-form">
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
          </FormGroup>
          <FormGroup>
              <Button >Submit</Button>
          </FormGroup>
        </Form>
      </div>
    )
  }
}


/**
 * @returns {ApiClient}
 */
function getClient() {
    const apiBaseUrl = config.api_fred;
    return new ApiClient(apiBaseUrl, errorHandler);
}

function errorHandler(error) {
    if (error.response && error.response.status === 401) {
        window.location.href = '/login';
    } else {
        console.log(error);
    }
}
