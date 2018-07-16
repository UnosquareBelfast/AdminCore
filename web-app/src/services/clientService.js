import axios from '../utilities/AxiosInstance';

export const createClient = data => {
  return axios.post('/clients/', data);
};

export const getAllClients = () => {
  return axios.get('/clients/');
};

export const updateClient = client => {
  return axios.put('/clients/', client);
};

export const findClientByClientName = clientName => {
  return axios.get(`/clients/findByClientNameContaining/${clientName}`);
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
