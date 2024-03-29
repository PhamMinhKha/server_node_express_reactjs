import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import { createStore } from 'redux';
import thunk from 'redux-thunk';
// import 'bootstrap';

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
import ViewPage from './components/pages/ViewPage.jsx';
//admin page
import fetch9Gag from './components/pages/admin/fetch9Gag.jsx';
import fetchHaiVN from './components/pages/admin/fetchHaiVN.jsx';
import fetchXemVN from './components/pages/admin/fetchXemVN.jsx';
import './css/custom.css';


ReactDOM.render(
  <Provider store={store} >
    <Router>
    <div>
     <Nav />
      <Route exact path="/" component={HomePage} />
      <Route path="/v/:slug" component={ViewPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/new" component={NewPage} />
      <Route path="/fetch9Gag" component={fetch9Gag} />
      <Route path="/fetchHaiVN" component={fetchHaiVN} />
      <Route path="/fetchXemVN" component={fetchXemVN} />
      <Route path="/profile" component={ProfilePage} />
    </div>
  </Router>
  </Provider>
    ,
    document.getElementById('root')
  );
  