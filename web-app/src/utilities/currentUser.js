//This is ugly and temporary, needs major reworking because it's so brittle
import decode from 'jwt-decode';

const getNamesFromEmail = () => {
  if (localStorage.getItem('user_email')) {
    let email = localStorage.getItem('user_email');
    const splitOne = email.split('.');
    const splitTwo = splitOne[1].split('@');
    return { firstName: splitOne[0], lastName: splitTwo[0] };
  }
  return {};
};

const UserInfo = {
  token: () => localStorage.getItem('id_token'),
  userId: () => decode(localStorage.getItem('id_token')).sub,
  email: () => localStorage.getItem('user_email'),
  firstName: () => getNamesFromEmail().firstName,
  lastName: () => getNamesFromEmail().lastName,
};

export const getProfile = () => {
  return decode(UserInfo.token());
};

export const isLoggedIn = () => {
  return !!UserInfo.token() && !isTokenExpired();
};

export const isTokenExpired = () => {
  try {
    const decoded = decode(UserInfo.token());
    return decoded.exp < Date.now() / 1000;
  } catch (err) {
    return false;
  }
};

export const setUserEmail = email => {
  localStorage.setItem('user_email', email);
};

export const setToken = idToken => {
  localStorage.setItem('id_token', idToken);
};

export const userLogout = () => {
  localStorage.removeItem('id_token');
  localStorage.removeItem('user_email');
};

export default UserInfo;
