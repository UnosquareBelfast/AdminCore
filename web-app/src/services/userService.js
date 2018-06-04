import decode from 'jwt-decode';
import axios from '../utilities/AxiosInstance';

export const userLogin = (email, password) => {
  return axios
    .post('authentication/login', { email, password })
    .then(response => {
      const token = response.data.accessToken;
      let userData = decode(token);
      localStorage.setItem('id_token', token);
      localStorage.setItem('user_id', userData.sub);
    });
};

export const getUserProfile = id => {
  return axios.get(`/employees/${id}`);
};

export const createUser = data => {
  return axios.post('authentication/register/', data);
};
