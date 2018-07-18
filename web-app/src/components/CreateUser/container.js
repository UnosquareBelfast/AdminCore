import React, { Component } from 'react';

export default Wrapped =>
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        success: null,
        error: null,
      };
    }

    userCreatedSuccessfully = () => {
      this.setState({
        success: true,
      });
    };

    userFailedToCreated = error => {
      this.setState({ error, loading: false });
    };

    render() {
      return (
        <Wrapped
          success={this.state.success}
          error={this.state.error}
          onSuccess={this.userCreatedSuccessfully}
          onFailed={error => {
            this.userFailedToCreated(error);
          }}
        />
      );
    }
  };
