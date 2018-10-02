import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import { DataTable, UserModal } from '../';
import UserCells from '../DataTable/Cells/users';
import { Button } from '../common';
import { CornerButton } from '../common_styled';
import container from './container';

const AllEmployees = ({ history, users, selectUser, selectedUser, closeUserModal, userModalVisible }) => {
  return (
    <Fragment>
      <CornerButton>
        <Button
          onClick={() => history.replace('/admin/employees/new')}
          label="New Employee"
        />
      </CornerButton>
      {userModalVisible && (
        <UserModal
          user={selectedUser}
          closeModal={closeUserModal}
          history={history}
        />
      )}
      <h2>Employees</h2>
      <DataTable
        data={users}
        cells={UserCells}
        columns={['fullName', 'email', 'role', 'location']}
        onRowClick={employee => selectUser(employee)}
        pageSize={20}
      />
    </Fragment>
  );
};

AllEmployees.propTypes = {
  history: PT.object.isRequired,
  users: PT.array.isRequired,
  selectUser: PT.func.isRequired,
  selectedUser: PT.object.isRequired,
  userModalVisible: PT.bool.isRequired,
  closeUserModal: PT.func.isRequired,
};

export default container(AllEmployees);
