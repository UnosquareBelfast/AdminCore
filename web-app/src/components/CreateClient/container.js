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

    clientCreatedSuccessfully = () => {
      this.setState({
        success: true,
      });
    };

    clientsFailedToCreated = error => {
      this.setState({ error, loading: false });
    };

    render() {
      return (
        <Wrapped
          success={this.state.success}
          error={this.state.error}
          onSuccess={this.clientCreatedSuccessfully}
          onFailed={error => {
            this.clientsFailedToCreated(error);
          }}
        />
      );
    }
  };
