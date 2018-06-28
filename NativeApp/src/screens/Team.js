import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import Team from '../components/Team';

export default class TeamScreen extends Component {
  static navigationOptions = {
    title: 'Team',
  }

  static propTypes = {
    navigation: PT.shape({
      navigate: PT.func,
    }).isRequired,
  }

  render() {
    const { navigation } = this.props;
    return (
      <Team navigation={navigation} />
    );
  }
}
