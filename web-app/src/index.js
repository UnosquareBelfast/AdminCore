import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import { Login } from './pages';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route path="/" component={App} />
    </Switch>
  </Router>,
  document.getElementById('app')
);
