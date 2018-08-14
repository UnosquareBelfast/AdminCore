import moment from 'moment';

const startDate = {
  id: 'startDate',
  Header: 'Start Date',
  accessor: contract => {
    const startDate = new moment(contract.startDate, 'YYYY-MM-DD');
    return startDate.format('Do MMMM YYYY');
  },
};

const endDate = {
  id: 'endDate',
  Header: 'End Date',
  accessor: contract => {
    const endDate = new moment(contract.endDate, 'YYYY-MM-DD');
    return endDate.format('Do MMMM YYYY');
  },
};

export default {
  startDate,
  endDate,
};
