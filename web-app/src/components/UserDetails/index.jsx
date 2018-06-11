import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';

import { Card } from '../common';

const UserDetails = (props) => {

  const { user: { forename, surname, employeeRoleDescription } } = props;

  return (
    <Card>
      <strong>User Details</strong>
      <div><span>Name: { `${surname}, ${forename}` }</span></div>
      <div><span>Role: { employeeRoleDescription }</span></div>
    </Card>
  );
};

UserDetails.propTypes = {
  user: PT.object,
};

export default container(UserDetails);
