import axios from '../utilities/AxiosInstance';
import UserInfo from '../utilities/currentUser';

export const userLogin = (email, password) => {
  return axios
    .post('authentication/login/', { email, password })
    .then(response => {
      localStorage.setItem('id_token', response.data.accessToken);
      localStorage.setItem('user_email', email);
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

export const getUserProfile = () => {
  const firstName = UserInfo.firstName();
  const lastName = UserInfo.lastName();

  return axios.get(
    `/employees/findByForenameAndSurname/${firstName}/${lastName}/`,
  );
};

export const createUser = data => {
  return axios.post('authentication/register/', data);
};
