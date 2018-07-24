import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import CreateUserForm from './CreateUserForm';
import { Errorbox } from '../common';

export const CreateUser = props => {
  const { error, success, onSuccess, onFailed } = props;

  return (
    <div>
      <h2>Create User</h2>
      <CreateUserForm onSuccess={onSuccess} onFailed={onFailed} />
      <Errorbox
        id="errorCreateUser"
        error={error}
        label="Error creating user"
      />
      {success && <p id="userCreatedSuccess">User created successfully!</p>}
    </div>
  );
};

CreateUser.propTypes = {
  error: PT.object,
  success: PT.bool,
  onSuccess: PT.func.isRequired,
  onFailed: PT.func.isRequired,
};

CreateUser.defaultProps = {
  error: false,
  success: false,
};

export default container(CreateUser);
