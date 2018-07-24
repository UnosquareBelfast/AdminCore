import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import SearchUserForm from './SearchUser';
import { ContractList } from '../';

export const ViewContracts = ({ contracts, updateContracts }) => {
  return (
    <div>
      <h2>View Contracts</h2>
      <SearchUserForm onSuccess={updateContracts} />
      <ContractList contracts={contracts} columns={['startDate', 'endDate']} />
    </div>
  );
};

ViewContracts.propTypes = {
  contracts: PT.array.isRequired,
  updateContracts: PT.func.isRequired,
};

export default container(ViewContracts);
