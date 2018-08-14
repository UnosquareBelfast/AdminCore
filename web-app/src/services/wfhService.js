import axios from '../utilities/AxiosInstance';

export const createWFH = holidayId => {
  return axios.post(`/workingFromHome/${holidayId}`);
};

export const getAllWFH = dates => {
  return axios.get('/workingFromHome/', dates);
};

export const getWFH = employeeId => {
  return axios.get(`/workingFromHome/findByEmployeeId/${employeeId}`);
};

export const getWFHById = wfhId => {
  return axios.get(`/workingFromHome/${wfhId}`);
};
