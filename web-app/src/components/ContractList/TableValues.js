import moment from 'moment';

const startDate = {
  id: 'startDate',
  Header: 'Start Date',
  accessor: contract => {
    return new moment(contract.startDate, 'YYYY-MM-DD');
  },
};

const endDate = {
  id: 'endDate',
  Header: 'End Date',
  accessor: contract => {
    return new moment(contract.endDate, 'YYYY-MM-DD');
  },
};

export default {
  startDate,
  endDate,
};
