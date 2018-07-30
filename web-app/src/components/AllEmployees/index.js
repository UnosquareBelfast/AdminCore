import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import { UserList } from '../';
import container from './container';

const AllEmployees = props => {
  return (
    <Fragment>
      <h2>Employees</h2>
      <UserList
        history={props.history}
        users={props.users}
        columns={['fullName', 'email', 'role', 'location']}
        onRowClick={employee => console.log(employee)}
      />
    </Fragment>
  );
};

AllEmployees.propTypes = {
  history: PT.object.isRequired,
  users: PT.array.isRequired,
};

export default container(AllEmployees);
