import axios from '../utilities/AxiosInstance';

export const getHolidays = employeeId => {
  return axios.get(`/holidays/findByEmployeeId/${employeeId}`);
};
