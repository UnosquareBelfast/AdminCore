import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';

export const AllClients = ({ clients }) => {
  let clientList;
  if (clientList) {
    clientList = clients.map(client => {
      return <li>{client.clientsName}</li>;
    });
  } else {
    clientList = <li>No Clients</li>;
  }
  return (
    <Fragment>
      <h2>All Clients</h2>
      <ul>{clientList}</ul>
    </Fragment>
  );
};

AllClients.propTypes = {
  clients: PT.array,
};

export default container(AllClients);
