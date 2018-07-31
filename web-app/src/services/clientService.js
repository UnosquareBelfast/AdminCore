import axios from '../utilities/AxiosInstance';

export const createClient = client => {
  return axios.post('/clients/', client);
};

export const updateClient = client => {
  return axios.put('/clients/', client);
};

export const getAllClients = () => {
  return axios.get('/clients/');
};

export const getClientById = clientId => {
  return axios.get(`/clients/${clientId}`);
};
