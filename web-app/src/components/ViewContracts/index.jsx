import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import SearchUserForm from './SearchUser';
import { ContractList } from '../';
import { Button } from '../common';
import { CornerButton } from '../common_styled';

export const ViewContracts = ({ contracts, updateContracts, history }) => {
  return (
    <div>
      <CornerButton>
        <Button
          onClick={() => history.replace('/admin/contracts/new')}
          label="Create Contract"
        />
      </CornerButton>
      <h2>View Contracts</h2>
      <SearchUserForm onSuccess={updateContracts} />
      <ContractList
        contracts={contracts}
        columns={['startDate', 'endDate']}
        pageSize={20}
      />
    </div>
  );
};

ViewContracts.propTypes = {
  contracts: PT.array.isRequired,
  updateContracts: PT.func.isRequired,
  history: PT.object.isRequired,
};

export default container(ViewContracts);
