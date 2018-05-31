import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { createStore } from 'redux';

import 'bootstrap';

import {Provider} from 'react-redux';

import appReducers from './reducers/index.jsx';
const store = createStore(
  appReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

import 'bootstrap/dist/css/bootstrap.css';
import Nav from './components/Nav.jsx';
import HomePage from './components/pages/HomePage.jsx';
import TrendPage from './components/TrendPage.jsx';
import NewPage from './components/pages/NewPage.jsx';
import Main from './components/Main.jsx';
import LoginPage from './components/pages/LoginPage.jsx';
import ProfilePage from './components/pages/ProfilePage.jsx';
//admin page
import fetch9Gag from './components/pages/admin/fetch9Gag.jsx';
import './css/custom.css';

ReactDOM.render(
  <Provider store={store} >
    <Router>
    <div>
     <Nav/>
      <Route exact path="/" component={HomePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/new" component={NewPage} />
      <Route path="/fetch9Gag" component={fetch9Gag} />
      <Route path="/profile" component={ProfilePage} />
    </div>
  </Router>
  </Provider>
    ,
    document.getElementById('root')
  );
  