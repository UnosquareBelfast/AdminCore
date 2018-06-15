import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import Team from '../components/Team';

export default class TeamScreen extends Component {
  static propTypes = {
    navigation: PT.object,
  }

  render() {
    return (
      <Team navigation={this.props.navigation}/>
    );
  }
}
