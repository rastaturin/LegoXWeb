import React, { Component } from 'react';
import './App.css';
import { Button, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupButton, Label, Row, Table } from 'reactstrap';
import { Route,
         Switch,
         BrowserRouter as Router } from "react-router-dom";
import Catalog from './views/Catalog';
import LegoSet from './views/LegoSet';
import SetSale from './views/SetSale';
import Themes from './views/Themes';
import Jumbo from './views/Jumbo';
import Profile from './views/Profile';
import Navigation from './views/Navigation';
import Footer from './views/Footer';
import NoMatch from './views/404';

const config = require('./config');
const ApiClient = require('./ApiClient');

class App extends Component {
    constructor(props){
        super(props);
        this.state={
            email:''
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
      <div>
              <Router>
                <div>
                  <Navigation />

                  <Switch>
                      <Route path="/login/:key" component={LoginSession}/>
                      <Route path="/login" exact component={LoginPage}/>
                      <Route path="/dashboard" component={DashboardPage}/>
                      <Route path="/profile" component={Profile}/>
                      <Route path="/mysets" component={MySets}/>
                      <Route path="/set/:key" component={SetSale}/>
                      <Route path="/" exact component={Catalog}/>
                      <Route component={NoMatch} />
                    </Switch>
                  <Footer />

                </div>
              </Router>
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


const legorow = {
    display: 'flex',
    flexWrap: 'wrap',
};

class Sale extends Component {

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
        getClient().getSales((result) => {
            this.setState({'sets': result.items});
            console.log(result);
        })
    }

    render() {
        return (
            <div>
                <Jumbo title={'On Sale'} text={'Lego sets on sale.'}/>

                <Form inline>
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

class LoginSession extends Component {
    constructor(props){
        super(props);
        getClient().saveToken(this.props.match.params.key);
        window.location.href = '/mysets';
    }

    render() {
        return (
            <div></div>
        )
    }
}

class Logout extends Component {
    logout() {
        getClient().saveToken('');
        getClient().saveEmail('');
        window.location.href = '/';
    }

    render() {
        if (getClient().getToken() != undefined && getClient().getToken() != '') {
            return (
                <Button onClick={this.logout}>Logout</Button>
            )
        }

        return (<a href={'/login'} className={"nav-link"}>Login</a>);
    }
}

class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            msg: ''
        };
    }

    getStarted() {
        const self = this;
        getClient().login(this.state.email, this.state.password, function(result) {
            self.setState({msg: 'Login successfully'});
            window.location.href = '/profile';
        }, function(error) {
            self.setState({msg: 'Login failed'});
        })
    }

    getRegistered() {
        const self = this;
        getClient().register(this.state.email, this.state.password, function (result) {
            self.setState({msg: 'Register successfully'});
        }, function(error) {
            self.setState({msg: 'Register failed'});
        })
    }

    render() {
        return (
            <div>
                <div>
                    <Jumbo title={'Welcome to Lego Exchanger!'} text={'Please login using your email address.'}/>
                </div>
                <div className="container">
                    <Row>
                        <div className="col-lg" />
                        <div className="col-lg">
                            <h3 className="display-4">
                                LOGIN
                            </h3>
                        </div>
                        <div className="col-lg" />
                    </Row>
                    <Row>
                        <div className="col-lg" />
                        <div className="col-lg">
                            <Form>
                                <FormGroup>
                                    <InputGroup>
                                        <span className="input-group-addon">Email</span>
                                        <Input placeholder="Enter Email" onChange={event => this.setState({email: event.target.value})} />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <span className="input-group-addon">Password</span>
                                        <Input placeholder="Enter Password" onChange={event => this.setState({password: event.target.value})} />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <div className="btn-group">
                                        <Button color="primary" onClick={event => this.getStarted(event)}>Login</Button>
                                        <Button color="success" onClick={event => this.getRegistered(event)}>Register</Button>
                                    </div>
                                </FormGroup>
                            </Form>
                        </div>
                        <div className="col-lg" />
                    </Row>
                    <p>{this.state.msg}</p>
                </div>
                </div>
        );
    }
}

class MySets extends Component {
    constructor(props){
        super(props);
        this.state={
            mysets: [],
            key: 0,
            price: 0
        };
        getClient().getMySet((result) => {
            this.setState({'mysets': result.items});
            console.log(result);
        })
    }

    add(e) {
        getClient().addMySet(this.state.key, this.state.price, result => {
            this.setState({'mysets': result.items});
            console.log(result);
        })
    }

    remove(e, d) {
        getClient().removeMySet(d.key, result => {
            this.setState({'mysets': result.items});
            console.log(result);
        })
    }

    render() {
        const self = this;
        return (
            <div className="container">
                <Jumbo title={'Your Lego'} text={'Chose your Lego sets'}/>
                <Form inline>
                    <Input name={'key'} placeholder={'Key'} onChange={event => this.setState({key: event.target.value})}/>
                    <InputGroup onChange={event => this.setState({price: event.target.value})}>
                        <InputGroupAddon>$</InputGroupAddon>
                        <Input placeholder="Price" type="number" name={"Price"} step="1" />
                        <InputGroupAddon>.00</InputGroupAddon>
                    </InputGroup>
                    <Button onClick={event => this.add(event)}>Add</Button>
                </Form>
                <Table>
                    <thead>
                    <tr>
                        <th>
                            ID
                        </th>
                        <th>
                            Price
                        </th>
                        <th>
                            Date
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                {
                    this.state.mysets.map(function(d, idx){
                    return (<tr><td>{d.key}</td><td>${d.price}</td><td>{d.updatedAt}</td><td><Button onClick={event => self.remove(event, d)}>Remove</Button></td></tr>)
                })}
                    </tbody>
                </Table>
            </div>
        );
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


export {
    App,
    Logout
};
