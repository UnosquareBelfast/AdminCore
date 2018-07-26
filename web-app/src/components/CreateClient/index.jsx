import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import CreateClientForm from './CreateClientForm';
import { Card, Errorbox, Button } from '../common';
import { ListCTA } from './styled';

export const CreateClient = props => {
  const {
    goToAllClients,
    clientId,
    error,
    success,
    onSuccess,
    onFailed,
  } = props;
  const successMessage =
    clientId > 0
      ? 'Client updated successfully!'
      : 'Client created successfully!';
  return (
    <Card>
      <h3>{clientId > 0 ? 'Update Client' : 'Create Client'}</h3>
      <ListCTA>
        <Button label="View all clients" onClick={goToAllClients} />
      </ListCTA>
      <CreateClientForm
        clientId={clientId}
        onSuccess={onSuccess}
        onFailed={onFailed}
      />
      <Errorbox
        id="errorCreateUser"
        error={error}
        label="Error creating user"
      />
      {success && <p id="userCreatedSuccess">{successMessage}!</p>}
    </Card>
  );
};

CreateClient.propTypes = {
  goToAllClients: PT.func.isRequired,
  clientId: PT.number.isRequired,
  onSuccess: PT.func.isRequired,
  onFailed: PT.func.isRequired,
  error: PT.object,
  success: PT.bool,
};

CreateClient.defaultProps = {
  error: false,
  success: false,
};

export default container(CreateClient);
