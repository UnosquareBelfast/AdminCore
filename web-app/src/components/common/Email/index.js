import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { StyledLink } from '../../common_styled';

const Email = ({ children }) => (
  <StyledLink href={`mailto:${children}`}>{children}</StyledLink>
);

Email.propTypes = {
  children: PT.string,
};

export default Email;
