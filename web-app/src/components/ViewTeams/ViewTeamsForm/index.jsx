import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Form, Input } from '../../common';
import { FormContainer } from './styled';

export const CreateTeamForm = props => {
  const { submitForm, formStatus, formData, formIsValid, clients } = props;

  return (
    <FormContainer>
      <Form formData={formData} formStatus={formStatus} actions={[]}>
        <Input
          label="Pick a client:"
          type="select"
          htmlAttrs={{
            name: 'selectedClient',
            options: clients,
            disabled: clients.length === 0,
          }}
          value={formData.selectedClient}
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
