import axios from '../utilities/AxiosInstance';

export const requestWFH = dates => {
  return axios.post('/workingFromHome/', dates);
};

export const getAllWFH = () => {
  return axios.get('/workingFromHome/');
};

export const getWFH = employeeId => {
  return axios.get(`/workingFromHome/findByEmployeeId/${employeeId}`);
};

export const getWFHById = wfhId => {
  return axios.get(`/workingFromHome/${wfhId}`);
};
