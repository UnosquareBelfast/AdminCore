import * as actionTypes from '../actionTypes';
import { getAllHolidays, getHolidays } from '../services/holidayService';
import { formatEventsForCalendar } from '../utilities/dashboardEvents';
import { getDurationBetweenDates } from '../utilities/dates';

/*
  Action Creators
*/

export const updateBookingEvent = booking => {
  return {
    type: actionTypes.UPDATE_EVENT_BOOKING,
    booking: booking,
  };
};

export const updateEventDuration = duration => {
  return {
    type: actionTypes.UPDATE_EVENT_DURATION,
    duration: duration,
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

/*
  Actions
*/

export const updateBooking = booking => {
  return dispatch => {
    if (booking.holidayId === -1) {
      booking = {
        ...booking,
        title: null,
        isHalfday: false,
        eventType: {
          eventTypeId: 1,
          description: 'Annual leave',
        },
        eventStatus: {
          eventStatusId: 1,
          description: 'Awaiting Approval',
        },
        employee: null,
      };
    }
    dispatch(updateBookingEvent(booking));
  };
};

export const updateBookingDuration = ({ start, end, isHalfday, eventType }) => {
  return dispatch => {
    let duration = getDurationBetweenDates(start, end);
    const eventTypeId = eventType ? parseInt(eventType.eventTypeId) : 1;
    if (isHalfday) {
      if (duration != 0) {
        duration = 0.5;
      }
    } else if (eventTypeId !== 1) {
      duration = 0;
    } else {
      duration = getDurationBetweenDates(start, end);
    }
    dispatch(updateEventDuration(duration));
  };
};

// Thunks

export const fetchEvents = () => dispatch => {
  getAllHolidays()
    .then(({ data }) => {
      const formattedEvents = formatEventsForCalendar(data);
      dispatch(setCalendarEvents(formattedEvents));
    })
    .catch(error => {
      dispatch(setError(error));
    });
};

export const fetchEventsByUserId = userId => dispatch => {
  getHolidays(userId)
    .then(({ data }) => {
      const formattedEvents = formatEventsForCalendar(data);
      dispatch(setCalendarEvents(formattedEvents));
    })
    .catch(error => {
      dispatch(setError(error));
    });
};
