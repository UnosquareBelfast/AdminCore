import React, { Component } from 'react';
import { Alert } from 'react-native';
import {PropTypes as PT} from 'prop-types';
import { userLogin } from '../../services/userService';


export default Container =>
  class extends Component {
    static propTypes = {
      navigation: PT.object,
    }

    constructor(props) {
      super(props);
    }
    
    handleLogin = (email, password) => {
      userLogin(email, password)
        .then(() => {
          this.props.navigation.navigate('App');
        })
        .catch((e) => {
          Alert.alert(
            'Could not login',
            e.message,
          );
        });
    };
    
    render() {
      return (
        <Container 
          handleLogin={this.handleLogin}
        />
      );
    }
  };
