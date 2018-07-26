import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Button } from '../common';
import { HeaderButton } from './styled';
import { ClientList } from '../';

export const AllClients = ({ clients, history }) => {
  return (
    <Fragment>
      <HeaderButton>
        <Button
          onClick={() => history.replace('/admin/clients/new')}
          label="New Client"
        />
      </HeaderButton>
      <h2>All Clients</h2>
      <ClientList clients={clients} columns={['clientName']} />
    </Fragment>
  );
};

AllClients.propTypes = {
  history: PT.object.isRequired,
  clients: PT.array.isRequired,
};

export default container(AllClients);
