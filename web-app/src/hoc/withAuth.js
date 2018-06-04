import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Redirect } from 'react-router';
import { userLogout, getProfile, isLoggedIn } from '../utilities/currentUser';

const withAuth = AuthComponent => {
  return class AuthWrapped extends React.Component {
    static propTypes = {
      history: PT.object,
    };

    constructor() {
      super();
      this.state = {
        user: null,
      };
    }

    componentWillMount() {
      try {
        const profile = getProfile();
        this.setState({
          user: profile,
        });
      } catch (err) {
        userLogout();
      }
    }

    render() {
      if (!isLoggedIn()) {
        return <Redirect to="/login" />;
      }
      if (this.state.user) {
        return <AuthComponent user={{ ...this.state.user }} {...this.props} />;
      }
    }
  };
};

export default withAuth;
