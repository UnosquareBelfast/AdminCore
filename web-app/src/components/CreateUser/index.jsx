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
  formElementsArray: PT.array,
  formIsValid: PT.bool,
  submitForm: PT.func,
  formChanged: PT.func,
  startDateChanged: PT.func,
  error: PT.object,
  success: PT.bool,
  loading: PT.bool,
};

export default container(CreateUser);
