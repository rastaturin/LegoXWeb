import React, { Component } from 'react';
import './App.css';
import {Button, Container, Form, FormGroup, Input, InputGroup, InputGroupButton, Label, Row} from 'reactstrap';
import {Route, BrowserRouter as Router} from "react-router-dom";

const config = require('./config');
const ApiClient = require('./ApiClient');

class App extends Component {

    constructor(props){
        super(props);
        this.state={
            email:'',
        };
        console.log(this.state);
    }

  getStarted() {
      console.log('login!');
  }

  showError(error) {
      console.log(error);
  }

  render() {
    return (
      <div className="App">
          <Container>
              <Router>
                  <div>
                      <Route path="/login" component={LoginPage}/>
                      <Route path="/catalog" component={Catalog}/>
                      <Route path="/dashboard" component={DashboardPage}/>
                      <Route path="/profile" component={ProfilePage}/>
                      <Route path="/" exact component={Home}/>
                  </div>
              </Router>
              {/*<Pages/>*/}
          </Container>
      </div>
    );
  }
}

class Home extends Component {
    render() {
        if (localStorage.getItem('token')) {
            window.location.href = '/dashboard';
        } else {
            window.location.href = '/login';
        }

        return (
            <div>
                <h2>Home</h2>
            </div>
        )
    }
}

class Catalog extends Component {
    render() {
        return (
            <div>
                <Jumbo title={'Catalog'} text={'Chose the Lego sets you wish to buy or change.'}/>
            </div>
        )
    }
}

class DashboardPage extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
        };
    }

    render() {
        return (
            <duv>
                <Jumbo title={'Dashboard'}/>
            </duv>
        )
    }
}

class Jumbo extends Component {
    render() {
        return (
        <div class="jumbotron">
            <div class="container">
                <h1 class="display-3">{this.props.title}</h1>
                <p>{this.props.text}</p>
            </div>
        </div>
        )
    }
}

class ProfilePage extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
        };
    }

    render() {
        return (
            <div>
                <Jumbo title={'Your Profile'} text={'Enter your data.'}/>
                <Row>
                <Form>
                    <FormGroup>
                        <Label for="name">Email</Label>
                        <Input name="name" id="name" placeholder="Name" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="Birthday">Birthday</Label>
                        <Input name="Birthday" id="Birthday" placeholder="Birthday" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="Address">Address</Label>
                        <Input name="Address" id="Address" placeholder="Address" />
                    </FormGroup>
                    <FormGroup>
                        <Button >Submit</Button>
                    </FormGroup>
                </Form>
                </Row>
            </div>
        )
    }
}

class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
        };
    }

    getStarted() {
        const self = this;
        getClient().login(this.state.email, function(result) {
            self.props.onLogin();
        }, function(error) {
            self.props.onError(error);
        })
    }

    render() {
        return (
            <div>
                <Jumbo title={'Welcome to Lego Exchanger!'} text={'Please login using your email address.'}/>

                <Row>
                <h3 className="display-4">
                    Enter your email
                </h3>
            </Row>
                <Row>
                <p>
                    Login link will be sent to your email.
                </p>
            </Row>
            <Row>
                <Form>
                    <FormGroup>
                        <InputGroup>
                            <Input placeholder="Enter Email" onChange={event => this.setState({email: event.target.value})} />
                            <InputGroupButton><Button color="secondary" onClick={event => this.getStarted(event)}>Get login link</Button></InputGroupButton>
                        </InputGroup>
                    </FormGroup>
                </Form>
            </Row>
            </div>
        );
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
    if (error.response.status === 401) {
        window.location.href = '/login';
    }
}


export default App;
