import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import redux from 'redux';
// import {Provider} from 'react-redux';

// import reducers from './reducers/index.jsx';
// const store = redux.createStore(reducer);

import Nav from './components/Nav.jsx';
import HotPage from './components/HotPage.jsx';
import TrendPage from './components/TrendPage.jsx';
import NewPage from './components/NewPage.jsx';
import Main from './components/Main.jsx';

ReactDOM.render(
    <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/topics">Topics</Link>
        </li>
      </ul>

      <hr />

      <Route exact path="/" component={HotPage} />
      <Route path="/about" component={TrendPage} />
      <Route path="/topics" component={NewPage} />
    </div>
  </Router>
    ,
    document.getElementById('root')
  );
  