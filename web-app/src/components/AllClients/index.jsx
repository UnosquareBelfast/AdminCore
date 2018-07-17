import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Table, Button } from '../common';
import { ActiveDot, CTA } from './styled';
import employeeStatus from '../../utilities/employeeStatus';

export const AllClients = ({
  clients,
  viewClient,
  archive,
  createNewClient,
}) => {
  let clientList;
  if (clients.length > 0) {
    clientList = clients.map(client => (
      <tr key={client.clientId}>
        <td>{client.clientName}</td>
        <td>{client.clientStatusDescription}</td>
        <td>
          <ActiveDot active={client.clientStatusId === employeeStatus.ACTIVE} />
          {client.clientStatusId === employeeStatus.ACTIVE
            ? 'Active'
            : 'Inactive'}
        </td>
        <td>
          <button onClick={() => viewClient(client.clientId)}>
            Edit Client
          </button>
          {client.clientStatusId === employeeStatus.ACTIVE ? (
            <button className="success" onClick={() => archive(client)}>
              Archive
            </button>
          ) : (
            <button className="error" onClick={() => archive(client, true)}>
              Activate
            </button>
          )}
        </td>
      </tr>
    ));
  } else {
    clientList = (
      <tr>
        <td>No Clients</td>
        <td />
        <td />
        <td />
      </tr>
    );
  }
  return (
    <Fragment>
      <h2>All Clients</h2>
      <Table
        tableHeaders={['Name', 'Description', 'Status', ' ']}
        tableRows={clientList}
      />
      <CTA>
        <Button onClick={() => createNewClient()} label="New Client" />
      </CTA>
    </Fragment>
  );
};

AllClients.propTypes = {
  createNewClient: PT.func,
  clients: PT.array,
  archive: PT.func.isRequired,
  viewClient: PT.func.isRequired,
};

export default container(AllClients);
