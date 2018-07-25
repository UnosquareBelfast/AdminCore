import React, { Component } from 'react';
import { createTeam } from '../../services/teamService';
import swal from 'sweetalert2';

export default Wrapped =>
  class extends Component {
    submitRequest = data => {
      const request = {
        clientId: data.selectedClient,
        teamName: data.teamName,
      };
      createTeam(request)
        .then(() => {
          swal({
            type: 'success',
            title: 'Success!',
            text: 'Team created successfully',
            toast: true,
            timer: 4000,
            showConfirmButton: false,
          });
        })
        .catch(error => {
          swal('Error', `Error creating team: ${error.message}`, 'error');
        });
    };

    render() {
      return <Wrapped submitRequest={this.submitRequest} />;
    }
  };
