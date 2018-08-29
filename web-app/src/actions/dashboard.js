import * as actionTypes from '../actionTypes';
import { getUsersEvents, getTeamsEvents } from '../services/dashboardService';
import eventsView from '../utilities/eventsView';
import { setLoading } from './loading';

import {
  getEventDuration,
  requiresNewRequest,
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

export const setEventView = eventView => {
  return {
    type: actionTypes.SET_EVENT_VIEW,
    payload: eventView,
  };
};

// Thunks

export const fetchEvents = (date, eventView, force = false) => dispatch => {
  // Check if we need to make a request (is there existing state?)
  if (requiresNewRequest(date) || force) {
    // Start loading
    dispatch(setLoading(true));
    // Fetch personal events only.
    if (eventView === eventsView.PERSONAL_EVENTS) {
      getUsersEvents(date)
        .then(({ data }) => {
          dispatch(setLoading(false));
          transformEvents(data).then(transformedEvents => {
            dispatch(setCalendarEvents(transformedEvents));
          });
        })
        .catch(error => {
          dispatch(setLoading(false));
          dispatch(setError(error));
        });
      // Fetch team's events as well as your own.
    } else if (eventView === eventsView.TEAM_EVENTS) {
      getTeamsEvents(date)
        .then(({ data }) => {
          dispatch(setLoading(false));
          transformEvents(data).then(transformedEvents => {
            dispatch(setCalendarEvents(transformedEvents));
          });
        })
        .catch(error => {
          dispatch(setLoading(false));
          dispatch(setError(error));
        });
    }
  }
};
