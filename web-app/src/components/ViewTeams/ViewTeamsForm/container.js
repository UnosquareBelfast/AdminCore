import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { getAllClients } from '../../../services/clientService';
import swal from 'sweetalert2';

export default Wrapped =>
  class extends Component {
    static propTypes = {
      onSuccess: PT.func,
      onFailed: PT.func,
    };

    constructor(props) {
      super(props);
      this.state = {
        formData: {
          selectedClient: -1,
        },
        formIsValid: false,
        clients: [],
      };
    }

    componentDidMount() {
      getAllClients()
        .then(response => {
          const clients = response.data;
          const formattedClients = clients.reduce((acc, client) => {
            acc.push({
              value: client.clientId,
              displayValue: client.clientName,
            });
            return acc;
          }, []);
          this.setState({
            clients: formattedClients,
            formData: {
              ...this.state.formData,
              selectedClient: formattedClients[0].value,
            },
          });
        })
        .catch(error =>
          swal('Error', `Could not retreive clients: ${error.message}`, 'error')
        );
    }

    handleFormStatus(name, value, formIsValid) {
      const updatedFormData = { ...this.state.formData };
      updatedFormData[name] = value;
      this.setState({
        formData: updatedFormData,
        formIsValid,
      });

      console.log('form updated');
    }

    handleFormSubmit = event => {
      event.preventDefault();
      this.props.onSuccess(this.state.formData);
    };

    render() {
      return (
        <Wrapped
          clients={this.state.clients}
          formData={this.state.formData}
          formIsValid={this.state.formIsValid}
          formStatus={(name, value, formIsValid) =>
            this.handleFormStatus(name, value, formIsValid)
          }
          submitForm={e => this.handleFormSubmit(e)}
        />
      );
    }
  };
