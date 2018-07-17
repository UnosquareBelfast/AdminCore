import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import employeeStatus from '../../utilities/employeeStatus';
import {
  getClientById,
  createClient,
  updateClient,
} from '../../services/clientService';

export default Wrapped =>
  class extends Component {
    static propTypes = {
      clientId: PT.number,
      onSuccess: PT.func,
      onFailed: PT.func,
    };

    constructor(props) {
      super(props);
      this.state = {
        formData: {
          clientName: '',
          clientStatusDescription: '',
          clientStatusId: employeeStatus.ACTIVE,
          contactEmail: '',
          contactName: '',
          minimumEmployeesForTeam: 1,
          teamName: '',
        },
        formIsValid: false,
      };
    }

    componentDidMount() {
      if (this.props.clientId > 0) {
        getClientById(this.props.clientId)
          .then(response => response.data)
          .catch(() => {
            let formData = {
              clientId: 1,
              clientName: 'Client One',
              clientStatusDescription: 'Client One Description',
              clientStatusId: employeeStatus.ACTIVE,
              contactEmail: 'frank@client-one.com',
              contactName: 'Joe Bloggs',
              minimumEmployeesForTeam: 5,
              teamName: 'Team A',
            };
            this.setState({
              formData: formData,
            });
          });
      }
    }

    handleFormStatus(name, value, formIsValid) {
      const updatedFormData = { ...this.state.formData };
      updatedFormData[name] = value;
      this.setState({
        formData: updatedFormData,
        formIsValid,
      });
    }

    handleClientCreate = event => {
      event.preventDefault();
      const formData = { ...this.state.formData };
      return createClient(formData)
        .then(() => {
          this.props.onSuccess();
        })
        .catch(error => {
          this.props.onFailed(error);
        });
    };

    handleClientUpdate = event => {
      event.preventDefault();
      const formData = { ...this.state.formData };
      return updateClient(formData)
        .then(() => {
          this.props.onSuccess();
        })
        .catch(error => {
          this.props.onFailed(error);
        });
    };

    render() {
      return (
        <Wrapped
          clientId={this.props.clientId}
          formData={this.state.formData}
          formIsValid={this.state.formIsValid}
          formStatus={(name, value, formIsValid) =>
            this.handleFormStatus(name, value, formIsValid)
          }
          submitFormCreate={e => this.handleClientCreate(e)}
          submitFormUpdate={e => this.handleClientUpdate(e)}
        />
      );
    }
  };
