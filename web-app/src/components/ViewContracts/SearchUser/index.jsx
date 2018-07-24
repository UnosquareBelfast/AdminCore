import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Form, Input } from '../../common';
import { FormContainer } from './styled';

export const SearchUser = props => {
  const { submitForm, formStatus, formData, users } = props;
  return (
    <FormContainer>
      <Form
        formData={formData}
        submitForm={submitForm}
        formStatus={formStatus}
        actions={[
          {
            label: 'Search User',
            event: props.submitForm,
            disabled: !formData.fullName.includes(' '),
          },
        ]}
      >
        <Input
          type="input"
          htmlAttrs={{
            name: 'fullName',
            placeholder: 'Full Name',
          }}
          value={formData.fullName}
          label="Search User's Full Name:"
          rules={{
            required: true,
          }}
        />
        <Input
          type="select"
          htmlAttrs={{
            name: 'selectedUserId',
            options: users,
            disabled: users.length === 0,
          }}
          value={formData.selectedUserId}
          label="Select Employee:"
          rules={{}}
        />
      </Form>
    </FormContainer>
  );
};

SearchUser.propTypes = {
  formData: PT.object.isRequired,
  submitForm: PT.func.isRequired,
  formStatus: PT.func.isRequired,
  formIsValid: PT.bool.isRequired,
  users: PT.array,
};

SearchUser.defaultProps = {
  users: [],
};

export default container(SearchUser);
