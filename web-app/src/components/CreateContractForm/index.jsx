import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Form, Input } from '../common';
import { FormContainer } from './styled';

export const CreateContractForm = props => {
  const { submitForm, formStatus, formData, formIsValid } = props;

  return (
    <FormContainer>
      <Form
        formData={formData}
        submitForm={submitForm}
        formStatus={formStatus}
        actions={[
          {
            label: 'Create Contract',
            event: props.submitForm,
            disabled: !formIsValid,
          },
        ]}
      >
        <Input
          label="Client:"
          type="select"
          htmlAttrs={{
            name: 'clientId',
            options: [],
          }}
          value={formData.clientId}
        />
        <Input
          label="Team:"
          type="select"
          htmlAttrs={{
            name: 'teamId',
            options: [],
            disabled: false,
          }}
          value={formData.teamId}
        />
        <Input
          label="Start Date:"
          type="date"
          htmlAttrs={{
            type: 'input',
            name: 'startDate',
            placeholder: 'Enter a start date',
          }}
          rules={{}}
          value={formData.startDate}
        />
        <Input
          label="End Date:"
          type="date"
          htmlAttrs={{
            type: 'input',
            name: 'endDate',
            placeholder: 'Enter a end date',
          }}
          value={formData.endDate}
          rules={{}}
        />
      </Form>
    </FormContainer>
  );
};

CreateContractForm.propTypes = {
  formData: PT.object.isRequired,
  submitForm: PT.func.isRequired,
  formStatus: PT.func.isRequired,
  formIsValid: PT.bool.isRequired,
};

export default container(CreateContractForm);
