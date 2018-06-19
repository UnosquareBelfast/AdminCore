import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { UserTable, ActiveDot } from './styled';
import employeeStatus from '../../utilities/employeeStatus';

export const UserListing = ({ users, viewUser, archive }) => {
  return (
    <UserTable>
      <tbody>
        <tr>
          <th>Status</th>
          <th>Name</th>
        </tr>
        {users.map(user => (
          <tr key={user.employeeId}>
            <td>
              <ActiveDot
                active={user.employeeStatusId === employeeStatus.ACTIVE}
              />
              {user.employeeStatusId === employeeStatus.ACTIVE
                ? 'Active'
                : 'Inactive'}
            </td>
            <td>
              {user.surname}, {user.forename}
            </td>

            <td>
              <button onClick={() => viewUser(user.employeeId)}>View Employee</button>
              {user.employeeStatusId === employeeStatus.ACTIVE ? (
                <button onClick={() => archive(user)}>Archive</button>
              ) : (
                <button onClick={() => archive(user, true)}>Activate</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </UserTable>
  );
};

UserListing.propTypes = {
  users: PT.array,
  archive: PT.func.isRequired,
  viewUser: PT.func.isRequired,
};

export default container(UserListing);
