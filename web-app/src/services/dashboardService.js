import axios from '../utilities/AxiosInstance';

export const getUsersEvents = date => {
  return axios.get(`/dashboard/getEmployeeEvents?date=${date}`);
};

export const getTeamsEvents = date => {
  return axios.get(`/dashboard/getTeamEvents?date=${date}`);
};

export const getTeamOverview = date => {
  return axios.get(`/dashboard/getDashboardSnapshot?date=${date}`);
};


