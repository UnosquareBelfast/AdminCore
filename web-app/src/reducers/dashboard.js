import * as actionTypes from '../actionTypes';
import moment from 'moment';

const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

const initialState = {
  loading: false,
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

const fetchEventsFailed = state => {
  return updateObject(state, { loading: false });
};

const fetchEventsStart = state => {
  return updateObject(state, { loading: true });
};

const fetchEventsSuccess = (state, action) => {
  return updateObject(state, {
    takenHolidays: action.events,
    loading: false,
  });
};

const filterEventsSuccess = (state, action) => {
  return updateObject(state, {
    takenHolidays: action.events,
  });
};

const updateEventBooking = (state, action) => {
  return updateObject(state, {
    booking: action.booking,
    isEventBeingUpdated: action.isEventBeingUpdated,
  });
};

const updateEventDuration = (state, action) => {
  return updateObject(state, {
    bookingDuration: action.duration,
  });
};

const toggleBookingModal = (state, action) => {
  return updateObject(state, {
    bookingModalOpen: action.bookingModalOpen,
  });
};

const toggleEventUpdatedState = (state, action) => {
  return updateObject(state, {
    isEventBeingUpdated: action.isEventBeingUpdated,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_EVENTS_START:
      return fetchEventsStart(state, action);
    case actionTypes.FETCH_EVENTS_SUCCESS:
      return fetchEventsSuccess(state, action);
    case actionTypes.FETCH_EVENTS_FAIL:
      return fetchEventsFailed(state, action);
    case actionTypes.FILTER_EVENTS_SUCCESS:
      return filterEventsSuccess(state, action);
    case actionTypes.UPDATE_EVENT_BOOKING:
      return updateEventBooking(state, action);
    case actionTypes.UPDATE_EVENT_DURATION:
      return updateEventDuration(state, action);
    case actionTypes.SHOW_BOOKING_MODAL:
      return toggleBookingModal(state, action);
    case actionTypes.HIDE_BOOKING_MODAL:
      return toggleBookingModal(state, action);
    case actionTypes.EVENT_BEING_UPDATED:
      return toggleEventUpdatedState(state, action);
    case actionTypes.EVENT_NOT_BEING_UPDATED:
      return toggleEventUpdatedState(state, action);
    default:
      return state;
  }
};

export default reducer;
