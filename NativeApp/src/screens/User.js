import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import User from '../components/User';

export default class UserScreen extends Component {
  static navigationOptions = {
    title: 'User Info',
    tabBarIcon: ({ tintColor }) => <Icon name="user" size={25} color={tintColor} />,
  }

  static propTypes = {
    navigation: PT.shape({
      navigate: PT.func,
    }).isRequired,
  }

  render() {
    const { navigation } = this.props;
    return <User navigation={navigation} />;
  }
}
