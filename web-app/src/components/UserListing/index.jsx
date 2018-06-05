import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { UserTable, ActiveDot } from './styled';

const UserListing = ({ users, edit, archive, amendHolidays }) => {
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
              <ActiveDot active={user.employeeStatusId === 1} />
              {user.employeeStatusId === 1 ? 'Active' : 'Inactive'}
            </td>
            <td>
              {user.surname}, {user.forename}
            </td>

            <td>
              <button onClick={() => edit(user)}>Edit</button>
              <button onClick={() => amendHolidays(user)}>
                Amend Holidays
              </button>
              {user.employeeStatusId === 1 ? (
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
  amendHolidays: PT.func.isRequired,
};

export default container(UserListing);
