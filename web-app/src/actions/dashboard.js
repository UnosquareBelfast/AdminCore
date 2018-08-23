import * as actionTypes from '../actionTypes';
import { getHolidays } from '../services/holidayService';
import { getUsersEvents } from '../services/dashboardService';

import {
  formatEventsForCalendar,
  getEventDuration,
} from '../utilities/dashboardEvents';

/*
  Action Creators
*/

export const selectBooking = booking => {
  return {
    type: actionTypes.SELECT_EVENT,
    payload: booking,
  };
};

export const updateEventDuration = event => {
  return {
    type: actionTypes.UPDATE_EVENT_DURATION,
    payload: getEventDuration(event),
  };
};

export const toggleBookingModal = open => {
  return {
    type: actionTypes.TOGGLE_BOOKING_MODAL,
    payload: open,
  };
};

export const setEventBeingUpdated = isBeingUpdated => {
  return {
    type: actionTypes.SET_IS_BEING_UPDATED,
    payload: isBeingUpdated,
  };
};

export const setCalendarEvents = events => {
  return {
    type: actionTypes.SET_CALENDAR_EVENTS,
    payload: events,
  };
};

export const setError = error => {
  return {
    type: actionTypes.SET_ERROR,
    payload: error,
  };
};

// Thunks

export const fetchEvents = date => dispatch => {
  getUsersEvents(date)
    .then(({ data }) => {
      const formattedEvents = formatEventsForCalendar(data);
      dispatch(setCalendarEvents(formattedEvents));
    })
    .catch(error => {
      dispatch(setError(error));
    });
};
