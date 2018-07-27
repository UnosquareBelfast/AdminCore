import axios from '../utilities/AxiosInstance';

export const cancelHoliday = holidayId => {
  return axios.post(`/holidays/cancel/${holidayId}`);
};

export const getAllHolidays = () => {
  return axios.get('/holidays/');
};

export const getHolidays = employeeId => {
  return axios.get(`/holidays/findByEmployeeId/${employeeId}`);
};

export const getHolidaysByStatus = statusId => {
  return axios.get(`/holidays/findByHolidayStatus/${statusId}`);
};

export const requestHoliday = holidays => {
  return axios.post('/holidays/', holidays);
};

export const updateHoliday = holiday => {
  return axios.put('/holidays/', holiday);
};
