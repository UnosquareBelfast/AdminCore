import React from 'react';
import { PropTypes as PT } from 'prop-types';
import LoginService from '../pages/Login/LoginService';

export default function withAuth(AuthComponent) {
  // pull API url in future.
  const Auth = new LoginService('http://localhost');

  return class AuthWrapped extends React.Component {
    propTypes = {
      history: PT.object,
    }

    constructor() {
      super();
      this.state = {
        user: null,
      };
    }

    componentWillMount() {
      if (!Auth.loggedIn()) {
        this.props.history.replace('/login');
      }
      else {
        try {
          const profile = Auth.getProfile();
          this.setState({
            user: profile,
          });
        }
        catch (err) {
          Auth.logout();
          this.props.history.replace('/login');
        }
      }
    }

    render() {
      if (this.state.user) {
        return (
          <AuthComponent history={this.props.history} user={this.state.user} />
        );
      }

      return null;
    }
  };
}
