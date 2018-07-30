import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Container } from './styled';
import holidayStatus, { statusIcons } from '../../../utilities/holidayStatus';

const Event = ({ children, event }) => {
  let id = event.eventType.eventTypeId;
  const { eventStatusId } = event.eventStatus;
  const { eventTypeId } = event.eventType;

  if (event.eventType.eventTypeId === 1) {
    id = eventStatusId;
  } else if (eventTypeId === 2) {
    id = holidayStatus.WFH;
  } else if (eventTypeId === 3) {
    id = holidayStatus.SICK;
  } else if (eventTypeId === 4) {
    id = holidayStatus.WRT;
  }
  return (
    <Container status={id} onClick={children.props.onClick}>
      {statusIcons[id]}
      {`    ${event.employee.forename} ${event.employee.surname}`}
    </Container>
  );
};

Event.propTypes = {
  children: PT.node,
  event: PT.object,
};

export default Event;
