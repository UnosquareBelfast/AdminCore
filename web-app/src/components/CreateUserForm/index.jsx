import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import employeeStatus from '../../utilities/employeeStatus';
import { Form, Input } from '../common';
import { FormContainer } from './styled';

export const CreateUserForm = props => {
  const { submitForm, formStatus, formData, formIsValid } = props;

  return (
    <FormContainer>
      <Form
        formData={formData}
        submitForm={submitForm}
        formStatus={formStatus}
        actions={[
          {
            label: 'Create User',
            event: props.submitForm,
            disabled: !formIsValid,
          },
        ]}
      >
        <Input
          type="input"
          htmlAttrs={{
            type: 'input',
            name: 'forename',
            placeholder: 'Enter a forename',
          }}
          value={formData.forename}
          focus
          label="Forename:"
          rules={{
            required: true,
          }}
        />
        <Input
          type="input"
          htmlAttrs={{
            type: 'input',
            name: 'surname',
            placeholder: 'Enter a surname',
          }}
          value={formData.surname}
          label="Surname:"
          rules={{
            required: true,
          }}
        />
        <Input
          type="input"
          htmlAttrs={{
            type: 'email',
            name: 'email',
            placeholder: 'Enter an email',
          }}
          value={formData.email}
          label="Email:"
          rules={{
            required: true,
            isEmail: true,
          }}
        />
        <Input
          type="input"
          htmlAttrs={{
            type: 'password',
            name: 'password',
            placeholder: 'Enter an password',
          }}
          value={formData.password}
          label="Password:"
          rules={{
            required: true,
            minLength: 6,
          }}
        />
        <Input
          type="select"
          htmlAttrs={{
            name: 'country',
            options: [
              { value: 1, displayValue: 'Northern Ireland' },
              { value: 2, displayValue: 'Mexico' },
            ],
          }}
          value={formData.country}
          label="Country:"
        />
        <Input
          type="select"
          htmlAttrs={{
            name: 'status',
            options: [
              { value: employeeStatus.ACTIVE, displayValue: 'Active' },
              { value: employeeStatus.INACTIVE, displayValue: 'Inactive' },
            ],
          }}
          value={formData.status}
          label="Status:"
        />
        <Input
          type="select"
          htmlAttrs={{
            name: 'employeeRole',
            options: [
              { value: 1, displayValue: 'Team Leader' },
              { value: 2, displayValue: 'System Admin' },
              { value: 3, displayValue: 'Employee' },
            ],
          }}
          value={formData.employeeRole}
          label="Employee Role:"
        />
        <Input
          type="date"
          htmlAttrs={{
            type: 'input',
            name: 'startDate',
            placeholder: 'Enter a start date',
          }}
          value={formData.startDate}
          rules={{
            dateNotInPast: true,
          }}
          label="Start Date:"
        />
      </Form>
    </FormContainer>
  );
};

CreateUserForm.propTypes = {
  formData: PT.object.isRequired,
  submitForm: PT.func.isRequired,
  formStatus: PT.func.isRequired,
  formIsValid: PT.bool.isRequired,
};

export default container(CreateUserForm);
