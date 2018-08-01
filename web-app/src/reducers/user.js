import { UPDATE_USER, RESET_USER } from '../actionTypes';

export const initialState = {
  forename: null,
  surname: null,
  email: null,
  countryId: null,
  employeeId: null,
  employeeRoleId: null,
  employeeStatusId: null,
  startDate: null,
  totalHolidays: null,
};

// Reducer
export default function userReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

// Handlers
const ACTION_HANDLERS = {
  [UPDATE_USER]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
  [RESET_USER]: () => ({
    ...initialState,
  }),
};

// Private Selectors
export const getUser = store => store;
