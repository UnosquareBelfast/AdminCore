import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
//import Swal from 'sweetalert2';
//import { getAllClients, updateClient } from '../../services/clientService';
import employeeStatus from '../../utilities/employeeStatus';

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
      let clients = [
        {
          clientId: 1,
          clientName: 'Client One',
          clientStatusDescription: 'Client One Description',
          clientStatusId: employeeStatus.ACTIVE,
          contactEmail: 'frank@client-one.com',
          contactName: 'Joe Bloggs',
          minimumEmployeesForTeam: 5,
          teamName: 'Team A',
        },
      ];
      this.setState({ clients });
      // getAllClients().then(response => {
      //   clients = response.data;
      //   this.setState({ clients });
      // });
    }

    onCreateNewClient = () => {
      this.props.history.replace('/admin/createClient');
    };

    archiveClient = (client, active) => {
      const clientIndex = this.state.clients.indexOf(client);
      const clients = [...this.state.clients];

      active
        ? (clients[clientIndex].clientStatusId = employeeStatus.ACTIVE)
        : (clients[clientIndex].clientStatusId = employeeStatus.INACTIVE);

      this.setState({ clients });
      // updateClient(clients[clientIndex])
      //   .then(() => {
      //     this.setState({ clients });
      //   })
      //   .catch(error =>
      //     Swal({
      //       title: 'Could not change client status',
      //       text: error.message,
      //       type: 'error',
      //     }),
      //   );
    };

    viewClient = clientId => {
      this.props.history.push(`/admin/updateClient/${clientId}`);
    };

    render() {
      return (
        <Wrapped
          {...this.props}
          archive={this.archiveClient}
          viewClient={this.viewClient}
          clients={this.state.clients}
          createNewClient={this.onCreateNewClient}
        />
      );
    }
  };
