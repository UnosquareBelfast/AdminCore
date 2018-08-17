import React from 'react';
import { View } from 'react-native';
import { PropTypes as PT } from 'prop-types';
import BootView from '../components/Boot';
import { AuthConsumer } from '../utilities/AuthContext';

const BootScreen = props => (
  <AuthConsumer>
    {
      ({ token, isLoading, fontLoaded }) => (
        <View> {
          console.log({isLoading}, { fontLoaded })}
          {!fontLoaded ? <BootView /> : props.navigation.navigate(token ? 'App' : 'Auth')}
    </View>
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
