import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { userLogout, getProfile, isLoggedIn } from '../utilities/currentUser';

export default function withAuth(AuthComponent) {
  return class AuthWrapped extends React.Component {
    propTypes = {
      history: PT.object,
    };

    constructor() {
      super();
      this.state = {
        user: null,
      };
    }

    componentWillMount() {
      if (!isLoggedIn()) {
        this.props.history.replace('/login');
      } else {
        try {
          const profile = getProfile();
          this.setState({
            user: profile,
          });
        } catch (err) {
          userLogout();
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
