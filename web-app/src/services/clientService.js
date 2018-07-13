import axios from '../utilities/AxiosInstance';

export const createClient = () => {
  return axios.post('/clients/');
};

export const getAllClients = () => {
  return axios.get('/clients/');
};

export const updateClient = client => {
  return axios.put('/clients/', client);
};

export const findClientByClientName = clientName => {
  return axios.get(`GET /clients/findByClientNameContaining/${clientName}`);
};

export const findClientsByStatus = clientStatusId => {
  return axios.get(`/clients/findByClientStatus/${clientStatusId}`);
};

export const findClientsByContactName = contactName => {
  return axios.get(`/clients/findByContactNameContaining/${contactName}`);
};

export const findClientsByTeamName = teamName => {
  return axios.get(`/clients/findByTeamNameContaining/${teamName}`);
};
