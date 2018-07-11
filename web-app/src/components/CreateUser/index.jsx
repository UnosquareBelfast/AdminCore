import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import employeeStatus from '../../utilities/employeeStatus';
import { Card, Form, Input, Errorbox } from '../common';
import { FormContainer } from './styled';

export const CreateUser = props => {
  const { error, success, loading, submitForm, formStatus, formData } = props;

  let form;
  if (loading) {
    form = null;
  } else {
    form = (
      <Form
        formData={formData}
        submitForm={submitForm}
        formStatus={formStatus}
        buttonLabel="Create user"
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
          focus={false}
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
          focus={false}
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
          focus={false}
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
          focus={false}
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
          focus={false}
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
          focus={false}
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
          focus={false}
          label="Start Date:"
        />
      </Form>
    );
  }

  return (
    <Card>
      <h3>Create User</h3>
      <FormContainer>{form}</FormContainer>
      <Errorbox
        id="errorCreateUser"
        error={error}
        label="Error creating user"
      />
      {success && <p id="userCreatedSuccess">User created successfully!</p>}
    </Card>
  );
};

CreateUser.propTypes = {
  loading: PT.bool.isRequired,
  error: PT.object,
  success: PT.bool,
  formData: PT.object.isRequired,
  submitForm: PT.func.isRequired,
  formStatus: PT.func.isRequired,
};

CreateUser.defaultProps = {
  error: false,
  success: false,
};

export default container(CreateUser);
