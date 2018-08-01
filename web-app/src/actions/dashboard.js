import * as actionTypes from '../actionTypes';
import moment from 'moment';
import { getAllHolidays, getHolidays } from '../services/holidayService';
import { getMandatoryCalendarEvents } from '../utilities/mandatoryEventConfig';
import { getDurationBetweenDates } from '../utilities/dates';

export const fetchEventsSuccess = events => {
  return {
    type: actionTypes.FETCH_EVENTS_SUCCESS,
    events: events,
    loading: true,
    error: null,
  };
};

export const fetchEventsFail = error => {
  return {
    type: actionTypes.FETCH_EVENTS_FAIL,
    error: error,
    loading: false,
  };
};

export const fetchEventsStart = () => {
  return {
    type: actionTypes.FETCH_EVENTS_START,
    loading: false,
  };
};

export const filterEventsSuccess = events => {
  return {
    type: actionTypes.FILTER_EVENTS_SUCCESS,
    events: events,
  };
};

export const filterEventsFail = error => {
  return {
    type: actionTypes.FILTER_EVENTS_FAIL,
    error: error,
  };
};

export const filterEventsStart = () => {
  return {
    type: actionTypes.FILTER_EVENTS_START,
  };
};

const getMandatoryEvents = () => {
  const mandatoryEvents = getMandatoryCalendarEvents();
  const events = mandatoryEvents.map(function(event) {
    return {
      holidayId: -1,
      title: event.title,
      duration: 1,
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

const setEventsState = data => {
  const mandatoryEvents = getMandatoryEvents();
  const usersEvents = data.map(event => {
    return {
      holidayId: event.holidayId,
      title: `${event.employee.forename} ${event.employee.surname}`,
      duration: getDurationBetweenDates(event.start, event.end),
      allDay: !event.halfDay,
      start: event.start,
      end: event.end,
      halfDay: event.halfDay,
      employee: event.employee,
      eventStatus: event.eventStatus,
      eventType: event.eventType,
    };
  });
  usersEvents.concat(mandatoryEvents);
  return [...mandatoryEvents, ...usersEvents];
};

export const fetchEvents = () => {
  return dispatch => {
    dispatch(fetchEventsStart());
    getAllHolidays()
      .then(response => {
        const allEvents = setEventsState(response.data);
        dispatch(fetchEventsSuccess(allEvents));
      })
      .catch(error => {
        dispatch(fetchEventsFail(error));
      });
  };
};

export const filterEventsByEmployeeId = employeeId => {
  return dispatch => {
    dispatch(filterEventsStart());
    getHolidays(employeeId)
      .then(response => {
        const allEvents = setEventsState(response.data);
        dispatch(filterEventsSuccess(allEvents));
      })
      .catch(error => {
        dispatch(filterEventsFail(error));
      });
  };
};
