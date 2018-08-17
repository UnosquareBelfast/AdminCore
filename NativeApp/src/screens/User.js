import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { Icon } from 'react-native-elements';
import User from '../components/User';

export default class UserScreen extends Component {
  static navigationOptions = {
    title: 'Profile',
    tabBarIcon: ({ tintColor }) => <Icon name="user" type="font-awesome" size={20} color={tintColor} />,
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
