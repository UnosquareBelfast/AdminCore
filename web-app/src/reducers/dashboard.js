import * as actionTypes from '../actionTypes';
import moment from 'moment';

const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

const initialState = {
  takenHolidays: [],
  booking: {
    holidayId: -1,
    title: null,
    start: new moment(),
    end: new moment(),
    isHalfday: false,
    eventType: {
      eventTypeId: 1,
      description: 'Annual leave',
    },
    eventStatus: {
      eventStatusId: 1,
      dexcription: 'Awaiting Approval',
    },
    employee: null,
  },
  bookingDuration: 1,
  bookingModalOpen: false,
  isEventBeingUpdated: false,
  error: null,
};

const updateEventBooking = (state, action) => {
  return updateObject(state, {
    booking: action.booking,
  });
};

const updateEventDuration = (state, action) => {
  return updateObject(state, {
    bookingDuration: action.duration,
  });
};

const toggleBookingModal = (state, action) => {
  return { ...state, bookingModalOpen: action.payload };
};

const setCalendarEvents = (state, action) => {
  return { ...state, takenHolidays: action.payload };
};

const setError = (state, action) => {
  return { ...state, error: action.payload };
};

const setIsBeingUpdated = (state, action) => {
  return { ...state, isEventBeingUpdated: action.payload };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CALENDAR_EVENTS:
      return setCalendarEvents(state, action);
    case actionTypes.SET_ERROR:
      return setError(state, action);
    case actionTypes.UPDATE_EVENT_BOOKING:
      return updateEventBooking(state, action);
    case actionTypes.UPDATE_EVENT_DURATION:
      return updateEventDuration(state, action);
    case actionTypes.TOGGLE_BOOKING_MODAL:
      return toggleBookingModal(state, action);
    case actionTypes.SET_IS_BEING_UPDATED:
      return setIsBeingUpdated(state, action);
    default:
      return state;
  }
};

export default reducer;
