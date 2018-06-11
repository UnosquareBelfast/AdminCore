import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import {PropTypes as PT} from 'prop-types';
import BootView from '../components/Boot';

export default class BootScreen extends Component {
  static propTypes = {
    navigation: PT.object,
  }
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('id_token');

    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  }

  render() {
    return (
      <BootView />
    );
  }
}