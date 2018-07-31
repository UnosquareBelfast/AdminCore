import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Form, Input } from '../../common';
import { FormContainer } from './styled';

export const CreateClientForm = props => {
  const {
    clientId,
    submitFormCreate,
    submitFormUpdate,
    formStatus,
    formData,
    formIsValid,
  } = props;

  let ctas = [];
  if (clientId > 0) {
    ctas = [
      {
        label: 'Update Client',
        event: submitFormUpdate,
        disabled: false,
      },
    ];
  } else {
    ctas = [
      {
        label: 'Create Client',
        event: submitFormCreate,
        disabled: !formIsValid,
      },
    ];
  }

  return (
    <FormContainer>
      <Form formData={formData} formStatus={formStatus} actions={ctas}>
        <Input
          type="input"
          htmlAttrs={{
            type: 'input',
            name: 'clientName',
            placeholder: 'Enter a Client Name',
          }}
          value={formData.clientName}
          focus
          label="Client Name:"
          rules={{
            required: true,
          }}
        />
      </Form>
    </FormContainer>
  );
};

CreateClientForm.propTypes = {
  clientId: PT.number.isRequired,
  formData: PT.object.isRequired,
  submitFormCreate: PT.func.isRequired,
  submitFormUpdate: PT.func.isRequired,
  formStatus: PT.func.isRequired,
  formIsValid: PT.bool.isRequired,
};

export default container(CreateClientForm);
