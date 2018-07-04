import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { LoginBG, LoginPanel } from './styled';
import container from './container';
import { Input, Button } from '../../components/common';

export const Login = props => {
  const { formElementsArray, formIsValid, submitForm, formChanged } = props;

  let form = (
    <form id="loginForm">
      {formElementsArray.map(({ id, config }, index) => (
        <Input
          key={id}
          label={config.label}
          elementType={config.elementType}
          elementConfig={config.elementConfig}
          value={config.value}
          invalid={!config.valid}
          shouldValidate={config.validation}
          focus={index === 0 ? true : false}
          touched={config.touched}
          changed={event => formChanged(event, id)}
        />
      ))}
      <Button
        id="createUserBtn"
        label="Login"
        onClick={submitForm}
        disabled={!formIsValid}
      />
    </form>
  );

  return (
    <LoginBG>
      <LoginPanel>
        <h1>Welcome to Admin Core</h1>
        {form}
      </LoginPanel>
    </LoginBG>
  );
};

Login.propTypes = {
  formElementsArray: PT.array.isRequired,
  formIsValid: PT.bool.isRequired,
  submitForm: PT.func.isRequired,
  formChanged: PT.func.isRequired,
};

export default container(Login);
