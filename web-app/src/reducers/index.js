import { combineReducers } from 'redux';
import userReducer, * as FromUser from './user';

const USER = 'USER';

const rootReducer = combineReducers({ [USER]: userReducer });
export default rootReducer;

// Public Selectors//
/////////////////////

// User
export const getUser = store => FromUser.getUser(store[USER]);
