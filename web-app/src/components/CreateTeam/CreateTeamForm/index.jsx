import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Form, Input } from '../../common';
import { FormContainer } from './styled';

export const CreateTeamForm = props => {
  const { submitForm, formStatus, formData, formIsValid, clients } = props;

  return (
    <FormContainer>
      <Form
        formData={formData}
        formStatus={formStatus}
        actions={[
          {
            label: 'Create Team',
            event: submitForm,
            disabled: !formIsValid || formData.selectedClient == -1,
          },
        ]}
      >
        <Input
          label="Client:"
          type="select"
          htmlAttrs={{
            name: 'selectedClient',
            options: clients,
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
            disabled: formData.selectedClient == -1,
          }}
          value={formData.teamName}
          rules={{
            required: true,
            minLength: 3,
          }}
        />
      </Form>
    </FormContainer>
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
