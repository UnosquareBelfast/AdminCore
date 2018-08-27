import { SET_LOADING } from '../actionTypes';

export function setLoading(isLoading) {
  return {
    type: SET_LOADING,
    payload: isLoading,
  };
}
