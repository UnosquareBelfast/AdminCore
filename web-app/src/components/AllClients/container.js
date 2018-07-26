import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import Swal from 'sweetalert2';
import { getAllClients } from '../../services/clientService';

export default Wrapped =>
  class extends Component {
    static propTypes = {
      history: PT.object.isRequired,
    };
    constructor(props) {
      super(props);
      this.state = { clients: [] };
    }

    componentDidMount() {
      getAllClients()
        .then(response => {
          const clients = response.data;
          this.setState({ clients });
        })
        .catch(error => {
          Swal('Error', `Error getting clients: ${error.message}`, 'error');
        });
    }

    render() {
      return (
        <Wrapped
          {...this.props}
          clients={this.state.clients}
          createNewClient={this.onCreateNewClient}
        />
      );
    }
  };
