import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import Login from '../components/Login';

export default class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
    title: 'Login',
  };

  static propTypes = {
    navigation: PT.shape({
      navigate: PT.func,
    }).isRequired,
  }

  render() {
    const { navigation } = this.props;
    return <Login navigation={navigation} />;
  }
}
