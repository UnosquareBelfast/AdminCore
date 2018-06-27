import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { Dashboard, Login, Admin, User } from './pages';
import { ThemeProvider } from 'styled-components';
import { theme } from './styled';
import Layout from './hoc/Layout';

class App extends React.Component {
  render() {
    let isAuthenticated = localStorage.getItem('id_token') ? true : false;
    let routes = (
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Redirect to="/login" />
      </Switch>
    );

    if (isAuthenticated) {
      routes = (
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/admin" component={Admin} />
          <Route path="/user/:userId" component={User} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <ThemeProvider theme={theme}>
        <Layout isAuthenticated={isAuthenticated} history={this.props.history}>
          {routes}
        </Layout>
      </ThemeProvider>
    );
  }
}

export default withRouter(App);
