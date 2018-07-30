import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Container } from './styled';
import holidayStatus, { statusIcons } from '../../../utilities/holidayStatus';

const Event = ({ children, event }) => {
  const { eventStatusId } = event.eventStatus;
  const { eventTypeId } = event.eventType;
  let id = eventTypeId;

  if (eventTypeId === 1) {
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
      {statusIcons[id]} {event.title}
    </Container>
  );
};

Event.propTypes = {
  children: PT.node,
  event: PT.object,
};

export default Event;
