import { statusText } from '../../utilities/holidayStatus';
import { theme } from '../../styled';

const status = {
  id: 'status',
  Header: 'Status',
  sortable: false,
  filterable: false,
  width: 110,
  accessor: holiday => statusText[holiday.eventStatus.eventStatusId],
  getProps: (state, rowInfo) => {
    if (!rowInfo) return {};
    return {
      style: {
        color: theme.holidayStatus[rowInfo.original.eventStatus.eventStatusId],
        fontWeight: 600,
      },
    };
  },
};

const employee = {
  id: 'employee',
  Header: 'Employee',
  accessor: ({ employee }) => `${employee.forename} ${employee.surname}`,
  sortMethod: (a, b) => {
    if (a === b) {
      return 0;
    }
    const aReverse = a
      .split('')
      .reverse()
      .join('');
    const bReverse = b
      .split('')
      .reverse()
      .join('');
    return aReverse > bReverse ? 1 : -1;
  },
};

const startDate = {
  id: 'startDate',
  Header: 'Start Date',
  accessor: holiday => holiday.start.format('D MMM YYYY'),
};

const endDate = {
  id: 'endDate',
  Header: 'End Date',
  accessor: holiday => holiday.end.format('D MMM YYYY'),
};

const requestedDate = {
  id: 'requestedDate',
  Header: 'Requested',
  accessor: holiday => holiday.requested.fromNow(),
};

export default {
  status,
  startDate,
  endDate,
  requestedDate,
  employee,
};
