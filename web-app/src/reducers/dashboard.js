import * as actionTypes from '../actionTypes';
import moment from 'moment';

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
      description: 'Awaiting Approval',
    },
    employee: null,
  },
  bookingDuration: 1,
  bookingModalOpen: false,
  isEventBeingUpdated: false,
  error: null,
};

const selectBooking = (state, action) => {
  return { ...state, booking: action.payload };
};

const updateEventDuration = (state, action) => {
  return { ...state, bookingDuration: action.payload };
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
    case actionTypes.SELECT_EVENT:
      return selectBooking(state, action);
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
