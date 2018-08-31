import {
  SET_EVENT_VIEW,
  SET_CALENDAR_EVENTS,
  SET_ERROR,
  SELECT_EVENT,
  UPDATE_EVENT_DURATION,
  TOGGLE_BOOKING_MODAL,
  SET_IS_BEING_UPDATED,
} from '../actionTypes';
import eventsView from '../utilities/eventsView';
import moment from 'moment';

const initialState = {
  eventView: eventsView.PERSONAL_EVENTS,
  allEvents: [],
  booking: {
    eventId: -1,
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

// Reducer
export default function dashboardReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

// Handlers
const ACTION_HANDLERS = {
  [SET_EVENT_VIEW]: (state, action) => ({
    ...state,
    eventView: action.payload,
  }),
  [SET_CALENDAR_EVENTS]: (state, action) => ({
    ...state,
    allEvents: action.payload,
  }),
  [SET_ERROR]: (state, action) => ({
    ...state,
    error: action.payload,
  }),
  [SELECT_EVENT]: (state, action) => ({
    ...state,
    booking: action.payload,
  }),
  [UPDATE_EVENT_DURATION]: (state, action) => ({
    ...state,
    bookingDuration: action.payload,
  }),
  [TOGGLE_BOOKING_MODAL]: (state, action) => ({
    ...state,
    bookingModalOpen: action.payload,
  }),
  [SET_IS_BEING_UPDATED]: (state, action) => ({
    ...state,
    isEventBeingUpdated: action.payload,
  }),
};

// Private selectors
export const getAllEvents = store => store.allEvents;
export const getEventView = store => store.eventView;
export const eventBeingUpdated = store => store.isEventBeingUpdated;
export const getBooking = store => store.booking;
export const bookingModalOpen = store => store.bookingModalOpen;
export const getBookingDuration = store => store.bookingDuration;
