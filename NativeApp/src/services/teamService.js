import axios from '../utilities/AxiosInstance';

const getTeamSnapshot = () => axios.get('/dashboard/getEmployeeTeamSnapshot');

export default getTeamSnapshot;
