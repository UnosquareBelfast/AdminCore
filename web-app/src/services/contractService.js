import axios from '../utilities/AxiosInstance';

export const getContractsByEmployeeId = employeeId => {
  return axios.get(`/contracts/findByEmployeeId/${employeeId}`);
};
