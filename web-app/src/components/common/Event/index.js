import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Container } from './styled';
import { statusIcons } from '../../../utilities/holidayStatus';

const Event = ({ children, event }) => (
  <Container status={event.holidayStatusId} onClick={children.props.onClick}>
    {statusIcons[event.holidayStatusId]}
    {`    ${event.employee.forename} ${event.employee.surname}`}
  </Container>
);

Event.propTypes = {
  children: PT.node,
  event: PT.object,
};

export default Event;
