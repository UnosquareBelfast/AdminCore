import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Card } from '../common';
import { StyleContainer } from './styled';
import employeeRoles from '../../utilities/roles';

const roleIdToText = role => {
  switch (role) {
    case employeeRoles.ADMIN:
      return 'Administrator';
    case employeeRoles.SUPER:
      return 'Team Leader';
    case employeeRoles.STANDARD:
      return 'Employee';
    default:
      return '';
  }
};

export const UserDetails = props => {
  const {
    user: { forename, surname, employeeRoleId },
  } = props;

  return (
    <Card>
      <StyleContainer>
        <strong>Logged in as</strong>
        <p>Name: {`${surname}, ${forename}`}</p>
        <p>Role: {roleIdToText(employeeRoleId)} </p>
      </StyleContainer>
    </Card>
  );
};

UserDetails.propTypes = {
  user: PT.object,
};

export default container(UserDetails);
