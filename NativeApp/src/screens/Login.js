import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import Login from '../components/Login';

export default class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
    title: 'Login',
    tabBarIcon: ({ tintColor }) => <Icon name="sign-out" size={25} color={tintColor} />,
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
