import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import employeeStatus from '../../utilities/employeeStatus';
import { Form, Input } from '../common';
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
        <Input
          type="select"
          htmlAttrs={{
            name: 'clientStatusId',
            options: [
              { value: employeeStatus.ACTIVE, displayValue: 'Active' },
              { value: employeeStatus.INACTIVE, displayValue: 'Inactive' },
            ],
          }}
          value={formData.clientStatusId}
          label="Client Status Id:"
        />
        <Input
          type="textarea"
          htmlAttrs={{
            type: 'input',
            name: 'clientStatusDescription',
            placeholder: 'Enter a client Status Description',
          }}
          value={formData.clientStatusDescription}
          label="Client Status Description:"
          rules={{
            required: true,
          }}
        />
        <Input
          type="input"
          htmlAttrs={{
            type: 'email',
            name: 'contactEmail',
            placeholder: 'Enter an Contact Email',
          }}
          value={formData.contactEmail}
          label="Contact Email:"
          rules={{
            required: true,
            isEmail: true,
          }}
        />
        <Input
          type="input"
          htmlAttrs={{
            type: 'input',
            name: 'contactName',
            placeholder: 'Enter an Contact Name',
          }}
          value={formData.contactName}
          label="Contact Name:"
          rules={{
            required: true,
          }}
        />
        <Input
          type="input"
          htmlAttrs={{
            type: 'number',
            name: 'minimumEmployeesForTeam',
            placeholder: 'Minimum Employees For Team:',
          }}
          value={formData.minimumEmployeesForTeam}
          label="Enter minimum employee number"
          rules={{
            required: true,
          }}
        />
        <Input
          type="input"
          htmlAttrs={{
            type: 'input',
            name: 'teamName',
            placeholder: 'Enter a Team Name',
          }}
          value={formData.teamName}
          label="Team Name:"
          rules={{
            required: true,
            isEmail: true,
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
