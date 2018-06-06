import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { UserTable, ActiveDot } from './styled';
import employeeStatus from '../../utilities/employeeStatus';

const UserListing = ({ users, edit, archive, ViewHolidays }) => {
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
              <button onClick={() => edit(user)}>Edit User</button>
              <button onClick={() => ViewHolidays(user)}>View Holidays</button>
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
  edit: PT.func.isRequired,
  ViewHolidays: PT.func.isRequired,
};

export default container(UserListing);
