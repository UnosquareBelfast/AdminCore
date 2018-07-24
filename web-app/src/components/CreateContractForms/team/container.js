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
          selectedClient: -1,
          selectedTeam: -1,
        },
        clients: [],
        teams: [],
        formIsValid: false,
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
            selectedClient: clientsFormatted[0].value,
          },
          clients: clientsFormatted,
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

      let selectedTeam = this.state.teams.filter(
        team => team.value == this.state.formData.selectedTeam
      );
      selectedTeam = selectedTeam[0];

      let selectedClient = this.state.clients.filter(
        client => client.value == this.state.formData.selectedClient
      );
      selectedClient = selectedClient[0];

      const data = { selectedTeam, selectedClient };

      return this.props.onSuccess(data);
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
              selectedTeam: teamsFormatted[0].value,
            },
            teams: teamsFormatted,
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
          selectedClient: this.state.formData.selectedClient,
          selectedTeam: -1,
        },
        teams: [],
        clients: this.state.clients,
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
          teams={this.state.teams}
          clients={this.state.clients}
          error={this.state.error}
        />
      );
    }
  };
