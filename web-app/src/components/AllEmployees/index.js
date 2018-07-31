import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import { UserList, UserModal } from '../';
import container from './container';

const AllEmployees = ({ history, users, selectUser, selectedUser }) => {
  return (
    <Fragment>
      <UserModal
        user={selectedUser}
        closeModal={() => selectUser({})}
        history={history}
      />
      <h2>Employees</h2>
      <UserList
        history={history}
        users={users}
        columns={['fullName', 'email', 'role', 'location']}
        onRowClick={employee => selectUser(employee)}
      />
    </Fragment>
  );
};

AllEmployees.propTypes = {
  history: PT.object.isRequired,
  users: PT.array.isRequired,
  selectUser: PT.func.isRequired,
  selectedUser: PT.object.isRequired,
};

export default container(AllEmployees);
