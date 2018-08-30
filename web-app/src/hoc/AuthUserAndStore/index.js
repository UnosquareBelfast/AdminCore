import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { Redirect } from 'react-router';
import store from '../../store';
import { updateUser } from '../../actions/user';
import { getProfile, isLoggedIn } from '../../utilities/currentUser';
import { getUserProfile } from '../../services/userService';
import { Toast } from '../../utilities/Notifications';
import { Spinner } from '../../components/common';
import { isEmpty } from 'lodash';
import { SpinnerContainer, ErrorContainer } from './styled';

class AuthUserAndStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: {},
    };
  }

  componentDidMount() {
    const tokenProfile = getProfile();
    const userId = tokenProfile.sub;
    getUserProfile(userId)
      .then(({ data }) => {
        store.dispatch(updateUser(data));
        this.setState({ loading: false });
        Toast({
          type: 'success',
          title: `Welcome, ${tokenProfile.name}`,
          position: 'top-center',
          timer: 2000,
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  render() {
    // If not logged in, bring them to login page.
    if (!isLoggedIn()) {
      return <Redirect to="/login" />;
    }

    // If there was an error getting the profile.
    if (!isEmpty(this.state.error)) {
      return (
        <ErrorContainer>
          <h2>Sorry.</h2>
          <p>There was an error, and we couldn't retrieve your profile.</p>
          <p>
            Refresh the page to retry. If the problem persists, contact an admin
            with the below details:
          </p>
          <p>{this.state.error.message}</p>
        </ErrorContainer>
      );
    }

    // If logged in, and profile request is loading.
    if (this.state.loading) {
      return (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      );
    }

    // Otherwise, all is fine, allow access to app.
    return { ...this.props.children };
  }
}

AuthUserAndStore.propTypes = {
  children: PT.node,
  history: PT.object,
};

export default AuthUserAndStore;
