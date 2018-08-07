import { UPDATE_USER, RESET_USER } from '../actionTypes';

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    payload: user,
  };
}

export function resetUser() {
  return {
    type: RESET_USER,
  };
}
