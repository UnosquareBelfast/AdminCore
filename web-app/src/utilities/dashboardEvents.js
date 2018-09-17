import moment from 'moment';
import { getDurationBetweenDates } from './dates';
import eventTypes from './eventTypes';
import mandatoryEvents from './mandatoryEvents';
import { flow } from 'lodash/fp';
import { uniqBy } from 'lodash';

import store from '../store';
import { getAllEvents } from '../reducers';

export const transformEvents = allEvents => {
  return new Promise(resolve => {
    const transformedEvents = flow(
      _formatEventsForCalendar,
      _appendExistingEvents,
      _appendMandatoryEvents
    )(allEvents);
    resolve(transformedEvents);
  });
};

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
      messages: event.messages,
    };
  });
};

const _appendExistingEvents = events => {
  const prevEvents = getAllEvents(store.getState());
  let combinedEvents = [...prevEvents, ...events];
  // Remove mandatory
  combinedEvents = combinedEvents.filter(event => event.eventId !== -1);
  combinedEvents = uniqBy(combinedEvents, event => event.eventId);
  return combinedEvents;
};

const _appendMandatoryEvents = events => {
  return events.concat(mandatoryEvents);
};

export const requiresNewRequest = date => {
  let requireNewRequest = true;
  const month = new moment(date, 'YYYY-MM-DD').month();
  let events = getAllEvents(store.getState());

  // Remove mandatory
  events = events.filter(event => event.eventId !== -1);

  let eventDates = events.reduce((acc, event) => {
    acc.push(event.start);
    return acc;
  }, []);

  eventDates.forEach(date => {
    if (date.month() === month) {
      requireNewRequest = false;
    }
  });
  return requireNewRequest;
};

/*
 Utility
*/

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

/*
  Booking Form Validation
*/

export const startDateValidation = formData => {
  if (formData.isHalfday) {
    formData.end = formData.start;
  } else {
    if (formData.start.isAfter(formData.end)) {
      formData.end = formData.start;
    }
  }
  return formData;
};

export const endDateValidation = formData => {
  if (formData.isHalfday) {
    formData.start = formData.end;
  } else {
    if (formData.end.isBefore(formData.start)) {
      formData.start = formData.end;
    }
  }
  return formData;
};

export const halfDayValidation = formData => {
  formData.end = formData.start;
  formData.eventTypeId = eventTypes.ANNUAL_LEAVE;
  return formData;
};

/* 
  Events Validation
*/

export const validationMessage = {
  PAST_DATES_SELECTED: 'Unable to select past dates',
  WEEKEND_DATES_SELECTED: 'Unable to select weekend dates',
  DATES_ALREADY_REQUESTED:
    'You cannot request dates that have already been set',
  DATES_APPROVED: 'Dates approved',
};

export const checkIfPastDatesSelected = start => {
  const today = new moment();
  return moment(start).isBefore(today);
};

export const checkIfDatesFallOnWeekend = (start, end) => {
  if (moment(start).isoWeekday() > 5 && moment(end).isoWeekday() > 5) {
    return true;
  } else {
    return false;
  }
};

export const checkIfSelectedDatesOverlapExisting = (
  events,
  employeeId,
  start,
  end,
  selectedEventId = null
) => {
  const overlappingEvents = events.filter(event => {
    const { employee, eventId } = event;
    if (
      employee &&
      employee.employeeId === employeeId &&
      selectedEventId !== eventId
    ) {
      const selectedDateRange = moment.range(
        moment(start),
        moment(end).endOf('day')
      );
      const existingEvent = moment.range(
        moment(event.start),
        moment(event.end)
      );
      if (selectedDateRange.overlaps(existingEvent)) {
        return true;
      }
    }
  });
  return overlappingEvents.length > 0;
};
