import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Form, Input, Errorbox } from '../../../common';
import { FormContainer } from '../styled';

export const TeamForm = props => {
  const {
    submitForm,
    formStatus,
    formData,
    teams,
    clients,
    error,
    resetForm,
    searchTeam,
  } = props;

  const searchActions = [
    {
      label: 'Search',
      event: searchTeam,
      disabled: formData.selectedClient == -1,
    },
  ];

  const submitActions = [
    {
      label: 'Next Step',
      event: submitForm,
      disabled: false,
    },
    {
      label: 'Reset',
      event: resetForm,
      disabled: false,
    },
  ];

  return (
    <FormContainer>
      <h3>Find team for contract</h3>
      <Form
        formData={formData}
        formStatus={formStatus}
        actions={teams.length === 0 ? searchActions : submitActions}
      >
        <Input
          label="Pick a client:"
          type="select"
          htmlAttrs={{
            name: 'selectedClient',
            options: clients,
            disabled: teams.length > 0,
          }}
          value={formData.selectedClient}
          rules={{}}
        />
        <Input
          label="Pick a team:"
          type="select"
          htmlAttrs={{
            name: 'selectedTeam',
            options: teams,
            disabled: teams.length === 0,
          }}
          value={formData.selectedTeam}
          rules={{}}
        />
      </Form>
      {error && (
        <Errorbox
          error={{ message: 'Could not find teams, are you sure they exist?' }}
        />
      )}
    </FormContainer>
  );
};

TeamForm.propTypes = {
  formData: PT.object.isRequired,
  submitForm: PT.func.isRequired,
  resetForm: PT.func.isRequired,
  formStatus: PT.func.isRequired,
  formIsValid: PT.bool.isRequired,
  error: PT.bool,
  teams: PT.array,
  clients: PT.array,
  searchTeam: PT.func.isRequired,
};

TeamForm.defaultProps = {
  clients: [],
  teams: [],
};

export default container(TeamForm);
