import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { CardContainer } from './styled';

const Card = ({children}) => (
  <CardContainer className="card">
    {children}
  </CardContainer>
);

Card.propTypes = {
  children: PT.node,
};

export default Card;
