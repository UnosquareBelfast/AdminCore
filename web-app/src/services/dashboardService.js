import axios from '../utilities/AxiosInstance';

export const getUsersEvents = date => {
  return axios.get(`/dashboard/getEmployeeEvents?date=${date}`);
};
