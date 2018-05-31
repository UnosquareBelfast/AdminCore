import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container'

import { Card } from '../styled'

export const UserDetails = (props) => {

  const { user: { forename, surname, employeeRoleDescription } } = props;
  
  return (
    <Card>
        <strong>User Details</strong>

        <div><span>Name: { surname + ', ' + forename }</span></div>
        <div><span>Role: { employeeRoleDescription } </span></div>

    </Card>
  );
};


export default container(UserDetails);
