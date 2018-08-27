import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Container } from './styled';
import eventTypes, { getEventTypeValue } from '../../../utilities/eventTypes';
import { statusIcons } from '../../../utilities/holidayStatus';
import moment from 'moment';

const Event = ({ children, event }) => {
  const { eventStatusId } = event.eventStatus;
  const { eventTypeId } = event.eventType;
  let id = eventTypeId;

  if (eventTypeId === eventTypes.ANNUAL_LEAVE) {
    id = eventStatusId;
  } else {
    id = getEventTypeValue(eventTypeId, eventStatusId);
  }

  const today = new moment();
  const eventPast = event.end.endOf().isBefore(today);

  return (
    <Container
      fade={eventPast}
      className={event.halfDay ? 'ishalfday' : ''}
      status={id}
      onClick={children.props.onClick}
    >
      {statusIcons[id]} <span>{event.title}</span>
    </Container>
  );
};

Event.propTypes = {
  children: PT.node,
  event: PT.object,
};

export default Event;
