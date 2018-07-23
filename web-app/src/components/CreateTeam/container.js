import React, { Component } from 'react';
import { createTeam } from '../../services/teamService';
import swal from 'sweetalert2';

export default Wrapped =>
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        success: false,
      };
    }

    submitRequest = data => {
      const request = {
        clientId: data.selectedClient,
        teamName: data.teamName,
      };
      createTeam(request)
        .then(() => {
          this.setState({ success: true });
        })
        .catch(error => {
          swal('Error', `Error creating team: ${error.message}`, error);
        });
    };

    render() {
      return (
        <Wrapped
          submitRequest={this.submitRequest}
          success={this.state.success}
        />
      );
    }
  };
