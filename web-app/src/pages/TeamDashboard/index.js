import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Container } from './styled';

export const User = props => {
  return <Container>hey</Container>;
};

User.propTypes = {
  localUser: PT.object,
  profileUser: PT.object,
  profileHolidays: PT.array,
  history: PT.object,
};

export default User;
