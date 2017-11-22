import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
const App = require('./App').App;
const Logout = require('./App').Logout;

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Logout />, document.getElementById('login'));
registerServiceWorker();
