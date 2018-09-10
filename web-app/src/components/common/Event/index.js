import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Container } from './styled';
import eventCategory from '../../../utilities/eventCategory';
import eventTypes, { typeIcons } from '../../../utilities/eventTypes';
import { statusIcons } from '../../../utilities/holidayStatus';
import moment from 'moment';

const Event = ({ children, event }) => {
  const { eventStatusId } = event.eventStatus;
  const { eventTypeId } = event.eventType;
  let id = eventTypeId;
  let icon;
  let category;

  if (eventTypeId === eventTypes.ANNUAL_LEAVE) {
    icon = statusIcons[eventStatusId];
    category = eventCategory.HOLIDAY_STATUS;
  } else {
    icon = typeIcons[eventTypeId];
    category = eventCategory.EVENT_TYPE;
  }

  const today = new moment();
  const eventPast = event.end.endOf().isBefore(today);

  return (
    <Container
      fade={eventPast}
      className={
        event.halfDay ? category + ' small ishalfday' : category + ' small'
      }
      status={id}
      onClick={children.props.onClick}
    >
      {icon} <span>{event.title}</span>
    </Container>
  );
};

Event.propTypes = {
  children: PT.node,
  event: PT.object,
};

export default Event;
