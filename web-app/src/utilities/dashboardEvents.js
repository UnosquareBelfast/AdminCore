import moment from 'moment';
import { getDurationBetweenDates } from './dates';

export const getMandatoryEvents = () => {
  const currYear = new Date().getFullYear();
  const events = [
    {
      title: 'Christmas Day',
      mandatoryDate: `${currYear}-12-25`,
    },
    {
      title: 'New Years Day',
      mandatoryDate: `${currYear}-12-31`,
    },
    {
      title: 'Memorial Day',
      mandatoryDate: `${currYear}-05-28`,
    },
  ];

  return events;
};

const formattedMandatoryEvents = () => {
  const mandatoryEvents = getMandatoryEvents();

  const events = mandatoryEvents.map(function(event) {
    return {
      eventId: -1,
      title: event.title,
      allDay: true,
      start: new moment([event.mandatoryDate], 'YYYY-MM-DD'),
      end: new moment([event.mandatoryDate], 'YYYY-MM-DD'),
      halfDay: false,
      employee: null,
      eventStatus: { eventStatusId: 4, description: 'Mandatory' },
      eventType: { eventTypeId: 1, description: 'Annual leave' },
    };
  });
  return events;
};

export const formatEventsForCalendar = data => {
  const mandatoryEvents = formattedMandatoryEvents();
  const events = data.map(event => {
    return {
      eventId: event.eventId,
      title: `${event.employee.forename} ${event.employee.surname}`,
      allDay: !event.halfDay,
      start: new moment([event.startDate], 'YYYY-MM-DD'),
      end: new moment([event.endDate], 'YYYY-MM-DD'),
      halfDay: event.halfDay,
      employee: event.employee,
      eventStatus: event.eventStatus,
      eventType: event.eventType,
    };
  });
  events.concat(mandatoryEvents);
  return [...mandatoryEvents, ...events];
};

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
