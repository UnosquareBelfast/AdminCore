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
  const { firstName, lastName } = UserInfo;

  //eslint-disable-next-line
  console.log(
    `Getting ${firstName} ${lastName}'s profile`,
    localStorage.getItem('id_token'),
  );

  return axios.get(
    `/employees/findByForenameAndSurname/${firstName}/${lastName}/`,
  );
};
