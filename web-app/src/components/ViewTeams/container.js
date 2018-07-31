import React, { Component } from 'react';
import { getTeamsFromClient } from '../../services/teamService';
import swal from 'sweetalert2';

export default Wrapped =>
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        teams: [],
      };
    }

    teamSearch = clientId => {
      getTeamsFromClient(clientId)
        .then(response => {
          const teams = response.data;
          this.setState({ teams });
        })
        .catch(error =>
          swal('Error', `Could not get teams: ${error.message}`, 'error')
        );
    };

    render() {
      return (
        <Wrapped
          {...this.props}
          teamSearch={this.teamSearch}
          teams={this.state.teams}
        />
      );
    }
  };
