import React from 'react';
import { PropTypes as PT } from 'prop-types';
import BootView from '../components/Boot';
import { AuthConsumer } from '../utilities/AuthContext';

const BootScreen = props => (
  <AuthConsumer>
    {
      ({ token, isLoading }) => (
        isLoading
          ? <BootView /> : props.navigation.navigate(token ? 'App' : 'Auth')
      )
    }
  </AuthConsumer>
);

BootScreen.propTypes = {
  navigation: PT.shape({
    navigate: PT.func,
  }).isRequired,
};

export default BootScreen;
