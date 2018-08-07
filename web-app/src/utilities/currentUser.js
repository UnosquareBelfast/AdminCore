import decode from 'jwt-decode';
import store from '../store';
import { resetUser } from '../actions/user';

export const getProfile = () => {
  return decode(localStorage.getItem('id_token'));
};

export const isLoggedIn = () => {
  return !!localStorage.getItem('id_token') && !isTokenExpired();
};

export const isTokenExpired = () => {
  try {
    const decoded = decode(localStorage.getItem('id_token'));
    return decoded.exp < Date.now() / 1000;
  } catch (err) {
    return false;
  }
};

export const userLogout = () => {
  store.dispatch(resetUser());
  localStorage.removeItem('id_token');
  localStorage.removeItem('user_id');
};
