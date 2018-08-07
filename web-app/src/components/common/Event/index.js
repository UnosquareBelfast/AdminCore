import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Container } from './styled';
import holidayStatus, { statusIcons } from '../../../utilities/holidayStatus';
import moment from 'moment';

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
