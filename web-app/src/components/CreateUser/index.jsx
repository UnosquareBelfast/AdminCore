import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Card, Input, Button, Errorbox } from '../common';
import { Form, ButtonWrap } from './styled';

export const CreateUser = props => {
  const {
    formElementsArray,
    formIsValid,
    submitForm,
    formChanged,
    error,
    success,
    loading,
  } = props;

  let form;
  if (loading) {
    form = null;
  } else {
    form = (
      <Form autoComplete="off">
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
        <ButtonWrap>
          <Button
            id="createUserBtn"
            label="Create User"
            onClick={submitForm}
            disabled={!formIsValid}
          />
        </ButtonWrap>
      </Form>
    );
  }

  return (
    <Card>
      <h3>Create Employee</h3>
      {form}
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
  formElementsArray: PT.array.isRequired,
  formIsValid: PT.bool.isRequired,
  submitForm: PT.func.isRequired,
  formChanged: PT.func.isRequired,
  loading: PT.bool.isRequired,
  error: PT.object,
  success: PT.bool,
};

CreateUser.defaultProps = {
  error: false,
  success: false,
};

export default container(CreateUser);
