import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App'
import Login from './Login/Login'

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path='/' component={App} />
    </Switch>
  </Router>,
  document.getElementById("app")
);