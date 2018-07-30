import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Button } from '../common';
import { HeaderButton } from './styled';
import { ClientList, ClientModal } from '../';

export const AllClients = ({
  clients,
  history,
  selectClient,
  selectedClient,
}) => {
  return (
    <Fragment>
      <ClientModal
        client={selectedClient}
        visible={selectedClient}
        history={history}
        closeModal={() => selectClient(null)}
      />
      <HeaderButton>
        <Button
          onClick={() => history.replace('/admin/clients/new')}
          label="New Client"
        />
      </HeaderButton>
      <h2>All Clients</h2>
      <ClientList
        clients={clients}
        columns={['clientName']}
        onRowClick={data => selectClient(data)}
      />
    </Fragment>
  );
};

AllClients.propTypes = {
  history: PT.object.isRequired,
  clients: PT.array.isRequired,
  selectClient: PT.func.isRequired,
  selectedClient: PT.object,
};

export default container(AllClients);
