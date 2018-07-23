import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import SearchUserForm from './SearchUser';

export const CreateUser = props => {
  return (
    <div>
      <h2>View Contracts</h2>
      <SearchUserForm onSuccess={() => {}} />
    </div>
  );
};

CreateUser.propTypes = {};

export default container(CreateUser);
