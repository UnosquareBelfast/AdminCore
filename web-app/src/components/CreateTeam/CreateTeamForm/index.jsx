import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Form, Input } from '../../common';

export const CreateTeamForm = props => {
  const { submitForm, formStatus, formData, formIsValid, clients } = props;

  return (
    <Form
      formData={formData}
      formStatus={formStatus}
      actions={[
        {
          label: 'Create Team',
          event: submitForm,
          disabled: !formIsValid,
        },
      ]}
    >
      <Input
        label="Client:"
        type="select"
        htmlAttrs={{
          name: 'selectedClient',
          options: clients,
          disabled: clients.length === 0,
        }}
        value={formData.selectedClient}
      />
      <Input
        label="Team Name:"
        type="input"
        htmlAttrs={{
          type: 'input',
          name: 'teamName',
          placeholder: 'Enter a team name',
          disabled: clients.length === 0,
        }}
        value={formData.teamName}
        rules={{
          required: true,
        }}
      />
    </Form>
  );
};

CreateTeamForm.propTypes = {
  clients: PT.array,
  formData: PT.object.isRequired,
  submitForm: PT.func.isRequired,
  formStatus: PT.func.isRequired,
  formIsValid: PT.bool.isRequired,
};

CreateTeamForm.defaultProps = {
  clients: [],
};

export default container(CreateTeamForm);
