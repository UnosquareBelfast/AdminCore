import React, { Component } from 'react';
import { createTeam } from '../../services/teamService';
import swal from 'sweetalert2';
import { Toast } from '../../utilities/Notifications';

export default Wrapped =>
  class extends Component {
    submitRequest = data => {
      const request = {
        clientId: data.selectedClient,
        teamName: data.teamName,
      };
      createTeam(request)
        .then(() => {
          Toast({
            type: 'success',
            title: 'Team created successfully! 👍',
          });
        })
        .catch(error => {
          swal('Error', `Error creating team: ${error.message}`, 'error');
        });
    };

    render() {
      return <Wrapped {...this.props} submitRequest={this.submitRequest} />;
    }
  };
