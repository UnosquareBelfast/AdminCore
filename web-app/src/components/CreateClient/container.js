import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';

export default Wrapped =>
  class extends Component {
    static propTypes = {
      history: PT.object,
      match: PT.object,
    };
    constructor(props) {
      super(props);
      this.state = {
        success: null,
        error: null,
      };
    }

    clientCreatedSuccessfully = () => {
      this.props.history.push('/admin/clients');
    };

    clientsFailedToCreated = error => {
      this.setState({ error });
    };

    goToAllClients = () => {
      this.props.history.push('/admin/clients');
    };

    render() {
      const { params } = this.props.match;
      let clientId = 0;
      if (Object.keys(params).length > 0 && params.constructor === Object) {
        clientId = params.clientId;
      }

      return (
        <Wrapped
          goToAllClients={this.goToAllClients}
          clientId={parseInt(clientId)}
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
