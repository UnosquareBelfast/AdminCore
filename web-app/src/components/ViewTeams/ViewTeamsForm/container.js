import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { getAllClients } from '../../../services/clientService';
import swal from 'sweetalert2';

export default Wrapped =>
  class extends Component {
    static propTypes = {
      onChange: PT.func.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        formData: {
          selectedClient: -1,
        },
        clients: [],
      };
    }

    componentDidMount() {
      getAllClients()
        .then(response => {
          const clients = response.data;
          if (clients.length > 0) {
            const formattedClients = clients.reduce((acc, client) => {
              acc.push({
                value: client.clientId,
                displayValue: client.clientName,
              });
              return acc;
            }, []);
            this.setState(
              {
                clients: formattedClients,
                formData: {
                  ...this.state.formData,
                  selectedClient: formattedClients[0].value,
                },
              },
              () => this.props.onChange(this.state.formData.selectedClient)
            );
          }
        })
        .catch(error =>
          swal('Error', `Could not retreive clients: ${error.message}`, 'error')
        );
    }

    handleFormStatus(name, value) {
      const updatedFormData = { ...this.state.formData };
      updatedFormData[name] = value;
      this.setState(
        {
          formData: updatedFormData,
        },
        () => {
          this.props.onChange(this.state.formData.selectedClient);
        }
      );
    }
    render() {
      return (
        <Wrapped
          clients={this.state.clients}
          formData={this.state.formData}
          formStatus={(name, value) => this.handleFormStatus(name, value)}
        />
      );
    }
  };
