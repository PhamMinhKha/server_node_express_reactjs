import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import redux from 'redux';
import style from 'style-loader';
import css from 'css-loader';
// import {Provider} from 'react-redux';

// import reducers from './reducers/index.jsx';
// const store = redux.createStore(reducer);
import 'bootstrap-loader!bootstrap/dist/css/bootstrap.min.css';
// require('bootstrap/dist/css/bootstrap.css');
import Nav from './components/Nav.jsx';
import HotPage from './components/HotPage.jsx';
import TrendPage from './components/TrendPage.jsx';
import NewPage from './components/NewPage.jsx';
import Main from './components/Main.jsx';

ReactDOM.render(
    <Router>
    <div>
     <Nav />

      <hr />

      <Route exact path="/" component={HotPage} />
      <Route path="/about" component={TrendPage} />
      <Route path="/topics" component={NewPage} />
    </div>
  </Router>
    ,
    document.getElementById('root')
  );
  