import React, { Component } from 'react';
import {PropTypes as PT} from 'prop-types';

export default Container =>
  class extends Component {
    static propTypes = {
      navigation: PT.object,
    }

  
    render() {
      return (
        <Container
          handleLogout={this.handleLogout}
        />
      );
    }
  };
