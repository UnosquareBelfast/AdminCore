import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Redirect } from 'react-router';
import LoginService from '../pages/Login/LoginService';

export default function withAuth(AuthComponent) {
  const Auth = new LoginService(process.env.DOMAIN);

  return class AuthWrapped extends React.Component {
    static propTypes = {
      history: PT.object,
    }

    constructor() {
      super();
      this.state = {
        user: null,
      };
    }

    componentWillMount() {
      try {
        const profile = Auth.getProfile();
        this.setState({
          user: profile,
        });
      }
      catch (err) {
        Auth.logout();
      }
    }

    render() {
      if (!Auth.loggedIn()) { return <Redirect to="/login"/>; }
      if (this.state.user) {
        return (
          <AuthComponent history={this.props.history} user={this.state.user} />
        );
      }
    }
  };
}
