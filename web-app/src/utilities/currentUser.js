//This is ugly and temporary, needs major reworking because it's so brittle
import decode from 'jwt-decode';

const _getNamesFromEmail = () => {
  if (localStorage.getItem('user_email')) {
    let email = localStorage.getItem('user_email');
    const splitOne = email.split('.');
    const splitTwo = splitOne[1].split('@');
    return { firstName: splitOne[0], lastName: splitTwo[0] };
  }
  return {};
};

const UserInfo = {
  token: localStorage.getItem('id_token'),
  email: localStorage.getItem('user_email'),
  ..._getNamesFromEmail(),
};

export const userLogout = () => {
  localStorage.removeItem('id_token');
  localStorage.removeItem('user_email');
};

export const getProfile = () => {
  return decode(UserInfo.token);
};

export const isTokenExpired = () => {
  try {
    const decoded = decode(UserInfo.token);
    return decoded.exp < Date.now() / 1000;
  } catch (err) {
    return false;
  }
};

export const isLoggedIn = () => {
  return !!UserInfo.token && !isTokenExpired();
};

export default UserInfo;
