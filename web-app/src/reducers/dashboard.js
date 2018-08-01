import * as actionTypes from '../actionTypes';

const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

const initialState = {
  loading: false,
  takenHolidays: [],
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

const filterEventsFailed = state => {
  return updateObject(state, { loading: false });
};

const filterEventsStart = state => {
  return updateObject(state, { loading: true });
};

const filterEventsSuccess = (state, action) => {
  return updateObject(state, {
    takenHolidays: action.events,
    loading: false,
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
    case actionTypes.FILTER_EVENTS_START:
      return filterEventsStart(state, action);
    case actionTypes.FILTER_EVENTS_SUCCESS:
      return filterEventsSuccess(state, action);
    case actionTypes.FILTER_EVENTS_FAIL:
      return filterEventsFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
