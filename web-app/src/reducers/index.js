import { combineReducers } from 'redux';
import userReducer, * as FromUser from './user';
import dashboardReducer, * as FromDashboard from './dashboard';
import loadingReducer, * as FromLoading from './loading';

const USER = 'USER';
const DASHBOARD = 'DASHBOARD';
const LOADING = 'LOADING';

const rootReducer = combineReducers({
  [USER]: userReducer,
  [DASHBOARD]: dashboardReducer,
  [LOADING]: loadingReducer,
});
export default rootReducer;

// Public Selectors//
/////////////////////

// User
export const getUser = store => FromUser.getUser(store[USER]);

//Dashboard
export const getEventView = store =>
  FromDashboard.getEventView(store[DASHBOARD]);

export const getAllEvents = store =>
  FromDashboard.getAllEvents(store[DASHBOARD]);

export const eventBeingUpdated = store =>
  FromDashboard.eventBeingUpdated(store[DASHBOARD]);

export const getBooking = store => FromDashboard.getBooking(store[DASHBOARD]);

export const bookingModalOpen = store =>
  FromDashboard.bookingModalOpen(store[DASHBOARD]);

export const getBookingDuration = store =>
  FromDashboard.getBookingDuration(store[DASHBOARD]);

//Loading
export const isLoading = store => FromLoading.isLoading(store[LOADING]);
