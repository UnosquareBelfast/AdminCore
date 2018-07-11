import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { LoginBG, LoginPanel } from './styled';
import container from './container';
import { Form, Input } from '../../components/common';

export const Login = props => {
  const { submitForm, formStatus, formData, formIsValid } = props;

  return (
    <LoginBG>
      <LoginPanel>
        <h1>Welcome to Admin Core</h1>
        <Form
          formData={formData}
          submitForm={submitForm}
          formStatus={formStatus}
          actions={[
            {
              label: 'Login',
              event: props.submitForm,
              disabled: !formIsValid,
            },
          ]}
        >
          <Input
            type="input"
            htmlAttrs={{
              type: 'email',
              name: 'email',
              placeholder: 'Enter an email',
            }}
            value={formData.email}
            focus
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
        </Form>
      </LoginPanel>
    </LoginBG>
  );
};

Login.propTypes = {
  formData: PT.object.isRequired,
  submitForm: PT.func.isRequired,
  formStatus: PT.func.isRequired,
  formIsValid: PT.bool.isRequired,
};

export default container(Login);
