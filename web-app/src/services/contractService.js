import axios from '../utilities/AxiosInstance';

export const createContract = contract => {
  return axios.post('/contracts/', contract);
};
