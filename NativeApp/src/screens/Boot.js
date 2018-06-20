import React, { Component } from 'react';
import {PropTypes as PT} from 'prop-types';
import BootView from '../components/Boot';
import { AuthConsumer } from '../utilities/AuthContext';

export default class BootScreen extends Component {
  static propTypes = {
    navigation: PT.object,
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AuthConsumer>
        {
          ({token, isLoading}) => (
            isLoading ?
              <BootView />
              :
              this.props.navigation.navigate(token ? 'App' : 'Auth')
          )
        }
      </AuthConsumer>
    );
  }
}
