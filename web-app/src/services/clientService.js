import axios from '../utilities/AxiosInstance';

export const createClient = client => {
  return axios.post('/clients/', client);
};

export const getAllClients = () => {
  return axios.get('/clients/');
};
