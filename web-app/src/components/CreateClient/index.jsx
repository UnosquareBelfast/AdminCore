import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import CreateClientForm from '../CreateClientForm';
import { Card, Errorbox } from '../common';

export const CreateClient = props => {
  const { error, success, onSuccess, onFailed } = props;

  return (
    <Card>
      <h3>Create Client</h3>
      <CreateClientForm onSuccess={onSuccess} onFailed={onFailed} />
      <Errorbox
        id="errorCreateUser"
        error={error}
        label="Error creating user"
      />
      {success && <p id="userCreatedSuccess">Client created successfully!</p>}
    </Card>
  );
};

CreateClient.propTypes = {
  error: PT.object,
  success: PT.bool,
  onSuccess: PT.func.isRequired,
  onFailed: PT.func.isRequired,
};

CreateClient.defaultProps = {
  error: false,
  success: false,
};

export default container(CreateClient);
