import axios from '../utilities/AxiosInstance';

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

export const approveHoliday = eventId => {
  return axios.put('/holidays/approveHoliday', { eventId });
};

export const rejectHoliday = holidayId => {
  return axios.put('/holidays/cancelHoliday', { holidayId });
};

export const rejectHolidayWithMessage = ( eventId, message ) => {
  return axios.put('/holidays/rejectHoliday', { eventId, message });
};

export const rejectionResponse = ( eventId, message ) => {
  return axios.put('/holidays/rejectHoliday', { eventId, message });
};

export const cancelHoliday = eventId => {
  return axios.put('/holidays/cancelHoliday', { eventId });
};
