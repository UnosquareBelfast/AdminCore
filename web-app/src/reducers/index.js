import { combineReducers } from 'redux';
import userReducer, * as FromUser from './user';
import dashboardReducer, * as FromDashboard from './dashboard';

const USER = 'USER';
const DASHBOARD = 'DASHBOARD';

const rootReducer = combineReducers({
  [USER]: userReducer,
  [DASHBOARD]: dashboardReducer,
});
export default rootReducer;

// Public Selectors//
/////////////////////

// User
export const getUser = store => FromUser.getUser(store[USER]);

//Dashboard
export const getTakenHolidays = store =>
  FromDashboard.getTakenHolidays(store[DASHBOARD]);

export const eventBeingUpdated = store =>
  FromDashboard.eventBeingUpdated(store[DASHBOARD]);

export const getBooking = store => FromDashboard.getBooking(store[DASHBOARD]);

export const bookingModalOpen = store =>
  FromDashboard.bookingModalOpen(store[DASHBOARD]);

export const getBookingDuration = store =>
  FromDashboard.getBookingDuration(store[DASHBOARD]);
