import React, { Component } from 'react';
import './App.css';
import {
    Button, Card, Container, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupButton, Label,
    Row, Table
} from 'reactstrap';
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
                      <Route path="/dashboard" component={DashboardPage}/>
                      <Route path="/profile" component={ProfilePage}/>
                      <Route path="/mysets" component={MySets}/>
                      <Route path="/set/:key" component={SetSale}/>
                      <Route path="/" exact component={Catalog}/>
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

const elementStyle = {
    padding: '8px'
};

const legorow = {
    display: 'flex',
    flexWrap: 'wrap',
};

class LegoSet extends Component {
    render() {
        return (
            <div className={'col-sm-12 col-md-6 col-lg-4'} style={elementStyle}>
            <Card >
                <img src={this.props.set.img}  className={'card-img-top'}/>
                <div className="card-body">
                    <h4 className="card-title">{this.props.set.name}</h4>
                    <p>{this.props.set.theme_name.name} ({this.props.set.year})</p>
                    <p>ID: {this.props.set.key}</p>
                    <p><a href={'/set/' + this.props.set.key}>Sales: {this.props.set.sales} from ${this.props.set.min}</a></p>
                </div>
            </Card>
            </div>
        )
    }
}

class Themes extends Component {

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
                    return (<option value={d.key}>{d.name}</option>)
                })}
            </Input>
        )
    }
}

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

class Catalog extends Component {

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
        <div className="jumbotron">
            <div className="container">
                <h1 className="display-3">{this.props.title}</h1>
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
            msg: ''
        };
    }

    getStarted() {
        const self = this;
        getClient().login(this.state.email, function(result) {
            window.location.href = '/dashboard';
        }, function(error) {
            self.setState({msg: error});
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
            <div>
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
        console.error(error);
    }
}


export default App;
