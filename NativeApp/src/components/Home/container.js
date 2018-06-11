import React, { Component } from 'react';
import {PropTypes as PT} from 'prop-types';
import { userLogout } from '../../utilities/currentUser';

export default Container =>
  class extends Component {
    static propTypes = {
      navigation: PT.object,
    }
    handleLogout = () => {
      userLogout()
        .then(this.props.navigation.navigate('Auth'));
    }
    
    render() {
      return (
        <Container 
          handleLogout={this.handleLogout}
        />
      );
    }
  };
