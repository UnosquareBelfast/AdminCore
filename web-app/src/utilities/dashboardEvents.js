import { getDurationBetweenDates } from './dates';
import mandatoryEvents from './mandatoryEvents';
import flow from 'lodash/fp/flow';

// The pipeline that our events go through to make them calendar ready.
export const transformEvents = (allEvents, prevEvents) => {
  return flow(_formatEventsForCalendar, _appendMandatoryEvents)(
    allEvents,
    prevEvents
  );
};

// Private. Takes the events from the server and transforms them into a format
// that our calendar supports.
const _formatEventsForCalendar = events => {
  return events.map(event => {
    return {
      eventId: event.eventId,
      title: `${event.employee.forename} ${event.employee.surname}`,
      allDay: !event.halfDay,
      start: event.start,
      end: event.end,
      halfDay: event.halfDay,
      employee: event.employee,
      eventStatus: event.eventStatus,
      eventType: event.eventType,
    };
  });
};

// Private. Appends the mandatory holidays as specified in ./mandatoryEvents.js
const _appendMandatoryEvents = events => {
  return events.concat(mandatoryEvents);
};

// Takes an event and turns the duration of the event
export const getEventDuration = event => {
  const { start, end, isHalfday, eventType } = event;
  let duration = getDurationBetweenDates(start, end);
  const eventTypeId = eventType ? parseInt(eventType.eventTypeId) : 1;
  if (isHalfday) {
    if (duration != 0) {
      return 0.5;
    }
  } else if (eventTypeId !== 1) {
    return 0;
  } else {
    return duration;
  }
};
