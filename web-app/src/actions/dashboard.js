import * as actionTypes from '../actionTypes';
import { getUsersEvents } from '../services/dashboardService';
import { setLoading } from './loading';

import {
  getEventDuration,
  transformEvents,
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
  dispatch(setLoading(true));
  getUsersEvents(date)
    .then(({ data }) => {
      dispatch(setLoading(false));
      const formattedEvents = transformEvents(data);
      dispatch(setCalendarEvents(formattedEvents));
    })
    .catch(error => {
      dispatch(setLoading(false));
      dispatch(setError(error));
    });
};
