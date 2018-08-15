import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Button } from '../common';
import { CornerButton } from '../common_styled';
import { DataTable, ClientModal } from '../';
import ClientCells from '../DataTable/Cells/clients';

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
      <CornerButton>
        <Button
          onClick={() => history.replace('/admin/clients/new')}
          label="New Client"
        />
      </CornerButton>
      <h2>All Clients</h2>
      <DataTable
        data={clients}
        cells={ClientCells}
        columns={['clientName']}
        onRowClick={data => selectClient(data)}
        pageSize={20}
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
