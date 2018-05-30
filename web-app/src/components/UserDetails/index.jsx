import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container'

import { Card } from '../styled'

export const UserDetails = (props) => {

  
  return (
    <Card>
        <strong>User Details</strong>

        <div>Name: { props.user.surname + ', ' + props.user.forename }</div>
        <div>Role: { props.user.employeeRoleDescription } </div>

    </Card>
  );
};


export default container(UserDetails);
