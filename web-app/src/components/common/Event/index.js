import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Container } from './styled';

const Event = ({children, event}) => (
  <Container status={event.holidayStatusId} onClick={children.props.onClick}>
    {`${event.employee.forename} ${event.employee.surname}`}
  </Container>
);

Event.propTypes = {
  children: PT.node,
  event: PT.object,
};

export default Event;
