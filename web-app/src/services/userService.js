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

export const getAllUsers = () => {
  return axios.get('/employees/');
};

export const getUserProfile = id => {
  return axios.get(`/employees/${id}`);
};

export const getUserByName = (forename, surname) => {
  return axios.get(
    `/employees/findByForenameAndSurname/${forename}/${surname}`
  );
};

export const createUser = data => {
  return axios.post('authentication/register/', data);
};

export const updateUser = data => {
  return axios.put('employees/', data);
};
