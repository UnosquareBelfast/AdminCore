import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { Dashboard, Login, Admin, User, Profile } from './pages';
import { ThemeProvider } from 'styled-components';
import { PropTypes as PT } from 'prop-types';
import { theme } from './styled';
import Layout from './hoc/Layout';
import AuthUserAndStore from './hoc/AuthUserAndStore';
import { isLoggedIn } from './utilities/currentUser';

class App extends React.Component {
  static propTypes = {
    drawerOpen: PT.bool,
    history: PT.object,
  };

  render() {
    let isAuthenticated = isLoggedIn() ? true : false;
    let routes;

    if (isAuthenticated) {
      routes = (
        <AuthUserAndStore history={this.props.history}>
          <Switch>
            <Route path="/profile" component={Profile} />
            <Route exact path="/" component={Dashboard} />
            <Route path="/admin" component={Admin} />
            <Route path="/user/:userId" component={User} />
            <Redirect to="/" />
          </Switch>
        </AuthUserAndStore>
      );
    } else {
      routes = (
        <Switch>
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
