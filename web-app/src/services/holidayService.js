import axios from '../utilities/AxiosInstance';

export const getHolidays = employeeId => {
  return axios.get(`/holidays/findByEmployeeId/${employeeId}`);
};

export const requestHoliday = holiday => {
  return axios.post('/holidays/', holiday);
};

export const requestHolidays = holidays => {
  return axios.post('/holidays/createMultiple/', holidays);
};

export const updateHoliday = holiday => {
  return axios.put('/holidays/', holiday);
};

export const updateHolidays = holidays => {
  return axios.put('/holidays/updateMultiple/', holidays);
};
