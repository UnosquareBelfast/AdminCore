import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Form, Input, Errorbox } from '../../../common';
import { FormContainer } from '../styled';

export const UserForm = props => {
  const {
    submitForm,
    searchUser,
    formStatus,
    formData,
    formIsValid,
    users,
    error,
    resetForm,
  } = props;

  const searchActions = [
    {
      label: 'Search',
      event: searchUser,
      disabled: !formData.userFullName.includes(' '),
    },
  ];

  const submitActions = [
    {
      label: 'Next Step',
      event: submitForm,
      disabled: !formIsValid,
    },
    {
      label: 'Reset',
      event: resetForm,
      disabled: false,
    },
  ];

  return (
    <FormContainer>
      <h3>Find user for contract</h3>
      <Form
        formData={formData}
        formStatus={formStatus}
        actions={users.length === 0 ? searchActions : submitActions}
      >
        <Input
          label="Search full name:"
          type="input"
          htmlAttrs={{
            name: 'userFullName',
            placeholder: 'Enter full name',
          }}
          rules={{
            required: true,
          }}
          value={formData.userFullName}
        />
        <Input
          label="Pick a user:"
          type="select"
          htmlAttrs={{
            name: 'selectedUserId',
            options: users,
            disabled: users.length === 0,
          }}
          value={formData.selectedUserId}
          rules={{
            required: true,
          }}
        />
      </Form>
      {error && <Errorbox error={{ message: 'Could not find user' }} />}
    </FormContainer>
  );
};

UserForm.propTypes = {
  formData: PT.object.isRequired,
  submitForm: PT.func.isRequired,
  resetForm: PT.func.isRequired,
  searchUser: PT.func.isRequired,
  formStatus: PT.func.isRequired,
  formIsValid: PT.bool.isRequired,
  users: PT.array,
  error: PT.bool,
};

UserForm.defaultProps = {
  users: [],
};

export default container(UserForm);
