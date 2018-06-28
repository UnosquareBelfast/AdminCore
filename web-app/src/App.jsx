import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { Dashboard, Login, Admin, User } from './pages';
import { ThemeProvider } from 'styled-components';
import { PropTypes as PT } from 'prop-types';
import { theme } from './styled';
import Layout from './hoc/Layout';

class App extends React.Component {
  static propTypes = {
    drawerOpen: PT.bool,
    history: PT.object,
  };

  render() {
    let isAuthenticated = localStorage.getItem('id_token') ? true : false;
    let routes;
    if (isAuthenticated) {
      routes = (
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/admin" component={Admin} />
          <Route path="/user/:userId" component={User} />
          <Redirect to="/" />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Redirect to="/login" />
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
