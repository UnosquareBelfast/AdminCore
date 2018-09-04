import moment from 'moment';
import { getDurationBetweenDates } from './dates';
import eventTypes from './eventTypes';
import mandatoryEvents from './mandatoryEvents';
import { flow } from 'lodash/fp';
import { uniqBy } from 'lodash';

import store from '../store';
import { getAllEvents } from '../reducers';

// The pipeline that our events go through to make them calendar ready.
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

// Private. Appends existing event data from previous requests to current.
// and removes duplicates.
const _appendExistingEvents = events => {
  const prevEvents = getAllEvents(store.getState());
  // Append the previously displayed months' events to the new events.
  let combinedEvents = [...prevEvents, ...events];
  // Remove any mandatory holidays as the next step would mess them up.
  combinedEvents = combinedEvents.filter(event => event.eventId !== -1);
  // Remove any duplicate holidays in the array.
  combinedEvents = uniqBy(combinedEvents, event => event.eventId);
  return combinedEvents;
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

// Detect if we want to fire off a new request for event data
export const requiresNewRequest = date => {
  let requireNewRequest = true;
  const month = new moment(date, 'YYYY-MM-DD').month();
  let events = getAllEvents(store.getState());

  // Remove mandatory, we don't want to check these.
  events = events.filter(event => event.eventId !== -1);

  // Reduce events to just start dates
  let eventDates = events.reduce((acc, event) => {
    acc.push(event.start);
    return acc;
  }, []);

  // Check if any of the dates' month match the month the user is viewing. If
  // there's a match, we don't want to update.
  eventDates.forEach(date => {
    if (date.month() === month) {
      requireNewRequest = false;
    }
  });

  return requireNewRequest;
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
