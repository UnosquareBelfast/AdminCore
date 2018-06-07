import React, { Component } from 'react';
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
    
    handleLogin = () => {
      userLogin(this.state.email, this.state.password)
        .then(() => {
          this.props.navigation.navigate('App');
        })
        .catch((e) => {
          console.log('Login error:', e.message);
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
