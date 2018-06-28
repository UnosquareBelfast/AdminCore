import React, { Component } from 'react';
import { Alert } from 'react-native';
import { PropTypes as PT } from 'prop-types';
import { userLogin } from '../../services/userService';


export default Container => class extends Component {
  static propTypes = {
    navigation: PT.shape({
      navigate: PT.func,
    }),
  }

  static defaultProps = {
    navigation: {},
  }

  handleLogin = (email, password) => {
    const { navigation } = this.props;
    userLogin(email, password)
      .then(() => {
        navigation.navigate('App');
      })
      .catch((e) => {
        Alert.alert(
          'Could not login',
          e.message,
        );
      });
  }

  render() {
    return (
      <Container
        handleLogin={this.handleLogin}
      />
    );
  }
};
