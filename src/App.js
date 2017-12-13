import React, { Component } from 'react';
import './App.css';
import { Button, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupButton, Label, Row, Table } from 'reactstrap';
import { Route, BrowserRouter as Router } from "react-router-dom";
import Catalog from './views/Catalog';
import LegoSet from './views/LegoSet';
import Themes from './views/Themes';
import Jumbo from './views/Jumbo';
import Navigation from './views/Navigation';
import Footer from './views/Footer';

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
              <Router>
                <div>
                  <Navigation />
                  <div>
                      <Route path="/login/:key" component={LoginSession}/>
                      <Route path="/login" exact component={LoginPage}/>
                      <Route path="/dashboard" component={DashboardPage}/>
                      <Route path="/profile" component={ProfilePage}/>
                      <Route path="/mysets" component={MySets}/>
                      <Route path="/set/:key" component={SetSale}/>
                      <Route path="/" exact component={Catalog}/>
                  </div>

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

class SetSale extends Component {

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
            <div>
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
        window.location.href = '/';
    }

    render() {
        if (getClient().getToken()) {
            return (
                <Button onClick={this.logout}>Logout</Button>
            )
        }

        return (<a href={'/login'} className={"nav-link"}>Logout</a>);
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
        getClient().login(this.state.email, function(result) {
            self.setState({msg: 'Login link has been sent to your email.'});
        }, function(error) {
            self.setState({msg: error});
        })
    }

    render() {
        return (
            <div className="container">
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
                <p>{this.state.msg}</p>
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


export {
    App,
    Logout
};
