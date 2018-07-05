import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { Redirect } from 'react-router';
import store from '../../store';
import { updateUser } from '../../actions/user';
import {
  userLogout,
  getProfile,
  isLoggedIn,
} from '../../utilities/currentUser';
import { getUserProfile } from '../../services/userService';
import swal from 'sweetalert2';

class AuthUserAndStore extends Component {
  componentWillMount() {
    try {
      const tokenProfile = getProfile();
      const userId = tokenProfile.sub;
      getUserProfile(userId)
        .then(({ data }) => {
          store.dispatch(updateUser(data));
        })
        .catch(error => {
          swal('Couldn\'t retrieve profile', error.message, 'error');
        });
    } catch (error) {
      swal(
        'Couldn\'t find user',
        'There was an issue getting your profile info. Alert an admin.',
        'error'
      );
      userLogout();
    }
  }

  render() {
    if (!isLoggedIn()) {
      return <Redirect to="/login" />;
    }
    return { ...this.props.children };
  }
}

AuthUserAndStore.propTypes = {
  children: PT.node,
  history: PT.object,
};

export default AuthUserAndStore;
