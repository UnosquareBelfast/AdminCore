import React, { Component } from 'react';
import { PropTypes as PT} from 'prop-types';
import User from '../components/User';

export default class UserScreen extends Component {
  static propTypes = {
    navigation: PT.object,
  }

  static navigationOptions = {
    title: 'User Info',
  }

  render() {
    return (
      <User navigation={this.props.navigation}/>
    );
  }
}
