import moment from 'moment';
import { loadingSince } from '../reducers';
import { SET_LOADING } from '../actionTypes';
import store from '../store';

export function setLoading(isLoading) {
  return {
    type: SET_LOADING,
    payload: { isLoading, startedAt: isLoading ? new moment() : null },
  };
}

// Set loading async is responsible for making sure if the loading indicator
// does show, that it will show up for at least 1s.
export const setLoadingAsync = isLoading => dispatch => {
  let minimumLoadingTime = 1000;
  const loadingSinceMoment = loadingSince(store.getState());

  if (!isLoading && loadingSinceMoment) {
    const now = new moment();
    const millisecondsLoading = now.diff(loadingSinceMoment, 'milliseconds');
    if (millisecondsLoading >= minimumLoadingTime) {
      dispatch(setLoading(isLoading));
    } else {
      setTimeout(() => {
        dispatch(setLoading(isLoading));
      }, minimumLoadingTime - millisecondsLoading);
    }
  } else {
    dispatch(setLoading(isLoading));
  }
};
