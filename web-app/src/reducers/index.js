import { combineReducers } from 'redux';
import userReducer, * as FromUser from './user';
import dashboardReducer from './dashboard';

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
