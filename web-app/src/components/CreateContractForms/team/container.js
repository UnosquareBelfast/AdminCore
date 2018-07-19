import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { getAllClients } from '../../../services/clientService';
import { getTeamsFromClient } from '../../../services/teamService';

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
          clients: [],
          teams: [],
          selectedClient: -1,
          selectedTeam: -1,
        },
        formIsValid: true,
        error: false,
      };
    }

    componentDidMount() {
      this.getClients();
    }

    getClients = () => {
      getAllClients().then(response => {
        const clients = response.data;
        const clientsFormatted = clients.reduce((acc, client) => {
          acc.push({
            value: client.clientId,
            displayValue: client.clientName,
          });
          return acc;
        }, []);
        this.setState({
          formData: {
            ...this.state.formData,
            clients: clientsFormatted,
            selectedClient: clientsFormatted[0].value,
          },
        });
      });
    };

    handleFormStatus(name, value, formIsValid) {
      const updatedFormData = { ...this.state.formData };
      updatedFormData[name] = value;
      this.setState({
        formData: updatedFormData,
        formIsValid,
      });
    }

    handleFormSubmit = event => {
      event.preventDefault();
      const formData = { ...this.state.formData };

      return this.props.onSuccess(formData);
    };

    handleTeamSearch = event => {
      event.preventDefault();

      getTeamsFromClient(this.state.formData.selectedClient)
        .then(response => {
          const teams = response.data;
          const teamsFormatted = teams.reduce((acc, team) => {
            acc.push({
              value: team.teamId,
              displayValue: team.teamName,
            });
            return acc;
          }, []);
          this.setState({
            formData: {
              ...this.state.formData,
              teams: teamsFormatted,
              selectedTeam: teamsFormatted[0].value,
            },
            error: false,
          });
        })
        .catch(() => {
          this.setState({
            error: true,
          });
        });
    };

    handleFormReset = event => {
      event.preventDefault();
      this.setState({
        formData: {
          clients: this.state.formData.clients,
          teams: [],
          selectedClient: this.state.formData.selectedClient,
          selectedTeam: -1,
        },
        formIsValid: false,
        error: false,
      });
    };

    render() {
      return (
        <Wrapped
          formData={this.state.formData}
          formIsValid={this.state.formIsValid}
          formStatus={(name, value, formIsValid) =>
            this.handleFormStatus(name, value, formIsValid)
          }
          submitForm={e => this.handleFormSubmit(e)}
          searchTeam={e => this.handleTeamSearch(e)}
          resetForm={e => this.handleFormReset(e)}
          teams={this.state.formData.teams}
          clients={this.state.formData.clients}
          error={this.state.error}
        />
      );
    }
  };
