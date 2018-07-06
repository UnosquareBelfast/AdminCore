import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { LoginBG, LoginPanel } from './styled';
import container from './container';
import { Form, Input } from '../../components/common';

export const Login = props => {
  const { submitForm } = props;

  return (
    <LoginBG>
      <LoginPanel>
        <h1>Welcome to Admin Core</h1>
        <Form
          submitForm={submitForm}
          isValid={valid => console.log('valid', valid)}
        >
          <Input
            type="input"
            htmlAttr={{ type: 'email', placeholder: 'Enter an email' }}
            focus
            label="Email:"
            rules={{
              required: true,
              isEmail: true,
            }}
          />
          <Input
            type="input"
            htmlAttr={{ type: 'password', placeholder: 'Enter an password' }}
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
  email: PT.string,
  password: PT.string,
  submitForm: PT.func.isRequired,
};

export default container(Login);
