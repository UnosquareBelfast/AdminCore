import axios from '../utilities/AxiosInstance';

export const getTeamsFromClient = clientId => {
  return axios.get(`/teams/${clientId}`);
};

export const createTeam = data => {
  return axios.post('/teams/', data);
};
