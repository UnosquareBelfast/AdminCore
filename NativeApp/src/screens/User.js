import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import User from '../components/User';

export default class UserScreen extends Component {
  static navigationOptions = {
    title: 'User Info',
  }

  static propTypes = {
    navigation: PT.shape({
      navigate: PT.func,
    }).isRequired,
  }

  render() {
    const { navigation } = this.props;
    return (
      <User navigation={navigation} />
    );
  }
}
